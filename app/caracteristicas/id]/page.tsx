const caracteristicas = [
  "JSX, sintaxe que mistura HTML e JS.",
  "Componentes, funções que retornam JSX.",
  "Componentes Reutilizáveis e Modulares.",
  "Roteamento Automático e APIs.",
  "Hooks: useState, useEffect e useSWR.",
  "Renderização Rápida e SEO Friendly.",
  "TypeScript Seguro e Escalável.",
  "Comunidade Ativa e Popularidade.",
];

interface PageProps {
  params: { id: string };
}

export default function CaracteristicaPage({ params }: PageProps) {
  const index = Number(params.id);
  const texto = caracteristicas[index];

  if (!texto) {
    return <p>Característica não encontrada.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Característica</h2>
      <p className="text-center max-w-md">{texto}</p>

      <a
        href="/caracteristicas"
        className="inline-block mt-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Voltar às características
      </a>
    </div>
  );
}
