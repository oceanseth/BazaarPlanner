"""
Scrape BazaarDB (bazaardb.gg) into items.js, skills.js, and monsters.js.

Items and skills are loaded via the same POST the site uses for infinite scroll:
`POST /search?c=items` or `POST /search?c=skills` with a JSON body
(`t:item` / `t:skill`, `page` 1…n). The response HTML embeds `pageCards`; we stop
when a page returns no cards.

Monsters: load `search?c=monsters`, collect `/card/...` links under `#cardlist`
(same anchors as in the site UI), then fetch each card page and parse
`#section-monster-info` and `#section-board` (skills/items, tiers, enchanted item
names like "Toxic Fang"). Non-monster card links in the listing are skipped when
the page has no monster section.

Requires: pip install curl_cffi beautifulsoup4 pillow pillow-avif-plugin
"""

from __future__ import annotations

import argparse
import json
import os
import re
import time
from io import BytesIO
from typing import Any, Literal, Optional
from bs4 import BeautifulSoup
from curl_cffi import requests as cf_requests
from PIL import Image

try:
    import pillow_avif  # noqa: F401 — registers AVIF encoder with Pillow
except ImportError:
    pillow_avif = None  # type: ignore[misc, assignment]

_PILLOW_AVIF_MISSING_WARNED = False

TIER_NAME_TO_NUM = {
    "Bronze": 0,
    "Silver": 1,
    "Gold": 2,
    "Diamond": 3,
    "Legendary": 4,
}

# Safety cap if the API ever stops returning empty pages
MAX_PAGINATED_SEARCH_PAGES = 10_000

ITEMS_SEARCH_POST_URL = "https://bazaardb.gg/search?c=items"
SKILLS_SEARCH_POST_URL = "https://bazaardb.gg/search?c=skills"

# Item h3 titles like "Toxic Fang" → item Fang + Toxic enchant
ENCHANT_PREFIXES = frozenset(
    {
        "Golden",
        "Heavy",
        "Icy",
        "Turbo",
        "Shielded",
        "Restorative",
        "Toxic",
        "Fiery",
        "Shiny",
        "Deadly",
        "Radiant",
        "Obsidian",
        "Mossy",
    }
)

MONSTER_LIST_URL = "https://bazaardb.gg/search?c=monsters"

MONSTER_UUID_IN_HTML = re.compile(
    r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"
    r'\\",\{\\\"href\\\":\\\"/card/[^\"]+\\\"'
)

TIER_LABEL_RE = re.compile(r"(Bronze|Silver|Gold|Diamond|Legendary)\+", re.I)

# Matches JS Item.cleanName: name.replace(/[ '"()\-_\.&]/g, '')
ITEM_FILENAME_CLEAN_RE = re.compile(r'''[ '"()\-_.&]''')

# BazaarDB card art URLs in HTML (monster pages, etc.)
BAZAARDB_WEBP_URL_RE = re.compile(
    r"https://s\.bazaardb\.gg/v1/[^\"'\\\s<>]+\.webp(?:\?[^\"'\\\s<>]*)?",
    re.I,
)

SESSION = cf_requests.Session()

# Set True via `--verbose` to print each HTTP URL before the request.
DEBUG_HTTP = False


def http_get(url: str) -> str:
    if DEBUG_HTTP:
        print(f"[http] GET {url}", flush=True)
    r = SESSION.get(url, impersonate="chrome", timeout=120)
    r.raise_for_status()
    return r.text


def http_get_bytes(url: str) -> bytes:
    if DEBUG_HTTP:
        print(f"[http] GET {url}", flush=True)
    r = SESSION.get(url, impersonate="chrome", timeout=120)
    r.raise_for_status()
    return r.content


def http_post_plain(url: str, body: str) -> str:
    """POST JSON as `text/plain` — BazaarDB search infinite-scroll uses this."""
    if DEBUG_HTTP:
        print(f"[http] POST {url}", flush=True)
    r = SESSION.post(
        url,
        data=body.encode("utf-8"),
        headers={"Content-Type": "text/plain;charset=UTF-8"},
        impersonate="chrome",
        timeout=120,
    )
    r.raise_for_status()
    return r.text


def clean_item_filename(name: str) -> str:
    """Same as `Item.cleanName` in js/Item.js (for public/images/items/*.avif)."""
    return ITEM_FILENAME_CLEAN_RE.sub("", name)


