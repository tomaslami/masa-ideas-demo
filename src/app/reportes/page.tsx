'use client';
import dynamic from 'next/dynamic';
import { Loading } from '@/modules/Loading';

// Browser-only app (charts, CDN icons) → render client-side only.
const ReportesApp = dynamic(
  () => import('@/modules/reportes/ReportesApp').then((m) => m.ReportesApp),
  { ssr: false, loading: () => <Loading /> }
);

export default function Page() {
  return <ReportesApp />;
}
