"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import type { Product } from "@/models/interfaces";
import ProdutoCard from "@/componentes/ProdutoCard";

const API = "https://deisishop.pythonanywhere.com";
const CART_KEY = "cart";

async function fetcher(url: string): Promise<Product[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha a obter produtos");
  return res.json();
}

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(
    `${API}/products/`,
    fetcher
  );

  // 🔎 pesquisa
  const [search, setSearch] = useState("");

  // 🔀 ordenação
  const [order, setOrder] = useState("name-asc");

  // dados filtrados + ordenados
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  // 🛒 carrinho
  const [cart, setCart] = useState<Product[]>([]);

  // 🧾 Comprar
  const [nome, setNome] = useState("");
  const [student, setStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [buyResponse, setBuyResponse] = useState<any>(null);
  const [buyError, setBuyError] = useState<string>("");
  const [isBuying, setIsBuying] = useState(false);

  // carregar carrinho do localStorage ao abrir
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return;

    try {
      setCart(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // guardar carrinho no localStorage sempre que muda
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(p: Product) {
    setCart((prev) => [...prev, p]); // permite repetir itens (simples)
  }

  function removeFromCart(p: Product) {
    // remove 1 ocorrência (a primeira) do produto
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }

  async function buy() {
    setIsBuying(true);
    setBuyError("");
    setBuyResponse(null);

    try {
      const res = await fetch(`${API}/buy/`, {
        method: "POST",
        body: JSON.stringify({
          products: cart.map((product) => product.id),
          name: nome,
          student: student,
          coupon: coupon,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || res.statusText);
      }

      const json = await res.json();
      setBuyResponse(json);

      // limpar carrinho
      setCart([]);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CART_KEY, JSON.stringify([]));
      }
    } catch (e: any) {
      setBuyError(e?.message || "Erro ao comprar");
    } finally {
      setIsBuying(false);
    }
  }
  

  const total = useMemo(() => {
  return cart.reduce((sum, p) => sum + Number(p.price), 0);
}, [cart]);


  useEffect(() => {
    if (!data) return;

    const termo = search.toLowerCase();

    let resultado = data.filter((p: Product) =>
      p.title.toLowerCase().includes(termo)
    );

    resultado = [...resultado].sort((a, b) => {
      switch (order) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredData(resultado);
  }, [search, order, data]);

  if (isLoading) return <p>A carregar...</p>;
  if (error) return <p>Erro a obter produtos</p>;

  return (
    <>
      <h2>Produtos</h2>

      {/* Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar pelo nome..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mt-4 w-full max-w-md"
      />

      {/* Ordenação */}
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="border rounded px-3 py-2 mt-4 ml-0 md:ml-4"
      >
        <option value="name-asc">Nome (A–Z)</option>
        <option value="name-desc">Nome (Z–A)</option>
        <option value="price-asc">Preço (crescente)</option>
        <option value="price-desc">Preço (decrescente)</option>
      </select>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Lista de produtos */}
        <section>
          <h3 className="font-semibold mb-3">Lista</h3>
          <div className="grid grid-cols-1 gap-4">
            {filteredData.map((p: Product) => (
              <ProdutoCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>

        {/* Carrinho */}
        <section>
          <h3 className="font-semibold mb-3">Carrinho</h3>

          {cart.length === 0 ? (
            <p className="text-sm text-slate-600">O carrinho está vazio.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {cart.map((p: Product, i: number) => (
                  <ProdutoCard
                    key={`${p.id}-${i}`}
                    product={p}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="mt-4 p-3 border rounded-xl bg-slate-50 flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold">{total.toFixed(2)}€</span>
              </div>

              {/* Comprar */}
              <div className="mt-4 p-4 border rounded-xl bg-white space-y-3">
                <h4 className="font-semibold">Comprar</h4>

                <input
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={student}
                    onChange={(e) => setStudent(e.target.checked)}
                  />
                  Estudante DEISI
                </label>

                <input
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Cupão"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />

                <button
                  onClick={buy}
                  disabled={cart.length === 0 || isBuying}
                  className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
                >
                  {isBuying ? "A comprar..." : "Comprar"}
                </button>

                {buyError && (
                  <p className="text-sm text-red-600">Erro: {buyError}</p>
                )}

                {buyResponse && (
                  <pre className="text-xs bg-slate-100 p-3 rounded overflow-auto">
                    {JSON.stringify(buyResponse, null, 2)}
                  </pre>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
