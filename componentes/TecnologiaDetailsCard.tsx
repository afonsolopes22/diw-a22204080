import Image from "next/image";

interface TecnologiaDetailsCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center gap-3">
      <Image
        src={`/tecnologias/${image}`}
        alt={title}
        width={96}
        height={96}
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-700 text-center">{description}</p>
      <p className="font-medium">Rating: {rating}/5</p>
    </div>
  );
}
