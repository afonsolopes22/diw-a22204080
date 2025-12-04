import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/componentes/TecnologiaDetailsCard";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function TecnologiaPage({ params }: PageProps) {
  const index = Number(params.id);
  const tecnologia = tecnologias[index];

  if (!tecnologia) {
    return <p>Tecnologia não encontrada.</p>;
  }

  return (
    <>
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link
        href="/tecnologias"
        className="inline-block mt-4 text-sm text-blue-700 underline"
      >
        Voltar às tecnologias
      </Link>
    </>
  );
}
