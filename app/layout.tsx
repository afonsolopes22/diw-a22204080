import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <nav className="flex gap-3">
          <Link href="/">Início</Link>
          <Link href="/produtos">Produtos</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
