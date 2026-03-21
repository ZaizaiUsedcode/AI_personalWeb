'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-sm"
      aria-label="Toggle Language"
    >
      <Languages className="w-4 h-4 text-orange-600" />
      <span className="font-medium text-orange-600">
        {language === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  );
}
