"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(agora.getHours()).padStart(2, "0");
  const mm = String(agora.getMinutes()).padStart(2, "0");
  const ss = String(agora.getSeconds()).padStart(2, "0");

  return (
    <span className="font-mono text-xs">
      {hh}:{mm}:{ss}
    </span>
  );
}
