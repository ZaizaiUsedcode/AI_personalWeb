'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Zap, Shield, Rocket } from 'lucide-react';

export default function Experience() {
  const { language } = useLanguage();

  const iconMap = { book: BookOpen, zap: Zap, shield: Shield, rocket: Rocket };

  const experiences = language === 'zh' ? [
    {
      company: '易读信息技术',
      position: '前端工程师',
      period: '2025.12 - 2026.03',
      description: 'AI 阅读系统 - PDF 标注、SSE 流式传输、富文本编辑',
      icon: 'book',
    },
    {
      company: '独立开发',
      position: '前端工程师',
      period: '2025.03 - 2025.11',
      description: 'Next.js 全栈应用 - JWT 认证、Prisma + PostgreSQL',
      icon: 'zap',
    },
    {
      company: 'Microsoft',
      position: 'Defender 支持工程师',
      period: '2023.12 - 2024.10',
      description: '企业级安全技术支持 - 服务 100+ 海外用户',
      icon: 'shield',
    },
    {
      company: 'Knowlecy',
      position: '前端工程师',
      period: '2023.05 - 2023.09',
      description: 'React 组件化重构 - Bootstrap → React 迁移',
      icon: 'rocket',
    },
  ] : [
    {
      company: 'YiRead Technology',
      position: 'Frontend Engineer',
      period: 'Dec 2025 - Mar 2026',
      description: 'AI Reading System - PDF annotation, SSE streaming, rich text editor',
      icon: 'book',
    },
    {
      company: 'Independent',
      position: 'Frontend Engineer',
      period: 'Mar 2025 - Nov 2025',
      description: 'Next.js Full-Stack - JWT auth, Prisma + PostgreSQL',
      icon: 'zap',
    },
    {
      company: 'Microsoft',
      position: 'Support Engineer',
      period: 'Dec 2023 - Oct 2024',
      description: 'Enterprise Security Support - 100+ global users',
      icon: 'shield',
    },
    {
      company: 'Knowlecy',
      position: 'Frontend Engineer',
      period: 'May 2023 - Sep 2023',
      description: 'React Migration - Bootstrap to React component architecture',
      icon: 'rocket',
    },
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {language === 'zh' ? '工作经历' : 'Experience'}
        </h2>

        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const IconComponent = iconMap[exp.icon as keyof typeof iconMap];
            return (
              <div key={index} className="bg-white rounded-2xl p-6 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-stone-800">{exp.position}</h3>
                      <span className="text-xs text-stone-500">{exp.period}</span>
                    </div>
                    <p className="text-sm text-orange-600 mb-2">{exp.company}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
