
import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  Sun,
  Moon,
  ArrowLeftRight,
  Check,
  X
} from 'lucide-react';

import { translations } from '../data/translations';

const toolCategories = [
  {
    category: 'Case & text',
    tools: [
      'UPPERCASE',
      'lowercase',
      'Title Case',
      'Sentence case',
      'camelCase',
      'snake_case',
      'kebab-case',
      'url-slug',
      'esreveR',
      'Unique lines',
      'Word count'
    ]
  },
  {
    category: 'Units',
    tools: [
      'Length',
      'Weight',
      'Temperature',
      'Data size',
      'Time zone'
    ]
  },
  {
    category: 'Image & QR',
    tools: [
      'Compress image',
      'PNG to JPG',
      'QR code'
    ]
  },
  {
    category: 'Code',
    tools: [
      'JSON Pretty',
      'JSON Minify'
    ]
  },
  {
    category: 'Encode / decode',
    tools: [
      'Base64 →',
      '← Base64'
    ]
  }
];

export default function Navbar({
  lang,
  setLang,
  darkMode,
  setDarkMode,
  onSelectTool
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const languages = Object.keys(translations);

  const currentTranslations = translations[lang] || translations.EN;

  // Criar lista de todas as ferramentas com os nomes traduzidos
  const allTools = toolCategories.flatMap((group) =>
    group.tools.map((toolKey) => ({
      key: toolKey,
      category: group.category,
      name:
        currentTranslations.toolNames?.[toolKey] ||
        translations.EN.toolNames?.[toolKey] ||
        toolKey
    }))
  );

  // Filtrar ferramentas com base na pesquisa
  const filteredTools = allTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.trim().toLowerCase()) ||
    tool.key.toLowerCase().includes(search.trim().toLowerCase()) ||
    tool.category.toLowerCase().includes(search.trim().toLowerCase())
  ).slice(0, 6);

  // Selecionar uma ferramenta
  const handleSelect = (tool) => {
    onSelectTool(tool.category, tool.key);
    setSearch('');
    setSearchOpen(false);
    searchRef.current?.blur();
  };

  // Atalho Ctrl + K / Command + K
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        setSearchOpen(true);
      }

      if (e.key === 'Escape') {
        setSearchOpen(false);
        searchRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  // Fechar pesquisa ao clicar fora
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header
      className={`w-full border-b ${
        darkMode
          ? 'border-neutral-800/80 bg-[#121212]/90 text-white'
          : 'border-neutral-200 bg-white/90 text-neutral-900'
      } backdrop-blur-md sticky top-0 z-50 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center text-black font-bold shadow-sm">
            <ArrowLeftRight className="w-4 h-4 text-black" />
          </div>

          <span className="font-semibold text-sm tracking-tight">
            Convertly
          </span>
        </a>

        {/* Search Bar */}
        <div
          ref={searchContainerRef}
          className="hidden md:flex items-center relative w-[360px]"
        >
          <Search className="absolute left-3 w-3.5 h-3.5 text-neutral-400 z-10" />

        <label htmlFor="navbar-tool-search" className="sr-only">
  Search tools
</label>

          <input
            id="navbar-tool-search"
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredTools.length > 0) {
                handleSelect(filteredTools[0]);
              }
            }}
            placeholder={currentTranslations.searchPlaceholder}
            autoComplete="off"
            className={`w-full ${
              darkMode
                ? 'bg-neutral-900/90 border-neutral-800 text-white placeholder-neutral-500'
                : 'bg-neutral-100 border-neutral-200 text-neutral-900 placeholder-neutral-400'
            } border rounded-lg pl-9 pr-12 py-2 text-xs focus:outline-none focus:border-amber-500 transition`}
          />

          {search.length > 0 ? (
            <button
            type="button"
aria-label="Clear search"
              onClick={() => {
                setSearch('');
                setSearchOpen(false);
                searchRef.current?.focus();
              }}
              className="absolute right-3 text-neutral-400 hover:text-white"
            >
              <X size={14} />
              
            </button>
          ) : (
            <span
              className={`absolute right-2.5 text-[10px] ${
                darkMode
                  ? 'bg-neutral-800 text-neutral-400 border-neutral-700/60'
                  : 'bg-neutral-200 text-neutral-600 border-neutral-300'
              } px-1.5 py-0.5 rounded border font-mono`}
            >
              ⌘K
            </span>
          )}

          {/* Search Results */}
          {searchOpen && search.trim() !== '' && (
            <div
              className={`absolute top-full left-0 mt-2 w-full rounded-xl border shadow-2xl overflow-hidden ${
                darkMode
                  ? 'bg-[#1a1a1a] border-neutral-800'
                  : 'bg-white border-neutral-200'
              }`}
            >
              {filteredTools.length > 0 ? (
                <div className="p-2">
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500 px-3 py-2">
                    Search results
                  </p>

                  {filteredTools.map((tool) => (
                    <button
                      key={tool.key}
                      onClick={() => handleSelect(tool)}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                        darkMode
                          ? 'hover:bg-neutral-800'
                          : 'hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Search
                          size={14}
                          className="text-neutral-500 shrink-0"
                        />

                        <span
                          className={`text-xs font-medium truncate ${
                            darkMode ? 'text-white' : 'text-neutral-900'
                          }`}
                        >
                          {tool.name}
                        </span>
                      </div>

                      <span className="text-[10px] text-neutral-500 shrink-0">
                        {tool.category}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Search
                    size={22}
                    className="mx-auto mb-2 text-neutral-500"
                  />

                  <p className="text-xs text-neutral-500">
                    No tools found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Language and Theme Controls */}
        <div className="flex items-center gap-2.5 relative">

          {/* Language Menu */}
          <div className="relative">
            <button
            type="button"
aria-label={`Change language. Current language: ${currentTranslations.name}`}
aria-haspopup="true"
aria-expanded={langMenuOpen}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1.5 text-xs font-medium ${
                darkMode
                  ? 'text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                  : 'text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border-neutral-200'
              } border px-3 py-1.5 rounded-lg transition`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              {lang} ({currentTranslations.name})
            </button>

            {langMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-44 ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-white border-neutral-200 text-neutral-900'
                } border rounded-xl shadow-2xl py-1 z-50`}
              >
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs flex items-center justify-between ${
                      darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                    } transition`}
                  >
                    <span>{translations[l].name} ({l})</span>

                    {lang === l && (
                      <Check className="w-3.5 h-3.5 text-amber-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode */}
          <button
          type="button"
aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 ${
              darkMode
                ? 'text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border-neutral-800'
                : 'text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border-neutral-200'
            } border rounded-lg transition`}
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-neutral-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
