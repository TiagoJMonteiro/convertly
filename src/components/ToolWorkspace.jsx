import { useState, useEffect, useRef, useMemo } from 'react';
import cityTimezones from 'city-timezones';
import QRCode from 'qrcode';
import {
  Info, Copy, ArrowRightLeft, Sparkles, Upload, Trash2,
  Download, Type, Ruler, Image as ImageIcon, Braces,
  KeyRound, Check, AlertCircle, Search
} from 'lucide-react';
import { translations } from '../data/translations';

export default function ToolWorkspace({
  activeCategory,
  setActiveCategory,
  activeTool,
  setActiveTool,
  lang,
  darkMode
}) {
  const t = translations[lang] || translations.EN;
  const tz = t.timezone || translations.EN.timezone;
  const locale = {
  EN: 'en-GB',
  PT: 'pt-PT',
  ES: 'es-ES',
  FR: 'fr-FR',
  DN: 'da-DK',
  RS: 'ru-RU'
}[lang] || 'en-GB';

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [unitValue, setUnitValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('Kilometres (km)');
  const [toUnit, setToUnit] = useState('Miles (mi)');
  const [timezone, setTimezone] = useState('Europe/Lisbon');
  const [outputImage, setOutputImage] = useState('');
  const [outputFilename, setOutputFilename] = useState('convertly-result');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  

  const fileRef = useRef(null);

  // TOOLS CONFIGURATION
  const toolsConfig = {
    'Case & text': {
      icon: Type,
      tools: [
        { name: 'UPPERCASE', desc: t.toolDescriptions?.['UPPERCASE'] || 'Converts all letters to uppercase.' },
        { name: 'lowercase', desc: t.toolDescriptions?.['lowercase'] || 'Converts all letters to lowercase.' },
        { name: 'Title Case', desc: t.toolDescriptions?.['Title Case'] || 'Capitalizes the first letter of each word.' },
        { name: 'Sentence case', desc: t.toolDescriptions?.['Sentence case'] || 'Capitalizes the first letter of each sentence.' },
        { name: 'camelCase', desc: t.toolDescriptions?.['camelCase'] || 'Converts text to camelCase.' },
        { name: 'snake_case', desc: t.toolDescriptions?.['snake_case'] || 'Converts text to snake_case.' },
        { name: 'kebab-case', desc: t.toolDescriptions?.['kebab-case'] || 'Converts text to kebab-case.' },
        { name: 'url-slug', desc: t.toolDescriptions?.['url-slug'] || 'Creates a clean URL-friendly slug.' },
        { name: 'esreveR', desc: t.toolDescriptions?.['esreveR'] || 'Reverses the text.' },
        { name: 'Unique lines', desc: t.toolDescriptions?.['Unique lines'] || 'Removes duplicate lines.' },
        { name: 'Word count', desc: t.toolDescriptions?.['Word count'] || 'Counts characters, words and lines.' }
      ]
    },

    Units: {
      icon: Ruler,
      tools: [
        { name: 'Length', desc: t.toolDescriptions?.['Length'] || 'Converts length units.' },
        { name: 'Weight', desc: t.toolDescriptions?.['Weight'] || 'Converts weight and mass units.' },
        { name: 'Temperature', desc: t.toolDescriptions?.['Temperature'] || 'Converts Celsius, Fahrenheit and Kelvin.' },
        { name: 'Data size', desc: t.toolDescriptions?.['Data size'] || 'Converts digital storage units.' },
        { name: 'Time zone', desc: t.toolDescriptions?.['Time zone'] || 'Displays the current time in a selected time zone.' }
      ]
    },

    'Image & QR': {
      icon: ImageIcon,
      tools: [
        { name: 'Compress image', desc: t.toolDescriptions?.['Compress image'] || 'Reduces image file size.' },
        { name: 'PNG to JPG', desc: t.toolDescriptions?.['PNG to JPG'] || 'Converts PNG images to JPG.' },
        { name: 'QR code', desc: t.toolDescriptions?.['QR code'] || 'Creates a QR code from text or a URL.' }
      ]
    },

    Code: {
      icon: Braces,
      tools: [
        { name: 'JSON Pretty', desc: t.toolDescriptions?.['JSON Pretty'] || 'Formats JSON.' },
        { name: 'JSON Minify', desc: t.toolDescriptions?.['JSON Minify'] || 'Minifies JSON.' }
      ]
    },

    'Encode / decode': {
      icon: KeyRound,
      tools: [
        { name: 'Base64 →', desc: t.toolDescriptions?.['Base64 →'] || 'Encodes text into Base64.' },
        { name: '← Base64', desc: t.toolDescriptions?.['← Base64'] || 'Decodes Base64 into readable text.' }
      ]
    }
  };

  const currentCategoryData =
    toolsConfig[activeCategory] || toolsConfig['Case & text'];

  const activeToolObj =
    currentCategoryData.tools.find(tool => tool.name === activeTool) ||
    currentCategoryData.tools[0];

  // CATEGORY TRANSLATIONS
  const categoryTranslationKeys = {
    'Case & text': 'text',
    Units: 'units',
    'Image & QR': 'image',
    Code: 'code',
    'Encode / decode': 'encoding'
  };

  const getCategoryLabel = category =>
    t.browseCategories?.[categoryTranslationKeys[category]] || category;

  const getToolLabel = toolName =>
    t.toolNames?.[toolName] || toolName;

  // UNIT DATABASE
  const unitsDatabase = {
    Length: [
      'Kilometres (km)',
      'Metres (m)',
      'Centimetres (cm)',
      'Millimetres (mm)',
      'Inches (in)',
      'Feet (ft)',
      'Yards (yd)',
      'Miles (mi)'
    ],

    Weight: [
      'Kilograms (kg)',
      'Grams (g)',
      'Pounds (lb)',
      'Ounces (oz)'
    ],

    Temperature: [
      'Celsius (°C)',
      'Fahrenheit (°F)',
      'Kelvin (K)'
    ],

    'Data size': [
      'Megabytes (MB)',
      'Gigabytes (GB)',
      'Terabytes (TB)'
    ]
  };

  // UNIT TRANSLATIONS
  const unitTranslations = {
    PT: {
      'Kilometres (km)': 'Quilómetros (km)',
      'Metres (m)': 'Metros (m)',
      'Centimetres (cm)': 'Centímetros (cm)',
      'Millimetres (mm)': 'Milímetros (mm)',
      'Inches (in)': 'Polegadas (in)',
      'Feet (ft)': 'Pés (ft)',
      'Yards (yd)': 'Jardas (yd)',
      'Miles (mi)': 'Milhas (mi)',
      'Kilograms (kg)': 'Quilogramas (kg)',
      'Grams (g)': 'Gramas (g)',
      'Pounds (lb)': 'Libras (lb)',
      'Ounces (oz)': 'Onças (oz)',
      'Celsius (°C)': 'Celsius (°C)',
      'Fahrenheit (°F)': 'Fahrenheit (°F)',
      'Kelvin (K)': 'Kelvin (K)',
      'Megabytes (MB)': 'Megabytes (MB)',
      'Gigabytes (GB)': 'Gigabytes (GB)',
      'Terabytes (TB)': 'Terabytes (TB)'
    },

    EN: {},

    ES: {
      'Kilometres (km)': 'Kilómetros (km)',
      'Metres (m)': 'Metros (m)',
      'Centimetres (cm)': 'Centímetros (cm)',
      'Millimetres (mm)': 'Milímetros (mm)',
      'Inches (in)': 'Pulgadas (in)',
      'Feet (ft)': 'Pies (ft)',
      'Yards (yd)': 'Yardas (yd)',
      'Miles (mi)': 'Millas (mi)',
      'Kilograms (kg)': 'Kilogramos (kg)',
      'Grams (g)': 'Gramos (g)',
      'Pounds (lb)': 'Libras (lb)',
      'Ounces (oz)': 'Onzas (oz)',
      'Celsius (°C)': 'Celsius (°C)',
      'Fahrenheit (°F)': 'Fahrenheit (°F)',
      'Kelvin (K)': 'Kelvin (K)',
      'Megabytes (MB)': 'Megabytes (MB)',
      'Gigabytes (GB)': 'Gigabytes (GB)',
      'Terabytes (TB)': 'Terabytes (TB)'
    },

    FR: {
      'Kilometres (km)': 'Kilomètres (km)',
      'Metres (m)': 'Mètres (m)',
      'Centimetres (cm)': 'Centimètres (cm)',
      'Millimetres (mm)': 'Millimètres (mm)',
      'Inches (in)': 'Pouces (in)',
      'Feet (ft)': 'Pieds (ft)',
      'Yards (yd)': 'Yards (yd)',
      'Miles (mi)': 'Miles (mi)',
      'Kilograms (kg)': 'Kilogrammes (kg)',
      'Grams (g)': 'Grammes (g)',
      'Pounds (lb)': 'Livres (lb)',
      'Ounces (oz)': 'Onces (oz)',
      'Celsius (°C)': 'Celsius (°C)',
      'Fahrenheit (°F)': 'Fahrenheit (°F)',
      'Kelvin (K)': 'Kelvin (K)',
      'Megabytes (MB)': 'Mégaoctets (MB)',
      'Gigabytes (GB)': 'Gigaoctets (GB)',
      'Terabytes (TB)': 'Téraoctets (TB)'
    },

    DN: {
      'Kilometres (km)': 'Kilometer (km)',
      'Metres (m)': 'Meter (m)',
      'Centimetres (cm)': 'Centimeter (cm)',
      'Millimetres (mm)': 'Millimeter (mm)',
      'Inches (in)': 'Tommer (in)',
      'Feet (ft)': 'Fod (ft)',
      'Yards (yd)': 'Yards (yd)',
      'Miles (mi)': 'Mil (mi)',
      'Kilograms (kg)': 'Kilogram (kg)',
      'Grams (g)': 'Gram (g)',
      'Pounds (lb)': 'Pund (lb)',
      'Ounces (oz)': 'Uns (oz)',
      'Celsius (°C)': 'Celsius (°C)',
      'Fahrenheit (°F)': 'Fahrenheit (°F)',
      'Kelvin (K)': 'Kelvin (K)',
      'Megabytes (MB)': 'Megabyte (MB)',
      'Gigabytes (GB)': 'Gigabyte (GB)',
      'Terabytes (TB)': 'Terabyte (TB)'
    },

    RS: {
      'Kilometres (km)': 'Километри (km)',
      'Metres (m)': 'Метри (m)',
      'Centimetres (cm)': 'Сантиметри (cm)',
      'Millimetres (mm)': 'Милиметри (mm)',
      'Inches (in)': 'Инчи (in)',
      'Feet (ft)': 'Стопе (ft)',
      'Yards (yd)': 'Јарди (yd)',
      'Miles (mi)': 'Миље (mi)',
      'Kilograms (kg)': 'Килограми (kg)',
      'Grams (g)': 'Грами (g)',
      'Pounds (lb)': 'Фунте (lb)',
      'Ounces (oz)': 'Унце (oz)',
      'Celsius (°C)': 'Целзијус (°C)',
      'Fahrenheit (°F)': 'Фаренхајт (°F)',
      'Kelvin (K)': 'Келвин (K)',
      'Megabytes (MB)': 'Мегабајти (MB)',
      'Gigabytes (GB)': 'Гигабајти (GB)',
      'Terabytes (TB)': 'Терабајти (TB)'
    }
  };

  const getUnitLabel = unit =>
    unitTranslations[lang]?.[unit] || unit;

  // TIME ZONES

const [citySearch, setCitySearch] = useState('');
const [clockNow, setClockNow] = useState(Date.now());

const popularCities = [
  {
    city: 'Lisbon',
    country: 'Portugal',
    timezone: 'Europe/Lisbon',
    flag: '🇵🇹',
    names: { EN: 'Lisbon', PT: 'Lisboa', ES: 'Lisboa', FR: 'Lisbonne', DN: 'Lissabon', RS: 'Лиссабон' }
  },
  {
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    flag: '🇬🇧',
    names: { EN: 'London', PT: 'Londres', ES: 'Londres', FR: 'Londres', DN: 'London', RS: 'Лондон' }
  },
  {
    city: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    flag: '🇺🇸',
    names: { EN: 'New York', PT: 'Nova Iorque', ES: 'Nueva York', FR: 'New York', DN: 'New York', RS: 'Нью-Йорк' }
  },
  {
    city: 'Los Angeles',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    flag: '🇺🇸',
    names: { EN: 'Los Angeles', PT: 'Los Angeles', ES: 'Los Ángeles', FR: 'Los Angeles', DN: 'Los Angeles', RS: 'Лос-Анджелес' }
  },
  {
    city: 'São Paulo',
    country: 'Brazil',
    timezone: 'America/Sao_Paulo',
    flag: '🇧🇷',
    names: { EN: 'São Paulo', PT: 'São Paulo', ES: 'São Paulo', FR: 'São Paulo', DN: 'São Paulo', RS: 'Сан-Паулу' }
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    flag: '🇦🇪',
    names: { EN: 'Dubai', PT: 'Dubai', ES: 'Dubái', FR: 'Dubaï', DN: 'Dubai', RS: 'Дубай' }
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    flag: '🇯🇵',
    names: { EN: 'Tokyo', PT: 'Tóquio', ES: 'Tokio', FR: 'Tokyo', DN: 'Tokyo', RS: 'Токио' }
  },
  {
    city: 'Shanghai',
    country: 'China',
    timezone: 'Asia/Shanghai',
    flag: '🇨🇳',
    names: { EN: 'Shanghai', PT: 'Xangai', ES: 'Shanghái', FR: 'Shanghai', DN: 'Shanghai', RS: 'Шанхай' }
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    flag: '🇸🇬',
    names: { EN: 'Singapore', PT: 'Singapura', ES: 'Singapur', FR: 'Singapour', DN: 'Singapore', RS: 'Сингапур' }
  },
  {
    city: 'Sydney',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    flag: '🇦🇺',
    names: { EN: 'Sydney', PT: 'Sydney', ES: 'Sídney', FR: 'Sydney', DN: 'Sydney', RS: 'Сидней' }
  }
];

const getLocalizedCityName = zone => {
  const city = popularCities.find(item => item.timezone === zone);

  if (city) {
    return city.names[lang] || city.city;
  }

  return zone.split('/').pop().replace(/_/g, ' ');
};

const citySearchResults = useMemo(() => {
  const query = citySearch.trim().toLowerCase();

  if (query.length < 2) return [];

  return cityTimezones.cityMapping
    .filter(city => {
      const searchable = [
        city.city,
        city.city_ascii,
        city.country,
        city.province
      ].filter(Boolean).join(' ').toLowerCase();

      return searchable.includes(query);
    })
    .sort((a, b) => (b.pop || 0) - (a.pop || 0))
    .slice(0, 10);
}, [citySearch]);

useEffect(() => {
  const interval = setInterval(() => {
    setClockNow(Date.now());
  }, 1000);

  return () => clearInterval(interval);
}, []);

const getCityTime = zone => {
  try {
    return new Intl.DateTimeFormat(
      lang === 'PT' ? 'pt-PT' :
      lang === 'ES' ? 'es-ES' :
      lang === 'FR' ? 'fr-FR' :
      lang === 'DN' ? 'da-DK' :
      lang === 'RS' ? 'sr-RS' :
      'en-GB',
      {
        timeZone: zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
    ).format(new Date(clockNow));
  } catch {
    return '--:--:--';
  }
};

const selectCity = zone => {
  setTimezone(zone);
  setError('');
};

  // UNIT FACTORS
  const unitFactors = {
    Length: {
      'Kilometres (km)': 1000,
      'Metres (m)': 1,
      'Centimetres (cm)': 0.01,
      'Millimetres (mm)': 0.001,
      'Inches (in)': 0.0254,
      'Feet (ft)': 0.3048,
      'Yards (yd)': 0.9144,
      'Miles (mi)': 1609.344
    },

    Weight: {
      'Kilograms (kg)': 1000,
      'Grams (g)': 1,
      'Pounds (lb)': 453.59237,
      'Ounces (oz)': 28.349523125
    },

    'Data size': {
      'Megabytes (MB)': 1,
      'Gigabytes (GB)': 1024,
      'Terabytes (TB)': 1024 * 1024
    }
  };

  // COLORS
  const isDark = darkMode;

  const colors = {
    panel: isDark ? 'bg-[#171717]' : 'bg-white',
    text: isDark ? 'text-white' : 'text-neutral-900',
    border: isDark ? 'border-[#303030]' : 'border-neutral-200',
    muted: isDark ? 'text-neutral-400' : 'text-neutral-500',

    button: isDark
      ? 'bg-[#1c1c1c] border-[#303030] text-neutral-400 hover:text-white'
      : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black',

    active: isDark
      ? 'bg-[#261a0c] border-amber-500/60 text-amber-500'
      : 'bg-amber-50 border-amber-500 text-amber-600',

    divider: isDark ? 'border-[#303030]' : 'border-neutral-200',

    area: isDark
      ? 'bg-transparent text-white placeholder-neutral-600'
      : 'bg-transparent text-neutral-900 placeholder-neutral-400'
  };

  const buttonBase =
    'flex items-center justify-center gap-2 border rounded-lg transition-all duration-200';

  const inputChars = inputText.length;
  const inputWords = inputText.trim()
    ? inputText.trim().split(/\s+/).length
    : 0;

  const outputChars = outputText.length;
  const outputLines = outputText
    ? outputText.split('\n').length
    : 0;

  const unitOptions = unitsDatabase[activeTool] || [];

  const effectiveFrom = unitOptions.includes(fromUnit)
    ? fromUnit
    : unitOptions[0];

  const effectiveTo =
    unitOptions.includes(toUnit) && toUnit !== effectiveFrom
      ? toUnit
      : unitOptions[1];

  // TEXT CONVERSIONS
  const convertText = value => {
    try {
      switch (activeTool) {
        case 'UPPERCASE':
          return value.toLocaleUpperCase(lang);

        case 'lowercase':
          return value.toLocaleLowerCase(lang);

        case 'Title Case':
          return value.toLowerCase().replace(
            /\b[\p{L}][\p{L}\p{M}'’]*/gu,
            word => word.charAt(0).toUpperCase() + word.slice(1)
          );

        case 'Sentence case':
          return value.toLowerCase().replace(
            /(^\s*[\p{L}]|[.!?]\s+[\p{L}])/gu,
            char => char.toUpperCase()
          );

        case 'camelCase':
          return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]+/g, ' ')
            .trim()
            .split(/\s+/)
            .map((word, index) =>
              index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');

        case 'snake_case':
          return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/^_|_$/g, '')
            .toLowerCase();

        case 'kebab-case':
          return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .toLowerCase();

        case 'url-slug':
          return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        case 'esreveR':
          return Array.from(value).reverse().join('');

        case 'Unique lines':
          return [...new Set(value.split(/\r?\n/))].join('\n');

        case 'Word count': {
          const words = value.trim()
            ? value.trim().split(/\s+/).length
            : 0;

          const lines = value
            ? value.split(/\r?\n/).length
            : 0;

          return `Characters: ${value.length}\nWords: ${words}\nLines: ${lines}`;
        }

        case 'JSON Pretty':
          return JSON.stringify(JSON.parse(value), null, 2);

        case 'JSON Minify':
          return JSON.stringify(JSON.parse(value));

        case 'Base64 →':
          return btoa(
            Array.from(new TextEncoder().encode(value))
              .map(byte => String.fromCharCode(byte))
              .join('')
          );

        case '← Base64': {
          const binary = atob(value.trim());
          const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));

          return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
        }

        default:
          return value;
      }
    } catch {
      throw new Error(
        activeTool.includes('JSON')
          ? 'Invalid JSON. Please check your syntax.'
          : activeTool === '← Base64'
            ? 'Invalid Base64 or unsupported encoded text.'
            : 'Unable to convert this input.'
      );
    }
  };

  // UNIT CONVERSION
  const convertUnits = () => {
    const value = Number(unitValue.replace(',', '.'));

    if (unitValue.trim() === '' || !Number.isFinite(value)) {
      throw new Error('Please enter a valid number.');
    }

    if (activeTool === 'Temperature') {
      let celsius = value;

      if (effectiveFrom === 'Fahrenheit (°F)') {
        celsius = (value - 32) * 5 / 9;
      } else if (effectiveFrom === 'Kelvin (K)') {
        celsius = value - 273.15;
      }

      if (celsius < -273.15) {
        throw new Error('Temperature cannot be below absolute zero.');
      }

      let result = celsius;

      if (effectiveTo === 'Fahrenheit (°F)') {
        result = celsius * 9 / 5 + 32;
      } else if (effectiveTo === 'Kelvin (K)') {
        result = celsius + 273.15;
      }

      return Number(result.toPrecision(12)).toString();
    }

    const factors = unitFactors[activeTool];

    if (!factors) {
      throw new Error('Unsupported conversion.');
    }

    const result =
      value * factors[effectiveFrom] / factors[effectiveTo];

    return Number(result.toPrecision(12)).toString();
  };

  // AUTOMATIC CONVERSION
  useEffect(() => {
    let cancelled = false;

    const runConversion = async () => {
      setError('');
      setOutputImage('');

      if (activeCategory === 'Units') {
        if (activeTool === 'Time zone') {
  try {
    const result = new Intl.DateTimeFormat(
      lang === 'PT' ? 'pt-PT' :
      lang === 'ES' ? 'es-ES' :
      lang === 'FR' ? 'fr-FR' :
      lang === 'DN' ? 'da-DK' :
      lang === 'RS' ? 'sr-RS' :
      'en-GB',
      {
        timeZone: timezone,
        dateStyle: 'full',
        timeStyle: 'long'
      }
    ).format(new Date(clockNow));

    if (!cancelled) setOutputText(result);

  } catch {
    if (!cancelled) setError('Invalid time zone.');
  }

  return;
}

        try {
          const result = convertUnits();

          if (!cancelled) setOutputText(result);
        } catch (err) {
          if (!cancelled) {
            setOutputText('');
            setError(err.message);
          }
        }

        return;
      }

      if (activeCategory === 'Image & QR') {
        if (activeTool === 'QR code' && inputText.trim()) {
          try {
            const result = await QRCode.toDataURL(inputText, {
              width: 500,
              margin: 2,
              errorCorrectionLevel: 'H',
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              }
            });

            if (!cancelled) {
              setOutputImage(result);
              setOutputFilename('convertly-qr-code');
              setOutputText('QR code generated successfully.');
            }
          } catch {
            if (!cancelled) setError('Unable to generate QR code.');
          }
        } else if (!cancelled) {
          setOutputText('');
        }

        return;
      }

      if (!inputText) {
        if (!cancelled) setOutputText('');
        return;
      }

      try {
        const result = convertText(inputText);

        if (!cancelled) setOutputText(result);
      } catch (err) {
        if (!cancelled) {
          setOutputText('');
          setError(err.message);
        }
      }
    };

    runConversion();

    return () => {
      cancelled = true;
    };
  }, [
    inputText,
    activeTool,
    activeCategory,
    unitValue,
    fromUnit,
    toUnit,
    timezone,
    lang,
    clockNow
  ]);

  // IMAGE PROCESSING
  const processImage = async file => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('Maximum image size is 25 MB.');
      return;
    }

    setError('');
    setOutputText('Processing image...');

    try {
      const bitmap = await createImageBitmap(file);
      const maxDimension = 2500;

      const scale = Math.min(
        1,
        maxDimension / Math.max(bitmap.width, bitmap.height)
      );

      const canvas = document.createElement('canvas');

      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);

      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Unable to process image.');
      }

      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          result => result
            ? resolve(result)
            : reject(new Error('Image conversion failed.')),
          'image/jpeg',
          activeTool === 'Compress image' ? 0.72 : 0.92
        );
      });

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Unable to read image.'));

        reader.readAsDataURL(blob);
      });

      setOutputImage(dataUrl);

      setOutputFilename(
        activeTool === 'PNG to JPG'
          ? 'converted-image.jpg'
          : 'compressed-image.jpg'
      );

      const originalKB = (file.size / 1024).toFixed(1);
      const convertedKB = (blob.size / 1024).toFixed(1);
      const saved = ((1 - blob.size / file.size) * 100).toFixed(1);

      setOutputText(
        `Original: ${originalKB} KB\nConverted: ${convertedKB} KB\n${
          blob.size <= file.size
            ? `Size reduction: ${saved}%`
            : 'Image converted successfully.'
        }`
      );
    } catch (err) {
      setError(err.message || 'Unable to process image.');
      setOutputText('');
    }
  };

  // FILE UPLOAD
  const handleFile = async event => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (activeCategory === 'Image & QR') {
      await processImage(file);
    } else {
      if (file.size > 10 * 1024 * 1024) {
        setError('Maximum text file size is 10 MB.');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = e => {
        setError('');
        setInputText(String(e.target.result || ''));
      };

      reader.onerror = () => setError('Unable to read file.');

      reader.readAsText(file);
    }

    event.target.value = '';
  };

  // ACTIONS
  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setOutputImage('');
    setError('');
    setUnitValue('1');
  };

  const handleSample = () => {
    if (activeCategory === 'Units') {
      setUnitValue('100');
    } else if (activeCategory === 'Image & QR') {
      setActiveTool('QR code');
      setInputText('https://convertly.app');
    } else if (activeTool.includes('JSON')) {
      setInputText('{\n  "name": "Convertly",\n  "version": 1,\n  "active": true\n}');
    } else if (activeTool === '← Base64') {
      setInputText('SGVsbG8gV29ybGQh');
    } else {
      setInputText('Hello world from Convertly 2026!');
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError('Unable to copy. Check browser permissions.');
    }
  };

  const handleDownload = () => {
    if (outputImage) {
      const link = document.createElement('a');

      link.href = outputImage;
      link.download = outputFilename;
      link.click();

      return;
    }

    if (!outputText) return;

    const blob = new Blob([outputText], {
      type: 'text/plain;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'convertly-result.txt';
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategory = (category, config) => {
  setActiveCategory(category);
  setActiveTool(config.tools[0].name);
  setError('');
  setOutputImage('');
};

 const handleTool = tool => {
  setActiveTool(tool);
  setError('');
  setOutputImage('');
};

  // SAMPLE BUTTON
  const sampleButton = (
    <button
      onClick={handleSample}
      className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition ${colors.muted} hover:text-amber-500`}
    >
      <Sparkles className="w-4 h-4 text-amber-500" />
      {t.trySample}
    </button>
  );

  // FILE UPLOAD BUTTON
  const fileUpload = (
    <>
      <input
        ref={fileRef}
        type="file"
        accept={
          activeCategory === 'Image & QR'
            ? 'image/*'
            : '.txt,.json,.csv,.xml,.html,.css,.js'
        }
        className="hidden"
        onChange={handleFile}
      />

      <button
        onClick={() => fileRef.current?.click()}
        className={`${buttonBase} px-3 py-2 text-xs ${colors.button}`}
      >
        <Upload className="w-3.5 h-3.5" />
        {t.uploadFile}
      </button>
    </>
  );

  const inputWordsLabel = `${inputChars} chars · ${inputWords} words`;
  const outputLabel = `${outputChars} chars · ${outputLines} lines`;

  // RENDER
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      <div className={`w-full min-h-[650px] flex flex-col overflow-hidden rounded-[20px] border ${colors.border} ${colors.panel} ${colors.text}`}>

        {/* HEADER */}
        <div className="px-4 sm:px-5 pt-5 pb-5 shrink-0">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-[9px] h-[9px] rounded-full bg-amber-500 shrink-0" />
              <h2 className="text-sm font-semibold tracking-tight truncate">
                {t.boxTitle}
              </h2>
            </div>

            {sampleButton}
          </div>

          {/* STEP 1 */}
          <div className="mb-5">
            <label className={`block text-xs mb-2.5 ${colors.muted}`}>
              1. {t.step1.replace(/^1\.\s*/, '')}
            </label>

            <div className="flex flex-wrap gap-2">
              {Object.entries(toolsConfig).map(([category, config]) => {
                const Icon = config.icon;
                const selected = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => handleCategory(category, config)}
                    className={`${buttonBase} px-3 py-2 text-xs font-medium ${selected ? colors.active : colors.button}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {getCategoryLabel(category)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="mb-5">
            <label className={`block text-xs mb-2.5 ${colors.muted}`}>
              2. {t.step2.replace(/^2\.\s*/, '')}
            </label>

            <div className="flex flex-wrap gap-1.5">
              {currentCategoryData.tools.map(tool => (
                <button
                  key={tool.name}
                  onClick={() => handleTool(tool.name)}
                  className={`${buttonBase} px-3 py-2 text-xs font-mono ${activeTool === tool.name ? colors.active : colors.button}`}
                >
                  {getToolLabel(tool.name)}
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-xs ${isDark ? 'bg-[#1b1b1b] border-[#303030] text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{activeToolObj.desc}</span>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className={`flex-1 min-h-[450px] border-t ${colors.border} flex flex-col`}>

          {/* UNIT CONVERTER */}
          {activeCategory === 'Units' && activeTool !== 'Time zone' && (
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2">

              {/* INPUT */}
              <div className={`min-w-0 flex flex-col border-b md:border-b-0 md:border-r ${colors.divider}`}>
                <div className={`flex items-center justify-between px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
                  <span>{t.inputLabel || 'INPUT'}</span>
                  <span>{unitValue} {getUnitLabel(effectiveFrom)}</span>
                </div>

                <div className="flex-1 min-h-[220px] md:min-h-[350px] p-4 flex flex-col gap-5">
                  <div>
                    <label className={`block text-[11px] uppercase tracking-wider mb-2 ${colors.muted}`}>
                      {t.fromLabel}
                    </label>

                    <select
                      value={effectiveFrom}
                      onChange={e => setFromUnit(e.target.value)}
                      className={`w-full px-3 py-3 rounded-lg border text-xs outline-none ${colors.panel} ${colors.border} ${colors.text}`}
                    >
                      {unitOptions.map(unit => (
                        <option key={unit} value={unit}>
                          {getUnitLabel(unit)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[11px] uppercase tracking-wider mb-2 ${colors.muted}`}>
                      {t.enterValue}
                    </label>

                    <input
                      type="text"
                      value={unitValue}
                      onChange={e => setUnitValue(e.target.value)}
                      className={`w-full px-3 py-3 rounded-lg border text-sm font-mono outline-none ${colors.panel} ${colors.border} ${colors.text}`}
                    />
                  </div>
                </div>

                <div className={`min-h-14 flex flex-wrap items-center gap-2 px-3 py-2 border-t ${colors.border}`}>
                  <button
                    onClick={handleClear}
                    className={`${buttonBase} px-3 py-2 text-xs ${colors.button}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t.clear}
                  </button>
                </div>
              </div>

              {/* OUTPUT */}
              <div className="min-w-0 flex flex-col">
                <div className={`flex items-center justify-between px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
                  <span>{t.outputLabel || 'OUTPUT'}</span>
                  <span>{getUnitLabel(effectiveTo)}</span>
                </div>

                <div className="flex-1 min-h-[220px] md:min-h-[350px] p-4 flex flex-col gap-5">
                  <div>
                    <label className={`block text-[11px] uppercase tracking-wider mb-2 ${colors.muted}`}>
                      {t.toLabel}
                    </label>

                    <select
                      value={effectiveTo}
                      onChange={e => setToUnit(e.target.value)}
                      className={`w-full px-3 py-3 rounded-lg border text-xs outline-none ${colors.panel} ${colors.border} ${colors.text}`}
                    >
                      {unitOptions.map(unit => (
                        <option key={unit} value={unit}>
                          {getUnitLabel(unit)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <label className={`block text-[11px] uppercase tracking-wider mb-2 ${colors.muted}`}>
                        {t.outputLabel}
                      </label>

                      <div className="text-2xl sm:text-4xl font-bold font-mono text-amber-500 break-all">
                        {error ? '—' : outputText || '—'}
                      </div>
                    </div>

                    <button
                      onClick={handleSwap}
                      className={`${buttonBase} p-2 shrink-0 ${colors.button}`}
                      title="Swap units"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                    </button>
                  </div>
                </div>

                <div className={`min-h-14 flex flex-wrap items-center justify-end gap-2 px-3 py-2 border-t ${colors.border}`}>
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className={`${buttonBase} px-3.5 py-2 bg-amber-600 hover:bg-amber-500 border-amber-600 text-black text-xs font-semibold disabled:opacity-40`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : t.copyResult}
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={!outputText}
                    className={`${buttonBase} px-3 py-2 text-xs ${colors.button} disabled:opacity-40`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.download}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TIME ZONE */}
          {activeCategory === 'Units' && activeTool === 'Time zone' && (
  <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2">

    {/* CITY SEARCH */}
    <div className={`min-w-0 flex flex-col border-b md:border-b-0 md:border-r ${colors.divider}`}>

      <div className={`px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
        {tz.title}
      </div>

      <div className="p-4 flex-1">

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

          <input
            type="text"
            value={citySearch}
            onChange={e => setCitySearch(e.target.value)}
            placeholder={tz.search}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none ${colors.panel} ${colors.border} ${colors.text}`}
          />
        </div>

        {citySearch.trim().length >= 2 ? (
          <div className="space-y-1">

            <p className={`text-[10px] uppercase tracking-wider mb-3 ${colors.muted}`}>
              {tz.searchResults}
            </p>

            {citySearchResults.length > 0 ? (
              citySearchResults.map((city, index) => (
                <button
                  key={city.city + city.country + city.timezone + index}
                  onClick={() => {
                    selectCity(city.timezone);
                    setCitySearch('');
                  }}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-left transition hover:bg-amber-500/10 ${timezone === city.timezone ? 'bg-amber-500/10 border border-amber-500/30' : 'border border-transparent'}`}
                >
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${colors.text}`}>
                      {city.names[lang] || city.city}
                    </p>
                    <p className={`text-xs ${colors.muted}`}>
                      {city.country}{city.province ? `, ${city.province}` : ''}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-mono text-amber-500">
                      {getCityTime(city.timezone)}
                    </p>
                    <p className={`text-[10px] ${colors.muted}`}>
                      {city.timezone}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className={`text-sm text-center py-8 ${colors.muted}`}>
                {tz.noResults}
              </p>
            )}

          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-[10px] uppercase tracking-wider ${colors.muted}`}>
                {tz.popular}
              </p>
              <span className={`text-[10px] ${colors.muted}`}>
                {tz.locations}
              </span>
            </div>

            <div className="space-y-1">
              {popularCities.map(city => (
                <button
                  key={city.timezone}
                  onClick={() => selectCity(city.timezone)}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg text-left transition hover:bg-amber-500/10 ${timezone === city.timezone ? 'bg-amber-500/10 border border-amber-500/30' : 'border border-transparent'}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl">{city.flag}</span>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${colors.text}`}>
                        {city.city}
                      </p>
                      <p className={`text-xs ${colors.muted}`}>
                        {city.country}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-mono text-amber-500 shrink-0">
                    {getCityTime(city.timezone)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className={`min-h-14 flex items-center px-3 py-2 border-t ${colors.border}`}>
        <button
          onClick={() => {
            setCitySearch('');
            selectCity('Europe/Lisbon');
          }}
          className={`${buttonBase} px-3 py-2 text-xs ${colors.button}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {tz.reset}
        </button>
      </div>

    </div>

    {/* SELECTED CITY */}
    <div className="min-w-0 flex flex-col">

      <div className={`px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
        {tz.selected}
      </div>

      <div className="flex-1 min-h-[280px] p-5 flex flex-col items-center justify-center text-center">

        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5">
          <span className="text-3xl">🌍</span>
        </div>

        <p className={`text-xs uppercase tracking-widest mb-3 ${colors.muted}`}>
          {tz.localTime}
        </p>

        <div className="text-4xl sm:text-5xl font-bold font-mono text-amber-500 tabular-nums mb-4">
          {getCityTime(timezone)}
        </div>

        <p className={`text-sm font-medium ${colors.text} mb-2`}>
          {getLocalizedCityName(timezone)}
        </p>

        <p className={`text-xs ${colors.muted}`}>
          {timezone}
        </p>

        <div className={`mt-6 px-4 py-3 rounded-lg border ${colors.border} ${colors.panel}`}>
          <p className={`text-xs ${colors.muted}`}>
            {new Intl.DateTimeFormat(
              locale,
              {
                timeZone: timezone,
                dateStyle: 'full'
              }
            ).format(new Date(clockNow))}
          </p>
        </div>

      </div>

      <div className={`min-h-14 flex items-center justify-end px-3 py-2 border-t ${colors.border}`}>
        <button
          onClick={handleCopy}
          disabled={!outputText}
          className={`${buttonBase} px-3.5 py-2 bg-amber-600 hover:bg-amber-500 border-amber-600 text-black text-xs font-semibold disabled:opacity-40`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? t.copied : t.copyResult}
        </button>
      </div>

    </div>

  </div>
)}

          {/* IMAGE AND QR */}
          {activeCategory === 'Image & QR' && (
            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              {activeTool === 'QR code' ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                  <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Enter a URL or text to generate a QR code..."
                    className={`w-full min-h-28 p-4 rounded-lg border resize-y outline-none text-sm ${colors.panel} ${colors.border} ${colors.text}`}
                  />

                  {outputImage && (
                    <div className="p-3 bg-white rounded-xl">
                      <img
                        src={outputImage}
                        alt="Generated QR code"
                        className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                      />
                    </div>
                  )}

                  {!outputImage && (
                    <div className={`text-xs ${colors.muted}`}>
                      Your QR code will appear here.
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                  <div className={`w-full max-w-xl border-2 border-dashed ${colors.border} rounded-xl p-8 sm:p-12 flex flex-col items-center text-center gap-3`}>
                    <Upload className="w-9 h-9 text-amber-500" />
                    <p className="text-sm font-medium">
                      Upload an image to get started
                    </p>
                    <p className={`text-xs ${colors.muted}`}>
                      Supports JPG, PNG, WEBP and other browser-supported formats. Maximum 25 MB.
                    </p>
                    {fileUpload}
                  </div>

                  {outputImage && (
                    <img
                      src={outputImage}
                      alt="Processed image"
                      className="max-w-full max-h-64 object-contain rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* TEXT AND CODE */}
          {(activeCategory === 'Case & text' ||
            activeCategory === 'Code' ||
            activeCategory === 'Encode / decode') && (
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2">

              {/* INPUT */}
              <div className={`min-w-0 flex flex-col border-b md:border-b-0 md:border-r ${colors.divider}`}>
                <div className={`flex items-center justify-between px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
                  <span>{t.inputLabel}</span>
                  <span>{inputWordsLabel}</span>
                </div>

                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder={t.placeholderInput}
                  spellCheck={false}
                  className={`flex-1 w-full min-h-[220px] md:min-h-[350px] p-4 resize-y md:resize-none outline-none text-xs leading-relaxed font-mono ${colors.area}`}
                />

                <div className={`min-h-14 flex flex-wrap items-center gap-2 px-3 py-2 border-t ${colors.border}`}>
                  {fileUpload}

                  <button
                    onClick={handleClear}
                    className={`${buttonBase} px-3 py-2 text-xs ${colors.button}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t.clear}
                  </button>
                </div>
              </div>

              {/* OUTPUT */}
              <div className="min-w-0 flex flex-col">
                <div className={`flex items-center justify-between px-4 py-3 border-b ${colors.border} text-[11px] font-mono ${colors.muted}`}>
                  <span>{t.outputLabel}</span>
                  <span>{outputLabel}</span>
                </div>

                <div className="flex-1 min-h-[220px] md:min-h-[350px] p-4 overflow-auto">
                  {error ? (
                    <div className="flex items-center gap-2 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  ) : outputText ? (
                    <pre className={`text-xs font-mono leading-relaxed whitespace-pre-wrap break-words ${colors.text}`}>
                      {outputText}
                    </pre>
                  ) : (
                    <div className="w-full h-full min-h-[180px] flex items-center justify-center">
                      <div className={`flex flex-col items-center gap-3 text-center max-w-[240px] ${colors.muted}`}>
                        <div className={`w-10 h-10 rounded-full border ${colors.border} flex items-center justify-center`}>
                          <ArrowRightLeft className="w-4 h-4" />
                        </div>

                        <span className="text-xs leading-relaxed">
                          {t.placeholderOutput}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`min-h-14 flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t ${colors.border}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopy}
                      disabled={!outputText}
                      className={`${buttonBase} px-3.5 py-2 bg-amber-600 hover:bg-amber-500 border-amber-600 text-black text-xs font-semibold disabled:opacity-40`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : t.copyResult}
                    </button>

                    <button
                      onClick={handleDownload}
                      disabled={!outputText}
                      className={`${buttonBase} px-3 py-2 text-xs ${colors.button} disabled:opacity-40`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      {t.download}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setInputText(outputText);
                      setError('');
                    }}
                    disabled={!outputText}
                    className={`${buttonBase} p-2 ${colors.button} disabled:opacity-40`}
                    title="Move output to input"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* IMAGE FOOTER */}
          {activeCategory === 'Image & QR' && (
            <div className={`min-h-14 flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t ${colors.border}`}>
              <div className="flex flex-wrap items-center gap-2">
                {activeTool !== 'QR code' && fileUpload}

                <button
                  onClick={handleClear}
                  className={`${buttonBase} px-3 py-2 text-xs ${colors.button}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t.clear}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className={`${buttonBase} px-3.5 py-2 bg-amber-600 hover:bg-amber-500 border-amber-600 text-black text-xs font-semibold disabled:opacity-40`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  {t.copyResult}
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!outputText && !outputImage}
                  className={`${buttonBase} px-3 py-2 text-xs ${colors.button} disabled:opacity-40`}
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.download}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}