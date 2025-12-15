import Image from "next/image";
import ContadorPersonalizado from "@/componentes/contadorPersonalizado";


interface TecnologiaCardProps {
  title: string;
  image: string;
}

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div className="w-40 h-40 bg-white border rounded-xl shadow flex flex-col items-center justify-center p-3">
      <Image
        src={`/tecnologias/${image}`}
        alt={title}
        width={64}
        height={64}
        
      />
      <p className="mt-2 text-sm font-medium text-center">{title}
        <ContadorPersonalizado title={title}
         />

      </p>
    </div>
  );
}
