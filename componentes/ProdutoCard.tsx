"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Product } from "@/models/interfaces";
import { useFavorites } from "@/context/FavoritesContext";

const API = "https://deisishop.pythonanywhere.com";

type Props = {
  product: Product;
  onAdd?: (p: Product) => void;
  onRemove?: (p: Product) => void;
};

export default function ProdutoCard({ product, onAdd, onRemove }: Props) {
  const img = product.image?.startsWith("http")
    ? product.image
    : `${API}${product.image}`;

  const { isFavorite, toggle } = useFavorites();

  const fav = useMemo(() => {
    if (!product?.id) return false;
    return isFavorite(Number(product.id));
  }, [product, isFavorite]);

  function handleToggleFav(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!product?.id) return;
    toggle(Number(product.id));
  }

  return (
    <Link href={`/produtos/${product.id}`} className="block">
      <div className="border rounded-xl p-4 bg-white shadow-sm relative">
        <button
          onClick={handleToggleFav}
          aria-label={fav ? "Remover favorito" : "Favorito"}
          className="absolute top-2 right-2 text-red-500 text-sm bg-white/70 px-2 py-1 rounded"
        >
          {fav ? "Remover favorito" : "Favorito"}
        </button>

        <div className="flex items-center gap-4">
          <Image src={img} alt={product.title} width={80} height={80} />
          <div className="flex-1">
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm text-slate-600">{product.price}€</p>

            <div className="mt-2 flex gap-2">
              {onAdd && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAdd(product);
                  }}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Adicionar
                </button>
              )}

              {onRemove && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove(product);
                  }}
                  className="text-xs bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remover
                </button>
              )}
            </div>
          </div>
        </div>
        <span className="absolute right-3 bottom-3 text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded z-10">+ info</span>
      </div>
    </Link>
  );
}
