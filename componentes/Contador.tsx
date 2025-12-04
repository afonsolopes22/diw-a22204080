"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState<number>(0);
  const [historico, setHistorico] = useState<number[]>([0]);

  // carregar do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const guardado = window.localStorage.getItem("contador_valor");
    const histGuardado = window.localStorage.getItem("contador_hist");

    if (guardado !== null) {
      setValor(Number(guardado));
    }
    if (histGuardado) {
      try {
        setHistorico(JSON.parse(histGuardado));
      } catch {
        // ignore
      }
    }
  }, []);

  // guardar no localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("contador_valor", String(valor));
    window.localStorage.setItem("contador_hist", JSON.stringify(historico));
  }, [valor, historico]);

  function registar(novo: number) {
    setValor(novo);
    setHistorico((prev) => [...prev, novo]);
  }

  function incrementar() {
    if (valor < 10) registar(valor + 1);
  }

  function decrementar() {
    if (valor > 0) registar(valor - 1);
  }

  function reset() {
    registar(0);
  }

  let cor = "";
  if (valor >= 0 && valor <= 3) cor = "text-red-600";
  else if (valor >= 4 && valor <= 7) cor = "text-yellow-500";
  else cor = "text-green-600";

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <button
          onClick={decrementar}
          className="px-3 py-1 rounded bg-slate-200"
        >
          -1
        </button>
        <span className={`text-3xl font-bold ${cor}`}>{valor}</span>
        <button
          onClick={incrementar}
          className="px-3 py-1 rounded bg-slate-200"
        >
          +1
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 rounded bg-slate-300 ml-4"
        >
          Reset
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Histórico</h3>
        <ul className="list-disc ml-5">
          {historico.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
