'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin } from 'lucide-react';

function VercelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3.25 21.5 20.75h-19L12 3.25Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-orange-100 py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
        <p className="text-stone-600">
          © 2024 Jessie Chen · {t('保留所有权利', 'All rights reserved')}
        </p>
        <div className="flex gap-3 text-stone-500">
          <a
            href="https://www.linkedin.com/in/yan-chen-50120527a/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-orange-50/40 transition-colors hover:text-orange-500"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/ZaizaiUsedcode?tab=repositories"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-orange-50/40 transition-colors hover:text-orange-500"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://vercel.com/jessies-projects-30765941/ai-personal-web"
            target="_blank"
            rel="noreferrer"
            aria-label="Vercel"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-orange-50/40 transition-colors hover:text-orange-500"
          >
            <VercelIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
