import Image from "next/image";
import type { Product } from "@/models/interfaces";

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

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Image src={img} alt={product.title} width={80} height={80} />
        <div className="flex-1">
          <p className="font-semibold">{product.title}</p>
          <p className="text-sm text-slate-600">{product.price}€</p>

          <div className="mt-2 flex gap-2">
            {onAdd && (
              <button
                onClick={() => onAdd(product)}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
              >
                Adicionar
              </button>
            )}

            {onRemove && (
              <button
                onClick={() => onRemove(product)}
                className="text-xs bg-red-600 text-white px-3 py-1 rounded"
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
