'use client';

import { useEffect, useRef } from 'react';
import useVisitorBehavior from '@/app/hooks/useVisitorbehavior';
import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';
import {
  VISITOR_BEHAVIOR_ANALYSIS_EVENT,
  VISITOR_BEHAVIOR_STORAGE_KEY,
} from '@/lib/visitorBehaviorEvents';
import { useLanguage } from '@/contexts/LanguageContext';

function createSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}`;
}

export default function VisitorBehaviorTracker() {
  const { language } = useLanguage();
  const behavior = useVisitorBehavior();
  const sessionIdRef = useRef(createSessionId());
  const behaviorRef = useRef(behavior);
  const languageRef = useRef(language);
  const shownHintsRef = useRef<string[]>([]);
  const isRequestInFlightRef = useRef(false);
  const hasReachedAboutRef = useRef(false);

  useEffect(() => {
    behaviorRef.current = behavior;
  }, [behavior]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    const handleAnalysis = (event: Event) => {
      const { detail } = event as CustomEvent<{ text?: string }>;
      const text = detail?.text?.trim();

      if (!text) {
        return;
      }

      shownHintsRef.current = [...new Set([...shownHintsRef.current, text])].slice(-10);
    };

    const handleAboutArrive = () => {
      hasReachedAboutRef.current = true;
    };

    window.addEventListener(VISITOR_BEHAVIOR_ANALYSIS_EVENT, handleAnalysis);
    window.addEventListener('about-morph-arrive', handleAboutArrive);

    return () => {
      window.removeEventListener(VISITOR_BEHAVIOR_ANALYSIS_EVENT, handleAnalysis);
      window.removeEventListener('about-morph-arrive', handleAboutArrive);
    };
  }, []);

  useEffect(() => {
    const buildPayload = (): VisitorBehaviorPayload => ({
      sessionId: sessionIdRef.current,
      pathname: window.location.pathname,
      sentAt: new Date().toISOString(),
      language: languageRef.current,
      shownHints: shownHintsRef.current,
      behavior: behaviorRef.current,
    });

    window.sessionStorage.setItem(VISITOR_BEHAVIOR_STORAGE_KEY, JSON.stringify(buildPayload()));
  }, [behavior, language]);

  useEffect(() => {
    const sendHintAnalysis = () => {
      const currentBehavior = behaviorRef.current;
      const shouldRequestHint =
        !hasReachedAboutRef.current &&
        currentBehavior.currentSection !== 'about' &&
        !currentBehavior.viewedSections.includes('about') &&
        (
          currentBehavior.scrollDepth >= 0.3 ||
          currentBehavior.clickedProjectIds.length > 0 ||
          currentBehavior.viewedSections.length >= 2 ||
          Object.values(currentBehavior.dwellTimeMsBySection).some(ms => ms >= 4000)
        );

      if (!shouldRequestHint || isRequestInFlightRef.current) {
        return;
      }

      isRequestInFlightRef.current = true;

      const payload = JSON.stringify({
        sessionId: sessionIdRef.current,
        pathname: window.location.pathname,
        sentAt: new Date().toISOString(),
        language: languageRef.current,
        shownHints: shownHintsRef.current,
        behavior: currentBehavior,
        analysisMode: 'hint',
      });

      void fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error(`Analysis request failed with status ${response.status}`);
          }

          const result = (await response.json()) as { analysis?: string | null };
          const text = result.analysis?.trim();

          if (!text) {
            return;
          }

          window.dispatchEvent(
            new CustomEvent(VISITOR_BEHAVIOR_ANALYSIS_EVENT, {
              detail: { text },
            })
          );
        })
        .catch(error => {
          console.error('Failed to analyze visitor behavior', error);
        })
        .finally(() => {
          isRequestInFlightRef.current = false;
        });
    };

    const timer = window.setInterval(sendHintAnalysis, 10000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
