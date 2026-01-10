import "./globals.css";
import Link from "next/link";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <FavoritesProvider>
          <nav className="flex gap-3">
            <Link href="/">Início</Link>
            <Link href="/produtos">Produtos</Link>
            <Link href="/paises">Paises</Link>
          </nav>

          <main>{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
