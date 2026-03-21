'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-orange-100 py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
        <p className="text-stone-600">
          © 2024 Jessie Chen · {t('保留所有权利', 'All rights reserved')}
        </p>
        <div className="flex gap-4 text-stone-500">
          <a href="https://www.linkedin.com/in/yan-chen-50120527a/" className="hover:text-orange-500 transition-colors">LinkedIn</a>
          <a href="https://github.com/ZaizaiUsedcode?tab=repositories" className="hover:text-orange-500 transition-colors">GitHub</a>
          <a href="https://vercel.com/jessies-projects-30765941/ai-personal-web" className="hover:text-orange-500 transition-colors">Vercel</a>
        </div>
      </div>
    </footer>
  );
}
