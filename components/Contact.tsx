'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const { t, language } = useLanguage();

  const contactInfo = [
    { icon: Phone, label: { zh: '电话', en: 'Phone' }, value: '13630815209' },
    { icon: Mail, label: { zh: '邮箱', en: 'Email' }, value: 'JC2015080419@gmail.com' },
    { icon: MapPin, label: { zh: '位置', en: 'Location' }, value: language === 'zh' ? '杭州' : 'HangZhou' },
  ];

  return (
    <section id="contact" data-section="contact" className="py-20 px-6 bg-orange-50/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">
          {t('联系我', 'Contact')}
        </h2>

        <div className="mx-auto flex max-w-xl flex-col gap-4">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-orange-100">
                <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-stone-500">{language === 'zh' ? info.label.zh : info.label.en}</p>
                  <p className="text-sm font-medium text-stone-700">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
