import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
];

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar = ({ cartCount, onCartOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) setMobileLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const links = [
    { key: 'manifesto',  label: t('manifesto_eyebrow') },
    { key: 'historia',   label: `${t('historia_title_line1')} ${t('historia_title_line2')}` },
    { key: 'mision',     label: t('mision_title') },
    { key: 'vision',     label: t('vision_title') },
    { key: 'farmers',    label: t('farmers_title') },
    { key: 'process',    label: t('process_eyebrow') },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-sm border-b border-gold/10' : 'bg-transparent'
        }`}
        style={{ background: scrolled ? 'rgba(60,10,20,0.97)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-end gap-6">

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-3">
            {links.map((l) => (
              <li key={l.key}>
                <button
                  onClick={() => scrollTo(l.key)}
                  className="text-cream/80 hover:text-gold transition-colors uppercase font-bold cursor-pointer text-center leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.06em", maxWidth: "88px", whiteSpace: "normal" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Banderas desktop con astas cruzadas */}
          <div className="hidden md:flex items-center" style={{ width: 88, height: 48, position: 'relative' }}>
            <style>{`
              @keyframes wave-pe { 0%,100%{transform:rotate(-8deg) scale(1.03)} 50%{transform:rotate(-4deg) scale(0.97)} }
              @keyframes wave-cz { 0%,100%{transform:rotate(8deg) scale(1.03)} 50%{transform:rotate(4deg) scale(0.97)} }
              @keyframes pole-sway { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(1deg)} }
              .pole-pe { animation: pole-sway 2.4s ease-in-out infinite; transform-origin: center bottom; }
              .pole-cz { animation: pole-sway 2.4s ease-in-out infinite reverse; transform-origin: center bottom; }
              .flag-pe { animation: wave-pe 2s ease-in-out infinite; transform-origin: left center; }
              .flag-cz { animation: wave-cz 2s ease-in-out infinite; transform-origin: right center; }
            `}</style>
            <svg width="88" height="48" viewBox="0 0 88 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow:'visible'}}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A843"/>
                  <stop offset="100%" stopColor="#8B6914"/>
                </linearGradient>
              </defs>
              <g className="pole-pe">
                <line x1="20" y1="48" x2="68" y2="4" stroke="url(#goldGrad)" strokeWidth="3.2" strokeLinecap="round"/>
              </g>
              <g className="pole-cz">
                <line x1="68" y1="48" x2="20" y2="4" stroke="url(#goldGrad)" strokeWidth="3.2" strokeLinecap="round"/>
              </g>
              <circle cx="20" cy="48" r="3.5" fill="#D4A843"/>
              <circle cx="68" cy="48" r="3.5" fill="#D4A843"/>
            </svg>
            <div className="flag-pe" style={{ position:'absolute', top:0, left:2, transformOrigin:'left center' }}>
              <img src="https://flagcdn.com/w40/pe.png" alt="Peru" style={{ width:36, height:24, borderRadius:2, objectFit:'cover', boxShadow:'0 1px 4px rgba(0,0,0,0.4)' }} />
            </div>
            <div className="flag-cz" style={{ position:'absolute', top:0, right:2, transformOrigin:'right center' }}>
              <img src="https://flagcdn.com/w40/cz.png" alt="Czech Republic" style={{ width:36, height:24, borderRadius:2, objectFit:'cover', boxShadow:'0 1px 4px rgba(0,0,0,0.4)' }} />
            </div>
          </div>

          {/* Selector idioma desktop */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 text-cream/70 hover:text-gold transition-colors text-xs tracking-widest uppercase font-sans border border-cream/20 hover:border-gold/40 px-3 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
            >
              <span>{currentLang.flag}</span>
              <span>{currentLang.code.toUpperCase()}</span>
              <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-coffee-900 border border-gold/20 rounded-lg overflow-hidden shadow-xl min-w-[140px]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-sans tracking-wide hover:bg-gold/10 transition-colors cursor-pointer whitespace-nowrap text-left ${
                      lang.code === i18n.language ? 'text-gold' : 'text-cream/70'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.code === i18n.language && <i className="ri-check-line ml-auto text-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: banderas + idioma + hamburguesa */}
          <div className="md:hidden flex items-center gap-2">
            <div style={{ width: 60, height: 34, position: 'relative', flexShrink: 0 }}>
              <svg width="60" height="34" viewBox="0 0 60 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow:'visible',position:'absolute',top:0,left:0}}>
                <defs>
                  <linearGradient id="goldGradM" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A843"/>
                    <stop offset="100%" stopColor="#8B6914"/>
                  </linearGradient>
                </defs>
                <g className="pole-pe">
                  <line x1="14" y1="34" x2="46" y2="3" stroke="url(#goldGradM)" strokeWidth="2.8" strokeLinecap="round"/>
                </g>
                <g className="pole-cz">
                  <line x1="46" y1="34" x2="14" y2="3" stroke="url(#goldGradM)" strokeWidth="2.8" strokeLinecap="round"/>
                </g>
                <circle cx="14" cy="34" r="3" fill="#D4A843"/>
                <circle cx="46" cy="34" r="3" fill="#D4A843"/>
              </svg>
              <div className="flag-pe" style={{ position:'absolute', top:0, left:7, transformOrigin:'left center' }}>
                <img src="https://flagcdn.com/w40/pe.png" alt="Peru" style={{ width:24, height:16, borderRadius:2, objectFit:'cover', boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }} />
              </div>
              <div className="flag-cz" style={{ position:'absolute', top:0, right:7, transformOrigin:'right center' }}>
                <img src="https://flagcdn.com/w40/cz.png" alt="Czech" style={{ width:24, height:16, borderRadius:2, objectFit:'cover', boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }} />
              </div>
            </div>

            <div ref={mobileLangRef} className="relative">
              <button
                onClick={() => setMobileLangOpen((v) => !v)}
                className="flex items-center gap-1 text-cream/70 text-xs font-sans border border-cream/20 px-2.5 py-1.5 rounded-full cursor-pointer"
              >
                <span>{currentLang.flag}</span>
                <span className="uppercase font-semibold">{currentLang.code.toUpperCase()}</span>
                <i className={`ri-arrow-down-s-line text-sm transition-transform ${mobileLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileLangOpen && (
                <div className="absolute right-0 top-full mt-2 bg-coffee-900 border border-gold/20 rounded-xl overflow-hidden z-[60]" style={{ minWidth: 130, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-sans hover:bg-gold/10 transition-colors cursor-pointer text-left ${
                        lang.code === i18n.language ? 'text-gold' : 'text-cream/70'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="uppercase font-semibold tracking-widest">{lang.code.toUpperCase()}</span>
                      {lang.code === i18n.language && <i className="ri-check-line ml-auto text-gold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="w-9 h-9 flex items-center justify-center cursor-pointer" onClick={() => setMobOpen(true)}>
              <i className="ri-menu-line text-cream text-xl" />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${mobOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-coffee-800 transition-transform duration-300 ${mobOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-8`}>
          <button onClick={() => setMobOpen(false)} className="self-end mb-8 w-9 h-9 flex items-center justify-center cursor-pointer">
            <i className="ri-close-line text-cream text-2xl" />
          </button>
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => { scrollTo(l.key); setMobOpen(false); }}
                className="text-left text-cream/80 hover:text-gold transition-colors text-base tracking-widest uppercase font-serif font-bold cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
