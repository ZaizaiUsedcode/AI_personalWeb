'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'zh' ? '感谢您的留言！' : 'Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="flex h-full flex-col gap-4">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex flex-1 items-center gap-3 bg-white rounded-xl p-4 border border-orange-100">
                  <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-stone-500">{language === 'zh' ? info.label.zh : info.label.en}</p>
                    <p className="text-sm font-medium text-stone-700">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder={t('姓名', 'Name')}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-white border border-orange-100 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300 text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder={t('邮箱', 'Email')}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-white border border-orange-100 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300 text-sm"
            />
            <textarea
              name="message"
              placeholder={t('留言', 'Message')}
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full flex-1 px-4 py-2.5 bg-white border border-orange-100 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300 text-sm resize-none"
            />
            <button
              type="submit"
              className="mt-auto w-full bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {t('发送', 'Send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
