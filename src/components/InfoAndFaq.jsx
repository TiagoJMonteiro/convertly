
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { translations } from '../data/translations';

export default function InfoAndFaq({ lang, darkMode }) {
  const t = translations[lang] || translations.EN;
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 mb-28 w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* How it works */}
      <div>
        <h2
          className={`text-2xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-neutral-900'
          } mb-3`}
        >
          {t.howItWorks}
        </h2>

        <p className="text-sm text-neutral-400 leading-relaxed mb-8">
          {t.howDesc}
        </p>

        <h3
          className={`text-xs font-semibold ${
            darkMode ? 'text-white' : 'text-neutral-900'
          } uppercase tracking-wider mb-4`}
        >
          {t.threeSteps}
        </h3>

        <div className="space-y-4 mb-10">

          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-[#1e170d] border border-amber-500/40 text-amber-500 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              1
            </span>

            <p className="text-sm text-neutral-300">
              {t.stepOneText}
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-[#1e170d] border border-amber-500/40 text-amber-500 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              2
            </span>

            <p className="text-sm text-neutral-300">
              {t.stepTwoText}
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="w-6 h-6 rounded-full bg-[#1e170d] border border-amber-500/40 text-amber-500 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              3
            </span>

            <p className="text-sm text-neutral-300">
              {t.stepThreeText}
            </p>
          </div>

        </div>

        <h3
          className={`text-xs font-semibold ${
            darkMode ? 'text-white' : 'text-neutral-900'
          } uppercase tracking-wider mb-3`}
        >
          {t.whyUse}
        </h3>

        <p className="text-sm text-neutral-400 leading-relaxed">
          {t.whyDesc}
        </p>
      </div>

      {/* FAQ */}
      <div>
        <h2
          className={`text-2xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-neutral-900'
          } mb-6`}
        >
          {t.faqTitle}
        </h2>

        <div
          className={`border-t ${
            darkMode ? 'border-neutral-800' : 'border-neutral-200'
          }`}
        >

          {t.faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border-b ${
                darkMode ? 'border-neutral-800' : 'border-neutral-200'
              } transition`}
            >

              <button
                onClick={() =>
                  setOpenFaq(openFaq === idx ? null : idx)
                }
                className={`w-full py-4 text-left flex items-center justify-between gap-4 text-sm font-medium ${
                  darkMode
                    ? 'text-neutral-200 hover:text-white'
                    : 'text-neutral-800 hover:text-black'
                } transition`}
              >
                <span>{faq.q}</span>

                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-neutral-500 transition-transform ${
                    openFaq === idx
                      ? 'rotate-180 text-amber-500'
                      : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="pb-4 text-sm text-neutral-400 leading-relaxed pt-1">
                  {faq.a}
                </div>
              )}

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
