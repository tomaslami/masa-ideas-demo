import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masa Ideas · Gestión interna",
  description:
    "Herramienta interna de Masa Ideas — inventario de vía pública, pipeline comercial y generador de propuestas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        {/*
          Lucide icons are loaded from the CDN as `window.lucide`, exactly as
          the design system specifies. `beforeInteractive` injects it into the
          initial HTML so it is fetched before app code; the <Icon> component
          polls for `window.lucide` to cover the load race.
        */}
        <Script
          src="https://unpkg.com/lucide@latest"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
