'use client';
import dynamic from 'next/dynamic';
import { Loading } from '@/modules/Loading';

// Browser-only app (map, drag, FileReader, CDN icons) → render client-side only.
const ClientesApp = dynamic(
  () => import('@/modules/clientes/ClientesApp').then((m) => m.ClientesApp),
  { ssr: false, loading: () => <Loading /> }
);

export default function Page() {
  return <ClientesApp />;
}
