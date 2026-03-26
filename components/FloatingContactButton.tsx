'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type FloatingButtonPhase = 'hint' | 'collapsing' | 'button';

export default function FloatingContactButton() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<FloatingButtonPhase>('hint');
  const [hasReachedAbout, setHasReachedAbout] = useState(false);
  const hasTriggeredMorph = useRef(false);

  useEffect(() => {
    const collapseTimer = window.setTimeout(() => {
      setPhase('collapsing');
    }, 3200);

    const buttonTimer = window.setTimeout(() => {
      setPhase('button');
    }, 3550);

    return () => {
      window.clearTimeout(collapseTimer);
      window.clearTimeout(buttonTimer);
    };
  }, []);

  useEffect(() => {
    const aboutSection = document.getElementById('about');

    if (!aboutSection) {
      return;
    }

    const triggerMorph = () => {
      if (hasTriggeredMorph.current) {
        return;
      }

      hasTriggeredMorph.current = true;
      setPhase('button');
      setHasReachedAbout(true);

      window.setTimeout(() => {
        window.dispatchEvent(new Event('about-morph-arrive'));
      }, 300);
    };

    const updateVisibility = () => {
      const { top } = aboutSection.getBoundingClientRect();
      if (top <= window.innerHeight - 120) {
        triggerMorph();
      }
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const isButton = phase === 'button';
  const isHintVisible = phase === 'hint';

  return (
    <a
      href="#about"
      aria-label={language === 'zh' ? '跳转到关于区域' : 'Jump to about section'}
      title={language === 'zh' ? '关于我' : 'About'}
      className={`fixed left-4 bottom-4 z-50 overflow-hidden border border-orange-200 bg-white text-stone-700 shadow-[0_12px_32px_rgba(15,23,42,0.14)] transition-[width,height,border-radius,padding,transform,box-shadow,background-color,opacity] duration-300 ease-out will-change-[width,height,border-radius,transform] sm:left-6 sm:bottom-6 ${
        isButton
          ? 'inline-flex h-12 w-12 items-center justify-center rounded-full p-0 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-[0_14px_36px_rgba(15,23,42,0.18)]'
          : 'block h-12 w-[240px] rounded-2xl px-4 py-3 pointer-events-none'
      } ${hasReachedAbout ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-[inherit] border-2 border-orange-300/80 transition-opacity duration-300 ${
          isHintVisible ? 'animate-pulse opacity-100' : 'opacity-0'
        }`}
      />
      <span
        className={`absolute inset-0 flex items-center px-4 text-sm whitespace-nowrap transition-all duration-200 ${
          isHintVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        右上角「中文」可切换语言
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
          isButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <MessageCircleMore className="h-6 w-6" strokeWidth={2.2} />
      </span>
    </a>
  );
}
