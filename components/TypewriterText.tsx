'use client';

import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  isActive: boolean;
};

export default function TypewriterText({ text, isActive }: TypewriterTextProps) {
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= text.length) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 16);

    return () => {
      window.clearInterval(timer);
    };
  }, [isActive, text]);

  return (
    <p className="min-h-[10.5rem] text-base leading-7 text-stone-700">
      {text.slice(0, typedLength)}
    </p>
  );
}
