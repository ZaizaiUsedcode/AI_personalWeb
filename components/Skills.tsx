'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const { t, language } = useLanguage();

  const categories = [
    {
      title: { zh: '前端开发', en: 'Frontend' },
      icon: Code2,
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 88 },
      ],
    },
    {
      title: { zh: '后端开发', en: 'Backend' },
      icon: Database,
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'RESTful API', level: 80 },
      ],
    },
    {
      title: { zh: '开发工具', en: 'Tools' },
      icon: Wrench,
      skills: [
        { name: 'Git / GitHub', level: 85 },
        { name: 'Claude / ChatGPT', level: 90 },
        { name: 'Vite', level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" data-section="skills" className="py-20 px-6 bg-orange-50/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {t('技能专长', 'Skills')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 border border-orange-100">
                <div className="flex items-center gap-2 mb-5">
                  <IconComponent className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold text-stone-800">
                    {language === 'zh' ? category.title.zh : category.title.en}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5 text-sm">
                        <span className="text-stone-700">{skill.name}</span>
                        <span className="text-orange-500 font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-orange-50 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
