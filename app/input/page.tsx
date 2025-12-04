"use client";

import { useState } from "react";

const categorias = ["HTML", "CSS", "JavaScript", "React", "Next.js"];

interface Tarefa {
  id: number;
  texto: string;
  categoria: string;
}

export default function InputPage() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTexto, setEditingTexto] = useState("");

  function adicionarTarefa() {
    if (!texto.trim()) return;
    const nova: Tarefa = {
      id: Date.now(),
      texto,
      categoria,
    };
    setTarefas((prev) => [...prev, nova]);
    setTexto("");
  }

  function apagar(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function iniciarEdicao(tarefa: Tarefa) {
    setEditingId(tarefa.id);
    setEditingTexto(tarefa.texto);
  }

  function guardarEdicao(id: number) {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, texto: editingTexto } : t
      )
    );
    setEditingId(null);
    setEditingTexto("");
  }

  return (
    <div className="space-y-6">
      <h2>Input</h2>

      {/* input de texto */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Texto
          <input
            className="block w-full border rounded px-2 py-1 mt-1"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </label>
        <p className="text-sm text-slate-700">
          O que está escrito: <strong>{texto}</strong>
        </p>
      </div>

      {/* seletor de categoria */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Categoria
          <select
            className="block w-full border rounded px-2 py-1 mt-1"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* lista de tarefas */}
      <div className="space-y-3">
        <button
          onClick={adicionarTarefa}
          className="px-4 py-1 rounded bg-blue-600 text-white text-sm"
        >
          Adicionar tarefa
        </button>

        <ul className="space-y-2">
          {tarefas.map((t) => (
            <li
              key={t.id}
              className="border rounded px-3 py-2 flex flex-col gap-1"
            >
              <span className="text-xs uppercase text-slate-500">
                {t.categoria}
              </span>

              {editingId === t.id ? (
                <>
                  <input
                    className="border rounded px-2 py-1 text-sm"
                    value={editingTexto}
                    onChange={(e) => setEditingTexto(e.target.value)}
                  />
                  <button
                    onClick={() => guardarEdicao(t.id)}
                    className="self-start mt-1 text-xs bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <p>{t.texto}</p>
              )}

              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => iniciarEdicao(t)}
                  className="text-xs bg-yellow-400 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => apagar(t.id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
