'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, UserRound } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMorphArrive = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      section.dataset.highlighted = 'true';

      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }

      clearTimerRef.current = window.setTimeout(() => {
        delete section.dataset.highlighted;
      }, 900);
    };

    window.addEventListener('about-morph-arrive', handleMorphArrive);

    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
      window.removeEventListener('about-morph-arrive', handleMorphArrive);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" data-section="about" className="group py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          data-about-morph-target
          className="mb-12 text-center text-3xl font-bold text-stone-800 transition-all duration-500 group-data-[highlighted=true]:scale-[1.02] group-data-[highlighted=true]:text-orange-500 group-data-[highlighted=true]:drop-shadow-[0_8px_24px_rgba(249,115,22,0.24)]"
        >
          {t('关于我', 'About')}
        </h2>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div
            className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm transition-all duration-500 group-data-[highlighted=true]:border-orange-300 group-data-[highlighted=true]:shadow-[0_18px_40px_rgba(249,115,22,0.18)]"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <UserRound className="h-5 w-5" />
            </div>
            <p className="text-base leading-7 text-stone-700">
              {t(
                '我偏好把复杂问题拆成可落地的小块来解决，重视体验、性能和可维护性之间的平衡。无论是做业务页面、设计系统还是 AI 集成，我都希望交付的是清晰、稳定、能长期迭代的产品。',
                'I like breaking complex problems into shippable pieces and balancing UX, performance, and maintainability. Whether I am building product surfaces, design systems, or AI integrations, I aim for work that is clear, stable, and easy to evolve.'
              )}
            </p>
          </div>

          <div
            className="rounded-3xl border border-orange-100 bg-orange-50/60 p-8 transition-all duration-500 group-data-[highlighted=true]:border-orange-300 group-data-[highlighted=true]:bg-orange-50 group-data-[highlighted=true]:shadow-[0_18px_40px_rgba(249,115,22,0.12)]"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm leading-7 text-stone-700">
              {t(
                '如果你正在寻找一位能快速理解需求、愿意深入细节，同时也能把实现做得足够克制的前端工程师，我们可以继续聊聊。',
                'If you are looking for a frontend engineer who can understand product intent quickly, work through the details, and still keep implementation disciplined, we should talk.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
