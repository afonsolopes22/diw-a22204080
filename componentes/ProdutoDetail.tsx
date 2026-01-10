"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import type { Product } from "@/models/interfaces";
import { pushLastViewed } from "@/lib/storage";
import { useFavorites } from "@/context/FavoritesContext";

type Props = { product: Product };

export default function ProdutoDetail({ product }: Props) {
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    if (!product?.id) return;
    // push minimal info to last viewed
    pushLastViewed({ id: product.id, title: product.title, price: product.price, image: product.image });
  }, [product]);

  function handleToggle() {
    if (!product?.id) return;
    toggle(Number(product.id));
  }

  const fav = product?.id ? isFavorite(Number(product.id)) : false;

  const API = "https://deisishop.pythonanywhere.com";
  const img = product.image?.startsWith("http") ? product.image : `${API}${product.image}`;

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <Image src={img} alt={product.title} width={220} height={220} />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-700 font-semibold mt-2">{product.price}€</p>
          <button
            onClick={handleToggle}
            className={`mt-4 px-3 py-2 rounded ${fav ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            aria-label={fav ? "Remover favorito" : "Favorito"}
          >
            {fav ? "Remover favorito" : "Favorito"}
          </button>

          <div className="mt-4 text-slate-700">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
