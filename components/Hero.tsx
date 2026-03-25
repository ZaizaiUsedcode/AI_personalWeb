'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

// 动态导入 Three.js 组件，禁用 SSR
const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      data-section="home"
      className="relative min-h-screen flex items-center justify-center pt-14 px-6 overflow-hidden"
    >
      {/* Three.js 背景 */}
      <ThreeBackground />

      {/* 内容 */}
      <div className="relative z-10 max-w-3xl mx-auto text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-stone-800">
          {t('Hi, I am', 'Hi, I am')} <span className="text-orange-500">Jessie</span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-600 mb-6">
          {t('前端工程师', 'Frontend Developer')}
        </p>

        <p className="text-base text-stone-500 max-w-xl mx-auto mb-10 leading-relaxed">
          {t(
            '拥有2年前端开发经验，专注于 React/Next.js 生态，擅长构建高性能 Web 应用与 AI 集成解决方案',
            '2 years of frontend development experience, specializing in React, Next.js, and TypeScript, building complex web applications and AI-powered solutions'
          )}
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            {t('联系我', 'Contact Me')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={language === 'zh' ? '/resume-zh.pdf' : '/resume-en.pdf'}
            download={language === 'zh' ? 'Jessie-前端简历.pdf' : 'Jessie-Resume.pdf'}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-orange-500 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {t('下载简历', 'Download Resume')}
          </a>
        </div>
      </div>
    </section>
  );
}
