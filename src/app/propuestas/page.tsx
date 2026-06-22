'use client';
import dynamic from 'next/dynamic';
import { Loading } from '@/modules/Loading';

const ProposalsApp = dynamic(
  () => import('@/modules/proposals/ProposalsApp').then((m) => m.ProposalsApp),
  { ssr: false, loading: () => <Loading /> }
);

export default function Page() {
  return <ProposalsApp />;
}
