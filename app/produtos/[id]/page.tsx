import ProdutoDetail from "@/componentes/ProdutoDetail";

const API = "https://deisishop.pythonanywhere.com";

type Props = { params: { id: string } };

async function fetchProduct(id: string) {
  try {
    const res = await fetch(`${API}/products/${id}/`);
    if (!res.ok) throw new Error("Not found");
    return res.json();
  } catch {
    return null;
  }
}

export default async function Page({ params }: Props) {
  const product = await fetchProduct(params.id);
  if (!product) return <p>Produto não encontrado</p>;

  return <ProdutoDetail product={product} />;
}
