import { ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ lang, darkMode }) {
  const t = translations[lang];

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
      <div className={`inline-flex items-center gap-2 ${darkMode ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-700'} border px-3.5 py-1.5 rounded-full text-xs mb-6 shadow-sm`}>
        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
        {t.badge}
      </div>

      <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-neutral-900'} max-w-4xl mb-4 leading-[1.1]`}>
        {t.heroTitle} <span className="text-amber-500">{t.heroTitleHighlight}</span>
      </h1>

      <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'} text-sm md:text-base max-w-2xl font-normal leading-relaxed`}>
        {t.heroSubtitle}
      </p>
    </section>
  );
}