"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getFavorites as storageGetFavorites } from "@/lib/storage";

type FavoritesContextType = {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    return storageGetFavorites();
  });

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "favorites") {
        try {
          const value = e.newValue ? JSON.parse(e.newValue) : [];
          setFavorites(value);
        } catch {
          // ignore
        }
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggle = (id: number) => {
    setFavorites((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      const arr = Array.from(set);
      try {
        window.localStorage.setItem("favorites", JSON.stringify(arr));
      } catch {
        // ignore
      }
      return arr;
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (id: number) => favorites.includes(id),
      toggle,
    }),
    [favorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
