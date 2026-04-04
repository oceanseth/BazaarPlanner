import { getItemsJsUrl, isLocalDevHost } from './assetConfig.js';

let _loadedUrl = null;
let _items = null;

async function importItemsJsFromText(itemsJsUrl, code) {
  // Some CDNs (including GitHub raw) may serve the wrong MIME type for direct module import.
  // Importing via a Blob URL with an explicit JS MIME type avoids that.
  const blob = new Blob([code], { type: 'text/javascript' });
  const blobUrl = URL.createObjectURL(blob);
  try {
    // @vite-ignore: this URL is runtime-generated (Blob URL).
    const mod = await import(/* @vite-ignore */ blobUrl);
    return mod.items ?? mod.default?.items;
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

export async function ensureItemsLoaded() {
  const itemsJsUrl = getItemsJsUrl();
  if (_items && _loadedUrl === itemsJsUrl) return _items;

  // Local dev: load root items.js via Vite (same file as in the repo).
  if (typeof window !== 'undefined' && isLocalDevHost()) {
    try {
      const pathname = new URL(itemsJsUrl).pathname || '/items.js';
      // @vite-ignore: explicit absolute path to project-root items.js in dev.
      const mod = await import(/* @vite-ignore */ pathname);
      const loadedItems = mod.items ?? mod.default?.items;
      if (loadedItems) {
        _loadedUrl = itemsJsUrl;
        _items = loadedItems;
        window.items = _items;
        return _items;
      }
    } catch (e) {
      console.warn('Local import of items.js failed, falling back to fetch:', e);
    }
  }

  const res = await fetch(itemsJsUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to load items.js from ${itemsJsUrl} (HTTP ${res.status})`);
  }

  const code = await res.text();
  const loadedItems = await importItemsJsFromText(itemsJsUrl, code);
  if (!loadedItems) {
    throw new Error(`Loaded module from ${itemsJsUrl}, but it did not export 'items'.`);
  }

  _loadedUrl = itemsJsUrl;
  _items = loadedItems;
  window.items = _items; // Many existing modules refer to the global `items`.
  return _items;
}

