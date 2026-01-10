export type Pais = {
  id?: string;
  nome: string;
  area: number;
  populacao: number;
};

const SAMPLE: Pais[] = [
  { id: "pt", nome: "Portugal", area: 92212, populacao: 10305564 },
  { id: "es", nome: "Espanha", area: 505990, populacao: 47329000 },
  { id: "fr", nome: "França", area: 551695, populacao: 67200000 },
];

export async function fetchPaises(): Promise<Pais[]> {
  const url =
    typeof window !== "undefined" && process?.env?.NEXT_PUBLIC_MOODLE_API
      ? process.env.NEXT_PUBLIC_MOODLE_API
      : process?.env?.NEXT_PUBLIC_MOODLE_API || "https://moodle.example.com/api/paises";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    if (Array.isArray(data)) return data as Pais[];
    return SAMPLE;
  } catch (e) {
    return SAMPLE;
  }
}
