import tecnologias from "@/app/data/tecnologias.json";
import Tecnologia from "@/componentes/Tecnologia";

export default function Page() {
  return (
    <>
      <h2>Tecnologias Exploradas</h2>

      <div className="flex flex-wrap gap-4 mt-4">
        {tecnologias.map((tech, index) => (
          <Tecnologia
            key={index}
            index={index}
            title={tech.title}
            image={tech.image}
          />
        ))}
      </div>
    </>
  );
}