def bazaardb_card_art_url(card: dict) -> Optional[str]:
    """Prefer larger art; skip inline data URLs."""
    for key in ("ArtLarge", "Art"):
        u = card.get(key)
        if isinstance(u, str) and u.startswith("https://") and not u.startswith("data:"):
            return u
    return None


def best_bazaardb_art_url_from_html(html: str) -> Optional[str]:
    """Pick main card art from a BazaarDB HTML page (avoids blurred preview assets)."""
    urls = BAZAARDB_WEBP_URL_RE.findall(html)
    non_preview = [u for u in urls if "_p@" not in u]
    pool = non_preview or urls
    for pref in ("@400L", "@400", "@256"):
        for u in pool:
            if pref in u:
                return u
    return pool[0] if pool else None


def webp_bytes_to_avif_file(content: bytes, dest_path: str) -> None:
    if pillow_avif is None:
        raise RuntimeError("pillow-avif-plugin is required to write AVIF (pip install pillow-avif-plugin)")
    im = Image.open(BytesIO(content))
    im.save(dest_path, format="AVIF", quality=80)


def warn_if_pillow_avif_missing_once() -> None:
    global _PILLOW_AVIF_MISSING_WARNED
    if pillow_avif is not None or _PILLOW_AVIF_MISSING_WARNED:
        return
    _PILLOW_AVIF_MISSING_WARNED = True
    print(
        "Install pillow-avif-plugin to download BazaarDB images as .avif "
        "(pip install pillow-avif-plugin)"
    )


def parse_page_cards_json(html: str) -> Optional[list[dict[str, Any]]]:
    needle = '\\"pageCards\\":['
    start = html.find(needle)
    if start == -1:
        return None
    arr_start = start + len(needle) - 1
    end = html.find('],\\"total\\"', arr_start)
    if end == -1:
        return None
    chunk = html[arr_start : end + 1]
    return json.loads(chunk.replace('\\"', '"'))


def resolve_replacement_value(spec: Any, tier: str) -> Any:
    if isinstance(spec, dict):
        if "Fixed" in spec:
            return spec["Fixed"]
        return spec.get(tier, spec.get("Bronze"))
    return spec


def apply_replacements(text: str, replacements: dict, tier: str) -> str:
    if not replacements:
        return text
    out = text
    for key, spec in replacements.items():
        if key not in out:
            continue
        val = resolve_replacement_value(spec, tier)
        if val is None:
            continue
        out = out.replace(key, str(val))
    return out


def tooltip_lines_for_tier(card: dict, tier: str) -> list[str]:
    """Flatten Tooltips using TooltipReplacements for a tier (Bronze baseline)."""
    lines: list[str] = []
    reps = card.get("TooltipReplacements") or {}
    for tip in card.get("Tooltips") or []:
        content = (tip.get("Content") or {}).get("Text")
        if not content:
            continue
        lines.append(apply_replacements(content, reps, tier))
    return lines


def cooldown_and_ammo_from_card(card: dict) -> tuple[Any, Any, Optional[int]]:
    """Returns (cooldown, ammo, multicast) compatible with items.js conventions."""
    base = card.get("BaseAttributes") or {}
    cd_ms = base.get("CooldownMax")
    cooldown: Any = None
    if cd_ms is not None:
        sec = cd_ms / 1000.0
        if sec == int(sec):
            cooldown = int(sec)
        else:
            cooldown = sec
    ammo = base.get("AmmoMax")
    multicast = base.get("Multicast")
    return cooldown, ammo, multicast


def enchants_from_card(card: dict) -> dict[str, str]:
    out: dict[str, str] = {}
    for name, data in (card.get("Enchantments") or {}).items():
        loc = (data or {}).get("Localization") or {}
        tips = (loc.get("Tooltips") or [])
        if not tips:
            continue
        text = (tips[0].get("Content") or {}).get("Text")
        if text:
            out[name] = text
    return out


