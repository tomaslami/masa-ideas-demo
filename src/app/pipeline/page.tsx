'use client';
import dynamic from 'next/dynamic';
import { Loading } from '@/modules/Loading';

const PipelineApp = dynamic(
  () => import('@/modules/pipeline/PipelineApp').then((m) => m.PipelineApp),
  { ssr: false, loading: () => <Loading /> }
);

export default function Page() {
  return <PipelineApp />;
}
