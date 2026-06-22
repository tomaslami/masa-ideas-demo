import { redirect } from "next/navigation";

export default function Home() {
  // The app opens on the inventory map — the primary operational screen.
  redirect("/inventario");
}
