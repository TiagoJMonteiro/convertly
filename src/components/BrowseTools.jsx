import {
  Type,
  Code,
  Ruler,
  Image as ImageIcon,
  Binary,
  ArrowUpRight
} from 'lucide-react';

import { translations } from '../data/translations';

export default function BrowseTools({ onSelectTool, lang, darkMode }) {
  const t = translations[lang] || translations.EN;

  const categories = [
    {
      categoryName: 'Case & text',
      categoryKey: 'text',
      icon: <Type className="w-4 h-4 text-amber-500" />,
      tools: [
        { name: 'UPPERCASE', key: 'UPPERCASE' },
        { name: 'lowercase', key: 'lowercase' },
        { name: 'Title Case', key: 'Title Case' },
        { name: 'Sentence case', key: 'Sentence case' },
        { name: 'camelCase', key: 'camelCase' },
        { name: 'snake_case', key: 'snake_case' },
        { name: 'kebab-case', key: 'kebab-case' },
        { name: 'URL Slug', key: 'url-slug' },
        { name: 'Reverse text', key: 'esreveR' },
        { name: 'Unique lines', key: 'Unique lines' },
        { name: 'Word count', key: 'Word count' }
      ]
    },
    {
      categoryName: 'Units',
      categoryKey: 'units',
      icon: <Ruler className="w-4 h-4 text-amber-500" />,
      tools: [
        { name: 'Length', key: 'Length' },
        { name: 'Weight', key: 'Weight' },
        { name: 'Temperature', key: 'Temperature' },
        { name: 'Data size', key: 'Data size' },
        { name: 'Time zone', key: 'Time zone' }
      ]
    },
    {
      categoryName: 'Image & QR',
      categoryKey: 'image',
      icon: <ImageIcon className="w-4 h-4 text-amber-500" />,
      tools: [
        { name: 'Compress image', key: 'Compress image' },
        { name: 'PNG to JPG', key: 'PNG to JPG' },
        { name: 'QR Code Generator', key: 'QR code' }
      ]
    },
    {
      categoryName: 'Code',
      categoryKey: 'code',
      icon: <Code className="w-4 h-4 text-amber-500" />,
      tools: [
        { name: 'JSON Pretty', key: 'JSON Pretty' },
        { name: 'JSON Minify', key: 'JSON Minify' }
      ]
    },
    {
      categoryName: 'Encode / decode',
      categoryKey: 'encoding',
      icon: <Binary className="w-4 h-4 text-amber-500" />,
      tools: [
        { name: 'Base64 Encoder', key: 'Base64 →' },
        { name: 'Base64 Decoder', key: '← Base64' }
      ]
    }
  ];

  const handleSelect = (category, toolKey) => {
    onSelectTool(category, toolKey);

    document.getElementById('tool-workspace')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-24">

      {/* Section heading */}
      <div className="mb-8">
        <h2
          className={`text-2xl font-bold tracking-tight mb-1.5 ${
            darkMode ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {t.browseTitle}
        </h2>

        <p className="text-sm text-neutral-400">
          {t.browseSubtitle}
        </p>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">

        {categories.map((cat) => (
          <article
            key={cat.categoryName}
            className={`
              h-full min-w-0 flex flex-col
              border rounded-2xl p-5 sm:p-6
              transition-all duration-200
              hover:border-amber-500/40
              ${
                darkMode
                  ? 'bg-[#171717] border-neutral-800/80 text-white'
                  : 'bg-white border-neutral-200 text-neutral-900 shadow-sm'
              }
            `}
          >

            {/* Card header */}
            <div className="flex items-center justify-between mb-5">

              <div
                className={`
                  w-10 h-10 rounded-xl border
                  flex items-center justify-center
                  ${
                    darkMode
                      ? 'bg-neutral-900 border-neutral-800'
                      : 'bg-neutral-100 border-neutral-200'
                  }
                `}
              >
                {cat.icon}
              </div>

              <span className="text-xs text-neutral-500 font-mono">
                {cat.tools.length}{' '}
                {t.toolsCountLabel ||
                  (lang === 'PT'
                    ? 'ferramentas'
                    : lang === 'ES'
                    ? 'herramientas'
                    : lang === 'FR'
                    ? 'outils'
                    : lang === 'DN'
                    ? 'værktøjer'
                    : lang === 'RS'
                    ? 'инструментов'
                    : 'tools')}
              </span>
            </div>

            {/* Title and description */}
            <div className="mb-5">
              <h3 className="text-base font-semibold mb-1">
                {t.browseCategories?.[cat.categoryKey] || cat.categoryName}
              </h3>

              <p className="text-xs text-neutral-400 leading-relaxed">
                {t.browseCategoryDescriptions?.[cat.categoryKey] || ''}
              </p>
            </div>

            {/* Tools list */}
            <div
              className={`
                border-t pt-4 flex-1 flex flex-col
                ${
                  darkMode
                    ? 'border-neutral-800/80'
                    : 'border-neutral-200'
                }
              `}
            >
              <ul className="grid grid-cols-2 content-start flex-1 gap-x-2 gap-y-1">

                {cat.tools.map((tool) => (
                  <li key={tool.key}>
                    <button
                      type="button"
                      onClick={() => handleSelect(cat.categoryName, tool.key)}
                      className={`
                        w-full min-w-0 flex items-center justify-between
                        gap-2 text-left rounded-lg px-2.5 py-2.5
                        text-[13px] font-medium transition-all duration-150
                        group
                        ${
                          darkMode
                            ? 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-900'
                            : 'text-neutral-600 hover:text-amber-600 hover:bg-neutral-50'
                        }
                      `}
                    >
                      <span className="truncate">
                        {t.toolNames?.[tool.key] || tool.name}
                      </span>

                      <ArrowUpRight
                        className="
                          w-3.5 h-3.5 shrink-0
                          text-neutral-600
                          group-hover:text-amber-500
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          transition-all
                        "
                      />
                    </button>
                  </li>
                ))}

              </ul>
            </div>

          </article>
        ))}

      </div>
    </section>
  );
}