def item_from_bazaar_card(card: dict) -> dict[str, Any]:
    tier_name = card.get("BaseTier") or "Bronze"
    tier = TIER_NAME_TO_NUM.get(tier_name, 0)
    title = (card.get("Title") or {}).get("Text") or ""
    tags: list[str] = []
    tags.extend(card.get("Heroes") or [])
    if card.get("Size"):
        tags.append(card["Size"])
    tags.extend(card.get("Tags") or [])
    tags.extend(card.get("HiddenTags") or [])

    text_lines = tooltip_lines_for_tier(card, "Bronze")
    cooldown, ammo, multicast = cooldown_and_ammo_from_card(card)

    processed: dict[str, Any] = {
        "name": title,
        "tier": tier,
        "tags": tags,
        "cooldown": cooldown,
        "ammo": ammo,
        "text": text_lines,
        "enchants": enchants_from_card(card),
    }
    if multicast is not None and multicast != 1:
        processed["multicast"] = multicast

    # Drop lines absorbed into structured fields (matches scrape-items-directly behavior)
    filtered: list[str] = []
    for line in processed["text"]:
        if cooldown is not None and line.startswith("Cooldown"):
            continue
        if ammo is not None and line.startswith("Ammo"):
            continue
        if multicast is not None and multicast != 1 and line.startswith("Multicast"):
            continue
        filtered.append(line)
    processed["text"] = filtered

    quests = card.get("Quests")
    if isinstance(quests, list):
        pq: dict[str, str] = {}
        for q in quests:
            if not isinstance(q, dict):
                continue
            for ent in q.get("entries") or []:
                if not isinstance(ent, dict):
                    continue
                tt = ent.get("tooltips") or []
                rw = ent.get("rewardTooltips") or []
                if tt and rw:
                    pq[tt[0]] = rw[0]
        if pq:
            processed["quests"] = pq

    return processed


def skill_from_bazaar_card(card: dict) -> dict[str, Any]:
    tier_name = card.get("BaseTier") or "Bronze"
    tier = TIER_NAME_TO_NUM.get(tier_name, 0)
    title = (card.get("Title") or {}).get("Text") or ""
    tags = list(
        dict.fromkeys(
            (card.get("Heroes") or [])
            + (card.get("Tags") or [])
            + (card.get("HiddenTags") or [])
        )
    )
    raw = tooltip_lines_for_tier(card, "Bronze")
    text: list[str] = []
    for line in raw:
        line = line.replace("[0]", "")
        for sentence in [s.strip() + "." for s in line.split(".") if s.strip()]:
            text.append(sentence)
    return {"text": text, "tier": tier, "tags": tags}


def search_post_payload(page: int, kind: Literal["items", "skills"]) -> str:
    """JSON array body for POST search (matches BazaarDB client `t:item` / `t:skill` queries)."""
    if kind == "items":
        obj: dict[str, Any] = {
            "query": "t:item  t:item",
            "category": "Items",
            "textQuery": "",
            "type": ["Item"],
            "sortBy": "Auto",
            "order": "ascending",
            "page": page,
            "showUnobtainable": False,
            "forClient": True,
            "hostLocale": "en-US",
        }
    else:
        obj = {
            "query": "t:skill  t:skill",
            "category": "Skills",
            "textQuery": "",
            "type": ["Skill"],
            "sortBy": "Auto",
            "order": "ascending",
            "page": page,
            "showUnobtainable": False,
            "forClient": True,
            "hostLocale": "en-US",
        }
    return json.dumps([obj])


def paginated_search_collect(
    post_url_base: str,
    kind: Literal["items", "skills"],
    delay: float,
    expected_type: str,
) -> dict[str, dict]:
    """POST paginated search until `pageCards` is empty.

    BazaarDB uses the **query string** `&page=N` on the search URL; the JSON `page`
    field mirrors that but the URL is what actually advances results.
    """
    merge: dict[str, dict] = {}
    time.sleep(delay)
    http_get(post_url_base)
    page = 1
    while page <= MAX_PAGINATED_SEARCH_PAGES:
        time.sleep(delay)
        url = f"{post_url_base}&page={page}"
        html = http_post_plain(url, search_post_payload(page, kind))
        cards = parse_page_cards_json(html)
        if cards is None:
            raise RuntimeError(f"Could not parse pageCards from {kind} search POST (page={page}).")
        if len(cards) == 0:
            break
        for card in cards:
            if card.get("Type") != expected_type:
                continue
            name = (card.get("Title") or {}).get("Text")
            if not name:
                continue
            merge[name] = card
        page += 1
    else:
        raise RuntimeError(
            f"Exceeded MAX_PAGINATED_SEARCH_PAGES ({MAX_PAGINATED_SEARCH_PAGES}) for {kind} "
            "without an empty page."
        )
    return merge


def parse_monster_listing_card_uris(html: str) -> list[str]:
    """Collect unique `/card/{id}/{slug}` paths from the monsters category page (`#cardlist`)."""
    soup = BeautifulSoup(html, "html.parser")
    root = soup.find(id="cardlist")
    if root is None:
        root = soup
    seen: set[str] = set()
    ordered: list[str] = []
    for a in root.find_all("a", href=True):
        href = (a.get("href") or "").strip()
        if not href.startswith("/card/"):
            continue
        href = href.split("?")[0].split("#")[0]
        if href not in seen:
            seen.add(href)
            ordered.append(href)
    return ordered


