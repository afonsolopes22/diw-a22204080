"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { type Pais } from "../../lib/fetchPaises";
import PaisCard from "../../componentes/PaisCard";

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("fetch failed");
  return r.json();
});

export default function PaisesPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"none" | "pop-asc" | "pop-desc">("none");

  const { data: paises = [], error, isLoading } = useSWR<Pais[]>('/paises.json', fetcher);

  const filtered = useMemo(() => {
    const byName = (paises ?? []).filter((p) => p.nome.toLowerCase().includes(q.toLowerCase()));
    if (sort === "pop-asc") return byName.slice().sort((a, b) => (a.populacao ?? 0) - (b.populacao ?? 0));
    if (sort === "pop-desc") return byName.slice().sort((a, b) => (b.populacao ?? 0) - (a.populacao ?? 0));
    return byName;
  }, [paises, q, sort]);

  if (error) return <div className="p-4">Erro ao carregar países.</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4">Países</h1>

      <div className="flex gap-3 mb-4">
        <input
          aria-label="Filtrar por nome"
          placeholder="Filtrar por nome"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="border px-3 py-2 rounded"
          aria-label="Ordenar por população"
        >
          <option value="none">Ordenar (padrão)</option>
          <option value="pop-asc">População ascendente</option>
          <option value="pop-desc">População descendente</option>
        </select>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <p>Nenhum país encontrado.</p>
          ) : (
            filtered.map((p) => (
              <PaisCard key={p.id ?? p.nome} nome={p.nome} area={p.area} populacao={p.populacao} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
