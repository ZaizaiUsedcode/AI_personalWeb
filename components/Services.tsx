'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Code, Layers } from 'lucide-react';

export default function Services() {
  const { language } = useLanguage();

  const services = language === 'zh' ? [
    { title: 'UI/UX 设计', description: '创建美观、直观的用户界面', icon: Palette },
    { title: '前端开发', description: '响应式、高性能Web应用', icon: Code },
    { title: '全栈开发', description: 'Next.js 前后端完整方案', icon: Layers },
  ] : [
    { title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces', icon: Palette },
    { title: 'Frontend Dev', description: 'Responsive, high-performance apps', icon: Code },
    { title: 'Full-Stack', description: 'Complete Next.js solutions', icon: Layers },
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {language === 'zh' ? '服务' : 'Services'}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 border border-orange-100 text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2 text-stone-800">{service.title}</h3>
                <p className="text-sm text-stone-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