def tier_from_h3_heading(h3: Any) -> int:
    """Read Bronze+/Silver+ from the card tile containing this h3."""
    p = h3
    for _ in range(12):
        if p is None:
            break
        txt = p.get_text(" ", strip=True)
        m = TIER_LABEL_RE.search(txt)
        if m:
            return TIER_NAME_TO_NUM.get(m.group(1).title(), 0)
        p = p.parent
    return 0


def split_item_title(title: str) -> tuple[str, Optional[str]]:
    """e.g. 'Toxic Fang' → ('Fang', 'Toxic'); 'Gland' → ('Gland', None)."""
    parts = title.split()
    if len(parts) >= 2 and parts[0] in ENCHANT_PREFIXES:
        return " ".join(parts[1:]), parts[0]
    return title, None


def parse_monster_card_page(html: str) -> Optional[dict[str, Any]]:
    """If this is a monster card page, return monsters.js-shaped dict; else None."""
    soup = BeautifulSoup(html, "html.parser")
    if not soup.find(id="section-monster-info"):
        return None

    muid = MONSTER_UUID_IN_HTML.search(html)
    if not muid:
        return None
    monster_id = muid.group(1)

    h1 = soup.find("h1")
    name = h1.get_text(strip=True) if h1 else ""
    if not name:
        return None

    info = soup.find(id="section-monster-info")
    info_txt = info.get_text(" ", strip=True) if info else ""
    day_m = re.search(r"Day\s+(\d+)", info_txt)
    health_m = re.search(r"Health\s+(\d+)", info_txt)
    if not day_m or not health_m:
        return None
    day = int(day_m.group(1))
    health = int(health_m.group(1))

    board = soup.find(id="section-board")
    if not board:
        return None

    skills_out: list[dict[str, Any]] = []
    between_skills = False
    for h in board.find_all("h3"):
        t = h.get_text(strip=True)
        if t == "Skills":
            between_skills = True
            continue
        if t == "Items":
            break
        if between_skills:
            skills_out.append({"name": t, "tier": tier_from_h3_heading(h)})

    items_out: list[dict[str, Any]] = []
    seen_items = False
    for h in board.find_all("h3"):
        t = h.get_text(strip=True)
        if t == "Items":
            seen_items = True
            continue
        if seen_items:
            item_name, enchant = split_item_title(t)
            entry: dict[str, Any] = {
                "name": item_name,
                "tier": tier_from_h3_heading(h),
            }
            if enchant:
                entry["enchant"] = enchant
            items_out.append(entry)

    return {
        "id": monster_id,
        "name": name,
        "day": day,
        "health": health,
        "skills": skills_out,
        "items": items_out,
    }


def download_item_or_skill_image_from_bazaardb(name: str, card: dict) -> None:
    """Write `public/images/items/{cleanName}.avif` from BazaarDB `ArtLarge` / `Art` (WEBP → AVIF)."""
    if pillow_avif is None:
        return
    art = bazaardb_card_art_url(card)
    if not art:
        return
    clean = clean_item_filename(name)
    if not clean:
        return
    local_path = f"./public/images/items/{clean}.avif"
    if os.path.exists(local_path):
        return
    os.makedirs("./public/images/items", exist_ok=True)
    try:
        data = http_get_bytes(art)
        webp_bytes_to_avif_file(data, local_path)
        print(f"Downloaded {local_path} (BazaarDB)")
    except Exception as e:
        print(f"BazaarDB item image skipped for {name}: {e}")


def download_monster_image_if_missing(name: str, card_id: str, html: Optional[str] = None) -> None:
    """Prefer BazaarDB art on the card page; fall back to HowBazaar CDN."""
    local_path = f"./public/images/monsters/{card_id}.avif"
    if os.path.exists(local_path):
        return
    os.makedirs("./public/images/monsters", exist_ok=True)

    if pillow_avif is not None and html:
        burl = best_bazaardb_art_url_from_html(html)
        if burl:
            try:
                data = http_get_bytes(burl)
                webp_bytes_to_avif_file(data, local_path)
                print(f"Downloaded {local_path} (BazaarDB)")
                return
            except Exception as e:
                print(f"BazaarDB monster image failed for {name}, trying HowBazaar CDN: {e}")

    img_url = f"https://howbazaar-images.b-cdn.net/images/monsters/{card_id}.avif"
    try:
        ir = SESSION.get(img_url, impersonate="chrome", timeout=60)
        ir.raise_for_status()
        with open(local_path, "wb") as f:
            f.write(ir.content)
        print(f"Downloaded {local_path} (HowBazaar CDN)")
    except Exception as e:
        print(f"Image download skipped for {name}: {e}")


