"use client";

import { useEffect, useState } from "react";

interface Props {
  title: string;
}

export default function ContadorPersonalizado({ title }: Props) {
  const key = `likes-${title}`;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const guardado = window.localStorage.getItem(key);
    if (guardado) setLikes(Number(guardado));
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, String(likes));
  }, [key, likes]);

  return (
    <button
      className="mt-2 text-xs bg-pink-200 rounded-full px-3 py-1"
      onClick={() => setLikes((l) => l + 1)}
    >
      ❤️ Likes: {likes}
    </button>
  );
}
