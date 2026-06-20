import type { Metadata } from "next";
import { Sofia_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AppShell } from "@/components/layout/AppShell";

// Sofia Sans: sustituto open-source más cercano a MarkForMC (lenguaje Mastercard).
const sofiaSans = Sofia_Sans({
  variable: "--font-sans-sofia",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masa Ideas · Sistema de gestión de carteles",
  description:
    "Un solo lugar para ver el inventario, gestionar clientes y armar propuestas profesionales en minutos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${sofiaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
