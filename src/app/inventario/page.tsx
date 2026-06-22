'use client';
import dynamic from 'next/dynamic';
import { Loading } from '@/modules/Loading';

// Browser-only app (map, drag, FileReader, CDN icons) → render client-side only.
const InventoryApp = dynamic(
  () => import('@/modules/inventory/InventoryApp').then((m) => m.InventoryApp),
  { ssr: false, loading: () => <Loading /> }
);

export default function Page() {
  return <InventoryApp />;
}
