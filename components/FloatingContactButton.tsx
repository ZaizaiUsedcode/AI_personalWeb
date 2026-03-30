'use client';

import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  VISITOR_BEHAVIOR_ANALYSIS_EVENT,
  type VisitorBehaviorAnalysisDetail,
} from '@/lib/visitorBehaviorEvents';

type FloatingButtonPhase = 'hint' | 'collapsing' | 'button';

export default function FloatingContactButton() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<FloatingButtonPhase>('hint');
  const [hasReachedAbout, setHasReachedAbout] = useState(false);
  const [hintText, setHintText] = useState('');
  const hasTriggeredMorph = useRef(false);
  const initialLanguageRef = useRef(language);
  const collapseTimerRef = useRef<number | null>(null);
  const buttonTimerRef = useRef<number | null>(null);

  const clearPhaseTimers = useEffectEvent(() => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }

    if (buttonTimerRef.current !== null) {
      window.clearTimeout(buttonTimerRef.current);
      buttonTimerRef.current = null;
    }
  });

  const scheduleHint = useEffectEvent((text: string, durationMs: number) => {
    clearPhaseTimers();
    setHintText(text);
    setPhase('hint');

    collapseTimerRef.current = window.setTimeout(() => {
      setPhase('collapsing');
    }, Math.max(1200, durationMs - 500));

    buttonTimerRef.current = window.setTimeout(() => {
      setPhase('button');
    }, Math.max(1450, durationMs - 150));
  });

  useEffect(() => {
    if (initialLanguageRef.current !== 'en' || hasReachedAbout) {
      return;
    }

    const defaultHint = '右上角按钮可以切换中文。';
    const timer = window.setTimeout(() => {
      if (!hasTriggeredMorph.current) {
        scheduleHint(defaultHint, 3200);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
      clearPhaseTimers();
    };
  }, [hasReachedAbout]);

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
      clearPhaseTimers();
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

  useEffect(() => {
    const handleAnalysis = (event: Event) => {
      if (hasTriggeredMorph.current) {
        return;
      }

      const { detail } = event as CustomEvent<VisitorBehaviorAnalysisDetail>;

      if (!detail?.text?.trim()) {
        return;
      }

      scheduleHint(detail.text.trim(), 7000);
    };

    window.addEventListener(VISITOR_BEHAVIOR_ANALYSIS_EVENT, handleAnalysis);

    return () => {
      window.removeEventListener(VISITOR_BEHAVIOR_ANALYSIS_EVENT, handleAnalysis);
    };
  }, []);

  const isButton = phase === 'button';
  const isHintVisible = phase === 'hint';

  return (
    <a
      href="#about"
      aria-label={language === 'zh' ? '跳转到关于区域' : 'Jump to about section'}
      title={language === 'zh' ? '关于我' : 'About'}
      className={`fixed left-4 bottom-4 z-50 overflow-hidden border border-orange-200 bg-white text-stone-700 shadow-[0_12px_32px_rgba(15,23,42,0.14)] transition-[width,min-height,border-radius,padding,transform,box-shadow,background-color,opacity] duration-200 ease-out will-change-[width,min-height,border-radius,transform] sm:left-6 sm:bottom-6 ${
        isButton
          ? 'inline-flex h-12 w-12 items-center justify-center rounded-full p-0 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-[0_14px_36px_rgba(15,23,42,0.18)]'
          : 'block min-h-12 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl px-4 py-3 pointer-events-none'
      } ${hasReachedAbout ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      {isHintVisible ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] border-2 border-orange-300/80 animate-pulse"
          />
          <span className="relative block text-sm leading-5 transition-opacity duration-150">
            {hintText}
          </span>
        </>
      ) : null}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-150 ${
          isButton ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <MessageCircleMore className="h-6 w-6" strokeWidth={2.2} />
      </span>
    </a>
  );
}
