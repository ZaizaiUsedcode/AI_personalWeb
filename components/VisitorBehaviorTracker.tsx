'use client';

import { useEffect, useRef } from 'react';
import useVisitorBehavior from '@/app/hooks/useVisitorbehavior';
import type { VisitorBehaviorPayload } from '@/types/visitor-behavior';

function createSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}`;
}

export default function VisitorBehaviorTracker() {
  const behavior = useVisitorBehavior();
  const sessionIdRef = useRef(createSessionId());
  const behaviorRef = useRef(behavior);

  useEffect(() => {
    behaviorRef.current = behavior;
  }, [behavior]);

  useEffect(() => {
    const buildPayload = (): VisitorBehaviorPayload => ({
      sessionId: sessionIdRef.current,
      pathname: window.location.pathname,
      sentAt: new Date().toISOString(),
      behavior: behaviorRef.current,
    });

    const sendForAnalysis = () => {
      const payload = JSON.stringify(buildPayload());

      void fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
        keepalive: true,
      }).catch(error => {
        console.error('Failed to analyze visitor behavior', error);
      });
    };

    const flush = () => {
      const payload = JSON.stringify(buildPayload());
      navigator.sendBeacon('/api/chat', payload);
    };

    const timer = window.setInterval(sendForAnalysis, 8000);
    window.addEventListener('pagehide', flush);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('pagehide', flush);
    };
  }, []);

  return null;
}
