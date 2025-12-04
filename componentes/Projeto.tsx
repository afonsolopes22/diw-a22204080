interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <li className="mt-2">
      <p>{nome}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 underline"
      >
        Ver projeto
      </a>
    </li>
  );
}
