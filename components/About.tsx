'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';
import TypewriterText from '@/components/TypewriterText';
import type { ChatMessage } from '@/types/chat';
import {
  VISITOR_BEHAVIOR_STORAGE_KEY,
} from '@/lib/visitorBehaviorEvents';
import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';

export default function About() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const manualRequestIdRef = useRef(0);
  const hasLoadedArrivalIntroRef = useRef(false);
  const [isSelected, setIsSelected] = useState(false);
  const [shouldStartTyping, setShouldStartTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const defaultAboutText = t(
    '我偏好把复杂问题拆成可落地的小块来解决，重视体验、性能和可维护性之间的平衡。无论是做业务页面、设计系统还是 AI 集成，我都希望交付的是清晰、稳定、能长期迭代的产品。如果你正在寻找一位能快速理解需求、愿意深入细节，同时也能把实现做得足够克制的前端工程师，我们可以继续聊聊。',
    'I like breaking complex problems into shippable pieces and balancing UX, performance, and maintainability. Whether I am building product surfaces, design systems, or AI integrations, I aim for work that is clear, stable, and easy to evolve. If you are looking for a frontend engineer who can understand product intent quickly, work through the details, and still keep implementation disciplined, we should talk.'
  );
  const [aboutText, setAboutText] = useState(defaultAboutText);
  const textareaPlaceholder = t(
    '如果你愿意，也可以在这里留下你对合作方式、项目方向或想法的描述……',
    'If you want, leave a note here about collaboration style, project direction, or what you are looking for...'
  );
  const sendLabel = t('发送', 'Send');
  const sendingLabel = t('发送中...', 'Sending...');
  const sendHint = t('按 Command/Ctrl + Enter 快速发送', 'Press Command/Ctrl + Enter to send');
  const manualErrorText = t(
    '暂时无法获取回答，请稍后再试。',
    'The assistant could not respond right now. Please try again later.'
  );
  const aboutIntroFallbackText = t(
    '如果你刚才只是快速浏览过页面，可以先看看 project 里的几个代表项目；如果你更关心合作方式、技术判断或过往经历，也可以直接在这里问我。我会按你的关注点继续展开。',
    'If you just skimmed the page, it may help to spend a bit more time with a few projects first. If you are more interested in collaboration style, technical judgment, or prior experience, ask here and I will tailor the answer.'
  );

  const restartTypewriter = (text: string) => {
    setAboutText(text);
    setShouldStartTyping(false);
    window.setTimeout(() => {
      setShouldStartTyping(true);
    }, 0);
  };

  useEffect(() => {
    if (!isManualMode && !hasLoadedArrivalIntroRef.current) {
      setAboutText(defaultAboutText);
    }
  }, [defaultAboutText, isManualMode]);

  useEffect(() => {
    const handleMorphArrive = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      setShouldStartTyping(true);
      section.dataset.highlighted = 'true';

      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }

      clearTimerRef.current = window.setTimeout(() => {
        delete section.dataset.highlighted;
      }, 900);

      if (hasLoadedArrivalIntroRef.current) {
        return;
      }

      hasLoadedArrivalIntroRef.current = true;
      setIsSelected(true);

      let snapshot: VisitorBehaviorPayload | null = null;

      try {
        const raw = window.sessionStorage.getItem(VISITOR_BEHAVIOR_STORAGE_KEY);
        snapshot = raw ? (JSON.parse(raw) as VisitorBehaviorPayload) : null;
      } catch (error) {
        console.error('Failed to read visitor behavior snapshot', error);
      }

      if (!snapshot) {
        restartTypewriter(aboutIntroFallbackText);
        return;
      }

      void fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...snapshot,
          language,
          sentAt: new Date().toISOString(),
          analysisMode: 'about_intro',
        }),
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error(`About intro request failed with status ${response.status}`);
          }

          const result = (await response.json()) as { analysis?: string | null };
          const text = result.analysis?.trim();

          restartTypewriter(text || aboutIntroFallbackText);
        })
        .catch(error => {
          console.error('Failed to fetch about intro', error);
          restartTypewriter(aboutIntroFallbackText);
        });
    };

    window.addEventListener('about-morph-arrive', handleMorphArrive);

    return () => {
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
      window.removeEventListener('about-morph-arrive', handleMorphArrive);
    };
  }, [aboutIntroFallbackText, language]);

  const handleSubmit = async () => {
    const trimmed = inputValue.trim();

    if (!trimmed || isSubmitting) {
      return;
    }

    setIsSelected(true);
    setIsManualMode(true);
    setIsSubmitting(true);

    const requestId = manualRequestIdRef.current + 1;
    manualRequestIdRef.current = requestId;

    const messages: ChatMessage[] = [{ role: 'user', content: trimmed }];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Manual chat request failed with status ${response.status}`);
      }

      const result = (await response.json()) as { analysis?: string | null };
      const reply = result.analysis?.trim();

      if (manualRequestIdRef.current !== requestId) {
        return;
      }

      restartTypewriter(reply || manualErrorText);
      setInputValue('');
    } catch (error) {
      console.error('Failed to fetch manual assistant reply', error);

      if (manualRequestIdRef.current === requestId) {
        restartTypewriter(manualErrorText);
      }
    } finally {
      if (manualRequestIdRef.current === requestId) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section ref={sectionRef} id="about" data-section="about" className="group py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          data-about-morph-target
          className="mb-12 text-center text-3xl font-bold text-stone-800 transition-all duration-500 group-data-[highlighted=true]:scale-[1.02] group-data-[highlighted=true]:text-orange-500 group-data-[highlighted=true]:drop-shadow-[0_8px_24px_rgba(249,115,22,0.24)]"
        >
          {t('关于我', 'About')}
        </h2>

        <div className="grid gap-6">
          <div
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => setIsSelected(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsSelected(true);
              }
            }}
            className={`relative rounded-3xl border border-orange-100 bg-white p-8 shadow-sm transition-all duration-500 group-data-[highlighted=true]:border-orange-300 group-data-[highlighted=true]:shadow-[0_18px_40px_rgba(249,115,22,0.18)] ${
              isSelected ? 'border-orange-300 bg-orange-50/70 shadow-[0_18px_40px_rgba(249,115,22,0.12)]' : 'pb-3'
            }`}
          >
            {isSelected ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 rounded-[4px] border-r border-b border-orange-200 bg-orange-50/70"
              />
            ) : null}
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <TypewriterText
              key={`${aboutText}-${shouldStartTyping ? 'active' : 'idle'}`}
              text={aboutText}
              isActive={shouldStartTyping}
            />
            <div
              className={`grid transition-[grid-template-rows,opacity,margin-top] duration-500 ${
                isSelected ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <textarea
                  rows={4}
                  value={inputValue}
                  placeholder={textareaPlaceholder}
                  className="w-full resize-none rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-sm text-stone-700 outline-none transition-colors placeholder:text-stone-400 focus:border-orange-300"
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                      event.preventDefault();
                      void handleSubmit();
                    }
                  }}
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs leading-5 text-stone-400">{sendHint}</p>
                  <button
                    type="button"
                    className="rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
                    onClick={(event) => {
                      event.stopPropagation();
                      void handleSubmit();
                    }}
                    disabled={isSubmitting || inputValue.trim().length === 0}
                  >
                    {isSubmitting ? sendingLabel : sendLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
