'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: { zh: '主页', en: 'Home' }, href: '#home' },
    { name: { zh: '背景', en: 'Background' }, href: '#background' },
    { name: { zh: '技能', en: 'Skills' }, href: '#skills' },
    { name: { zh: '经历', en: 'Experience' }, href: '#experience' },
    { name: { zh: '项目', en: 'Projects' }, href: '#portfolio' },
    { name: { zh: '关于', en: 'About' }, href: '#about' },
    { name: { zh: '联系', en: 'Contact' }, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-orange-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-orange-500">Jessie</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-stone-600 hover:text-orange-500 transition-colors"
              >
                {t(item.name.zh, item.name.en)}
              </a>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-orange-500 p-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm text-stone-600 hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(item.name.zh, item.name.en)}
              </a>
            ))}
            <div className="pt-2">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
