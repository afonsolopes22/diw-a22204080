import type { Product } from "@/models/interfaces";

const FAV_KEY = "favorites";
const LAST_KEY = "last_viewed";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: number): number[] {
  if (typeof window === "undefined") return [];
  const favs = new Set(getFavorites());
  if (favs.has(id)) {
    favs.delete(id);
  } else {
    favs.add(id);
  }
  const arr = Array.from(favs);
  window.localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  return arr;
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function getLastViewed(): Partial<Product>[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LAST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushLastViewed(product: Partial<Product>, limit = 5): Partial<Product>[] {
  if (typeof window === "undefined") return [];
  try {
    const arr = getLastViewed();
    // remove existing
    const filtered = arr.filter((p) => p.id !== product.id);
    filtered.unshift(product);
    const truncated = filtered.slice(0, limit);
    window.localStorage.setItem(LAST_KEY, JSON.stringify(truncated));
    return truncated;
  } catch {
    return [];
  }
}