def fetch_all_items(delay: float) -> dict[str, dict[str, Any]]:
    merged = paginated_search_collect(ITEMS_SEARCH_POST_URL, "items", delay, "Item")
    if pillow_avif is None:
        warn_if_pillow_avif_missing_once()
    else:
        for i, (name, card) in enumerate(merged.items()):
            if i:
                time.sleep(delay)
            download_item_or_skill_image_from_bazaardb(name, card)

    return {k: item_from_bazaar_card(v) for k, v in merged.items()}


def fetch_all_skills(delay: float) -> dict[str, dict[str, Any]]:
    merged = paginated_search_collect(SKILLS_SEARCH_POST_URL, "skills", delay, "Skill")
    if pillow_avif is None:
        warn_if_pillow_avif_missing_once()
    else:
        for i, (name, card) in enumerate(merged.items()):
            if i:
                time.sleep(delay)
            download_item_or_skill_image_from_bazaardb(name, card)

    return {k: skill_from_bazaar_card(v) for k, v in merged.items()}


def fetch_all_monsters(delay: float) -> dict[str, Any]:
    """Load the monsters listing page, collect `/card/...` links, then scrape each monster page."""
    time.sleep(delay)
    listing_html = http_get(MONSTER_LIST_URL)
    uris = parse_monster_listing_card_uris(listing_html)
    if not uris:
        print("Warning: no /card/ links found on monsters listing page.")
    else:
        print(f"Found {len(uris)} card link(s) on monsters listing; fetching pages (non-monster cards are skipped).")

    monsters: dict[str, Any] = {}
    for i, uri in enumerate(uris):
        if i:
            time.sleep(delay)
        url = f"https://bazaardb.gg{uri}" if uri.startswith("/") else uri
        html = http_get(url)
        parsed = parse_monster_card_page(html)
        if not parsed:
            continue
        time.sleep(delay)
        download_monster_image_if_missing(parsed["name"], parsed["id"], html)
        monsters[parsed["name"]] = parsed

    return monsters


def load_existing_json(path: str, export_name: str) -> dict:
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        payload = content.replace(f"export const {export_name} = ", "").rstrip(";")
        return json.loads(payload)
    except FileNotFoundError:
        return {}


def write_js(path: str, export_name: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"export const {export_name} = ")
        json.dump(data, f, indent=2)
        f.write(";")


def merge_item_priorities(new_items: dict, old: dict) -> None:
    for name, entry in new_items.items():
        if name in old and "priorities" in old[name]:
            entry["priorities"] = old[name]["priorities"]


def main() -> None:
    global DEBUG_HTTP
    ap = argparse.ArgumentParser(description="Scrape BazaarDB into JS data files.")
    ap.add_argument(
        "--delay",
        type=float,
        default=0.25,
        help="Seconds between HTTP requests (default 0.25)",
    )
    ap.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Print each HTTP URL immediately before the request",
    )
    ap.add_argument("--items", action="store_true", help="Update items.js")
    ap.add_argument("--skills", action="store_true", help="Update skills.js")
    ap.add_argument("--monsters", action="store_true", help="Update monsters.js (BazaarDB card pages)")
    args = ap.parse_args()
    DEBUG_HTTP = args.verbose
    if not (args.items or args.skills or args.monsters):
        args.items = args.skills = args.monsters = True

    if args.items:
        print("Fetching items from BazaarDB (paginated search POST)...")
        items = fetch_all_items(args.delay)
        old = load_existing_json("items.js", "items")
        merge_item_priorities(items, old)
        write_js("items.js", "items", items)
        print(f"Wrote items.js ({len(items)} items)")

    if args.skills:
        print("Fetching skills from BazaarDB (paginated search POST)...")
        skills = fetch_all_skills(args.delay)
        write_js("skills.js", "skills", skills)
        print(f"Wrote skills.js ({len(skills)} skills)")

    if args.monsters:
        print("Fetching monsters from BazaarDB (monsters listing + per-card pages)...")
        monsters = fetch_all_monsters(args.delay)
        write_js("monsters.js", "monsters", monsters)
        print(f"Wrote monsters.js ({len(monsters)} monsters)")


if __name__ == "__main__":
    main()
