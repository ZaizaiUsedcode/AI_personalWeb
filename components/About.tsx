'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Languages } from 'lucide-react';

export default function About() {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {t('关于我', 'About Me')}
        </h2>

        <div className="flex justify-center">
          <div className="flex max-w-2xl flex-col justify-center space-y-6">
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
        </div>
      </div>
    </section>
  );
}
