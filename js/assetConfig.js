// Centralized asset URL configuration.
// Users can override the sources via localStorage settings.

const ITEM_REPOSITORY_STORAGE_KEY = 'bp_itemRepository';
const IMAGE_REPOSITORY_STORAGE_KEY = 'bp_imageRepository';

// Defaults requested by the user.
const DEFAULT_ITEM_REPOSITORY = 'https://github.com/oceanseth/BazaarPlanner/';
const DEFAULT_IMAGE_REPOSITORY =
  'https://github.com/oceanseth/BazaarPlanner/blob/main/public/images';

const DEFAULT_ITEM_REPO_BRANCH = 'main';

function stripQueryAndFragment(url) {
  return url.replace(/[?#].*$/, '');
}

function ensureTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`;
}

function parseGitHubOwnerRepo(url) {
  const m = stripQueryAndFragment(url).match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2] };
}

function parseGitHubBlobUrl(url) {
  // Supports: https://github.com/<owner>/<repo>/blob/<branch>/public/images
  const s = stripQueryAndFragment(url);
  const m = s.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.*)$/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2], branch: m[3], rest: m[4] };
}

function normalizeItemRepositoryToItemsJsUrl(itemRepositoryUrl) {
  const raw = stripQueryAndFragment(itemRepositoryUrl).trim();
  if (!raw) {
    return `https://raw.githubusercontent.com/oceanseth/BazaarPlanner/refs/heads/${DEFAULT_ITEM_REPO_BRANCH}/items.js`;
  }

  // Already a raw.githubusercontent.com URL.
  if (raw.includes('raw.githubusercontent.com/')) {
    return raw.endsWith('items.js') ? raw : `${ensureTrailingSlash(raw)}items.js`;
  }

  // GitHub blob URL, e.g. https://github.com/.../blob/main/items.js
  if (raw.includes('github.com/') && raw.includes('/blob/')) {
    const blob = parseGitHubBlobUrl(raw);
    if (blob) {
      if (blob.rest.endsWith('items.js')) {
        return `https://raw.githubusercontent.com/${blob.owner}/${blob.repo}/refs/heads/${blob.branch}/${blob.rest}`;
      }
    }
  }

  // GitHub repository root: https://github.com/<owner>/<repo>/
  const parsed = parseGitHubOwnerRepo(raw);
  if (parsed) {
    return `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/refs/heads/${DEFAULT_ITEM_REPO_BRANCH}/items.js`;
  }

  // Fallback: if it looks like a URL, try to append `items.js`.
  if (/^https?:\/\//i.test(raw)) {
    return raw.endsWith('items.js') ? raw : `${ensureTrailingSlash(raw)}items.js`;
  }

  // Last resort: treat as relative.
  return `./${raw}`;
}

function normalizeImageRepositoryToImageBaseUrl(imageRepositoryUrl) {
  const raw = stripQueryAndFragment(imageRepositoryUrl).trim();
  if (!raw) return 'https://raw.githubusercontent.com/oceanseth/BazaarPlanner/main/public/images/';

  // If the user already provided a raw base URL, keep it.
  if (raw.includes('raw.githubusercontent.com/')) {
    return ensureTrailingSlash(raw);
  }

  // Convert github.com blob URL into a raw githubusercontent base for public/images.
  if (raw.includes('github.com/') && raw.includes('/blob/')) {
    const blob = parseGitHubBlobUrl(raw);
    if (blob) {
      // Expect rest to end in `public/images`
      if (blob.rest.startsWith('public/images')) {
        return `https://raw.githubusercontent.com/${blob.owner}/${blob.repo}/${blob.branch}/public/images/`;
      }
    }
  }

  // GitHub repo root: https://github.com/<owner>/<repo>/
  const parsed = parseGitHubOwnerRepo(raw);
  if (parsed) {
    return `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/main/public/images/`;
  }

  // Fallback: assume the input is already the base directory URL.
  // Ensure it ends with a slash so concatenation works.
  return ensureTrailingSlash(raw);
}

let _cachedImageBaseUrl = null;
let _cachedImageRepoValue = null;
export function getImageBaseUrl() {
  const repoValue = localStorage.getItem(IMAGE_REPOSITORY_STORAGE_KEY) || DEFAULT_IMAGE_REPOSITORY;
  if (_cachedImageBaseUrl && _cachedImageRepoValue === repoValue) return _cachedImageBaseUrl;
  _cachedImageRepoValue = repoValue;
  _cachedImageBaseUrl = normalizeImageRepositoryToImageBaseUrl(repoValue);
  return _cachedImageBaseUrl;
}

export function imageUrl(pathOrRelative) {
  if (!pathOrRelative) return pathOrRelative;

  // Keep absolute URLs as-is.
  if (/^(data:|https?:\/\/)/i.test(pathOrRelative)) return pathOrRelative;

  const base = getImageBaseUrl();

  // Preserve ?query and #hash if provided.
  const m = pathOrRelative.match(/^([^?#]*)([?#].*)?$/);
  const pathPart = m ? m[1] : pathOrRelative;
  const suffix = m && m[2] ? m[2] : '';

  // Most of the code uses either:
  // - /images/items/Claws.avif
  // - images/items/Claws.avif
  const cleaned = pathPart.replace(/^\/?images\//i, '');

  return `${base}${cleaned}${suffix}`;
}

export function getItemsJsUrl() {
  const repoValue = localStorage.getItem(ITEM_REPOSITORY_STORAGE_KEY) || DEFAULT_ITEM_REPOSITORY;
  return normalizeItemRepositoryToItemsJsUrl(repoValue);
}

export function getStoredItemRepository() {
  return localStorage.getItem(ITEM_REPOSITORY_STORAGE_KEY) || DEFAULT_ITEM_REPOSITORY;
}

export function getStoredImageRepository() {
  return localStorage.getItem(IMAGE_REPOSITORY_STORAGE_KEY) || DEFAULT_IMAGE_REPOSITORY;
}

export function getItemRepositoryStorageKey() {
  return ITEM_REPOSITORY_STORAGE_KEY;
}

export function getImageRepositoryStorageKey() {
  return IMAGE_REPOSITORY_STORAGE_KEY;
}

export { ITEM_REPOSITORY_STORAGE_KEY, IMAGE_REPOSITORY_STORAGE_KEY, DEFAULT_ITEM_REPOSITORY, DEFAULT_IMAGE_REPOSITORY };

