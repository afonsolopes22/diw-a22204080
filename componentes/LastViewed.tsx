"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/models/interfaces";
import { getLastViewed } from "@/lib/storage";

export default function LastViewed() {
  const [items, setItems] = useState<Partial<Product>[]>([]);

  useEffect(() => {
    setItems(getLastViewed());
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="mb-6">
      <h4 className="font-semibold mb-2">Últimos vistos</h4>
      <div className="flex gap-4 overflow-x-auto">
        {items.map((p) => {
          const API = "https://deisishop.pythonanywhere.com";
          const img = p.image?.toString().startsWith("http") ? p.image : `${API}${p.image}`;
          return (
            <Link
              key={p.id}
              href={`/produtos/${p.id}`}
              className="w-40 flex-shrink-0 border rounded p-2 bg-white relative"
            >
              <Image src={String(img)} alt={String(p.title)} width={140} height={80} className="object-cover" />
              <div className="mt-2 text-sm">
                <div className="font-semibold truncate">{p.title}</div>
                <div className="text-slate-600">{p.price}€</div>
              </div>
              <span className="absolute right-2 bottom-2 text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded z-10">+ info</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
