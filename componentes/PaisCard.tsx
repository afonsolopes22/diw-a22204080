import React from "react";

type Props = {
  nome: string;
  area?: number | null;
  populacao?: number | null;
};

export default function PaisCard({ nome, area, populacao }: Props) {
  return (
    <article className="border rounded-lg p-4 bg-card text-card-foreground shadow-sm">
      <h3 className="text-lg font-semibold">{nome}</h3>
      <div className="mt-2 text-sm text-muted-foreground">
        <p>Área: {area != null ? `${area.toLocaleString()} km²` : "—"}</p>
        <p>População: {populacao != null ? populacao.toLocaleString() : "—"}</p>
      </div>
    </article>
  );
}
