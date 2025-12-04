import Caracteristica from "@/componentes/Caracteristica";

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

export default function Page() {
  return (
    <>
      <h2>Características do React e Next.js</h2>
      <ul>
        {caracteristicas.map((item, index) => (
          <Caracteristica key={index} index={index} texto={item} />
        ))}
      </ul>
    </>
  );
}
