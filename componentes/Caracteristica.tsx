import Link from "next/link";

interface CaracteristicaProps {
  index: number;
  texto: string;
}

export default function Caracteristica({ index, texto }: CaracteristicaProps) {
  return (
    <li className="mt-2">
      <Link href={`/caracteristica/${index}`} className="underline text-blue-700">
        {texto}
      </Link>
    </li>
  );
}
