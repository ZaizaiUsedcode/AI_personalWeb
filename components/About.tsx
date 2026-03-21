'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Languages, Download } from 'lucide-react';

export default function About() {
  const { t, language } = useLanguage();

  const stats = [
    { value: '2', label: { zh: '年经验', en: 'Years' } },
    { value: '6+', label: { zh: '项目', en: 'Projects' } },
    { value: '4', label: { zh: '公司', en: 'Companies' } },
    { value: '100+', label: { zh: '用户', en: 'Users' } },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {t('关于我', 'About Me')}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-stone-800">
                  {t('教育背景', 'Education')}
                </h3>
              </div>
              <p className="text-stone-700 font-medium mb-1">
                {t('渥太华大学', 'University of Ottawa')} (QS 189)
              </p>
              <p className="text-stone-600 text-sm mb-1">
                {t('信息与计算科学', 'B.Sc. Computer Science')}
              </p>
              <p className="text-stone-500 text-sm mb-3">
                {language === 'zh' ? '2019-2023 | Merit 奖学金' : '2019-2023 | Merit Scholarship'}
              </p>
              <div className="flex items-center gap-2 text-orange-600 text-sm">
                <Languages className="w-4 h-4" />
                <span>{t('雅思 6.5', 'IELTS 6.5')}</span>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <p className="text-stone-700 text-sm leading-relaxed">
                {t(
                  '拥有 2 年前端开发经验，曾就职于加拿大 Knowlecy、微软等公司，擅长 React/Next.js 全栈开发。精通组件化架构、状态管理、性能优化。',
                  'Frontend Engineer with 2 years of experience at Knowlecy (Canada) and Microsoft. Specializing in React/Next.js full-stack development with expertise in component architecture and state management.'
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 text-center border border-orange-100"
              >
                <div className="text-3xl font-bold text-orange-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-stone-600 text-sm">
                  {language === 'zh' ? stat.label.zh : stat.label.en}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 bg-white text-orange-500 px-5 py-2.5 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {t('下载简历', 'Download Resume')}
          </a>
        </div>
      </div>
    </section>
  );
}
