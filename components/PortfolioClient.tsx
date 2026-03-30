'use client';

import dynamic from 'next/dynamic';

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  ssr: false,
  loading: () => null,
});

export default function PortfolioClient() {
  return <Portfolio />;
}
