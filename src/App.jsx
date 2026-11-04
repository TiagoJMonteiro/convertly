import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolWorkspace from './components/ToolWorkspace';
import BrowseTools from './components/BrowseTools';
import InfoAndFaq from './components/InfoAndFaq';
import Footer from './components/Footer';

import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import Contact from './components/Contact';


function Home({ lang, setLang, darkMode, setDarkMode }) {

  const [activeCategory, setActiveCategory] = useState('Units');
  const [activeTool, setActiveTool] = useState('Length');

  const workspaceRef = useRef(null);

  const handleSelectTool = (category, tool) => {
    setActiveCategory(category);
    setActiveTool(tool);

     setTimeout(() => {
    workspaceRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);

    workspaceRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* SECÇÃO SUPERIOR COM GRID E FADE */}
      <div
        className={`relative ${
          darkMode ? 'bg-grid-pattern' : 'bg-grid-pattern-light'
        } overflow-hidden pb-24`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent ${
            darkMode
              ? 'via-[#121212]/50 to-[#121212]'
              : 'via-neutral-50/50 to-neutral-50'
          } pointer-events-none`}
        ></div>

        <Navbar
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onSelectTool={handleSelectTool}
        />

        <Hero
          lang={lang}
          darkMode={darkMode}
        />
      </div>

      {/* WORKSPACE E CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col w-full -mt-6">

        <div ref={workspaceRef}>
          <ToolWorkspace
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            lang={lang}
            darkMode={darkMode}
          />
        </div>

        <BrowseTools
          onSelectTool={handleSelectTool}
          lang={lang}
          darkMode={darkMode}
        />

        <InfoAndFaq
          lang={lang}
          darkMode={darkMode}
        />

      </div>
    </>
  );
}


export default function App() {

  const [lang, setLang] = useState('EN');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>

      <div
        className={`min-h-screen ${
          darkMode
            ? 'bg-[#121212] text-white'
            : 'bg-neutral-50 text-neutral-900'
        } flex flex-col transition-colors`}
      >

        {/* PÁGINAS */}
        <div className="flex-1">

          <Routes>

            {/* HOMEPAGE */}
            <Route
              path="/"
              element={
                <Home
                  lang={lang}
                  setLang={setLang}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />

            {/* LEGAL PAGES */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/terms"
              element={<TermsOfService />}
            />

            <Route
              path="/cookie-policy"
              element={<CookiePolicy />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Routes>

        </div>

        {/* FOOTER GLOBAL */}
        <Footer darkMode={darkMode} />

      </div>

    </BrowserRouter>
  );
}