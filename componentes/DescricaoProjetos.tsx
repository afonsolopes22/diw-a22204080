import Projeto from "@/componentes/Projeto";

export default function DescricaoProjetos() {
  const projetos = [
    { nome: "Loja em JavaScript", url: "loja" },
    { nome: "Site Interativo", url: "site" },
  ];

  return (
    <>
      <p>
        Ao longo do curso desenvolvi vários projetos em JavaScript, React e
        Next.js. Aqui ficam alguns exemplos:
      </p>

      <ul>
        {projetos.map((p) => (
          <Projeto key={p.nome} nome={p.nome} url={p.url} />
        ))}
      </ul>
    </>
  );
}
