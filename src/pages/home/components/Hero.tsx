import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { heroSlides } from '../../../mocks/holzen';

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.type === 'video' ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/70 via-coffee-900/55 to-coffee-900/85" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-6 md:px-16 max-w-4xl">
        <p className="font-black text-[clamp(0.75rem,1.6vw,1.25rem)] leading-tight tracking-[0.08em] text-cream uppercase mb-4 whitespace-pre-line pl-1 md:pl-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {t('hero_subtitle')}
        </p>
        <h1
          className="text-[clamp(2.1rem,5.8vw,4.7rem)] leading-none tracking-[0.22em] uppercase mb-8 inline-block"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#D4A843',
            textShadow: '0 0 30px rgba(212,168,67,0.4)',
            fontWeight: 500,
            WebkitTextStroke: '0.3px #D4A843',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
          }}
        >
          Comparto<em style={{ fontStyle: 'italic', fontSize: '0.82em', fontWeight: 500, color: '#D4A843', WebkitTextStroke: '0.4px #D4A843', filter: 'drop-shadow(0 2px 8px rgba(212,168,67,0.5))', textTransform: 'lowercase', letterSpacing: '-0.02em', marginLeft: '0.18em' }}>tu</em> Esperanza
        </h1>
        <p className="max-w-xl leading-relaxed mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {(() => {
            const desc = t('hero_desc');
            const dotIdx = desc.indexOf('.');
            const firstSentence = dotIdx !== -1 ? desc.slice(0, dotIdx) + ', Perú.' : desc;
            const rest = dotIdx !== -1 ? desc.slice(dotIdx + 1).trimStart() : '';
            return (
              <>
                <span style={{
                  display: 'block',
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#D4A843',
                  fontWeight: 900,
                  fontSize: 'clamp(0.82rem, 1.55vw, 1.05rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  WebkitTextStroke: '0.3px #D4A843',
                  textShadow: '0 0 18px rgba(212,168,67,0.5)',
                  marginBottom: '0.45rem',
                  lineHeight: 1.2,
                }}>
                  {firstSentence}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(245,230,211,0.7)', fontSize: 'clamp(0.75rem, 1.3vw, 0.95rem)' }}>
                  {rest}
                </span>
              </>
            );
          })()}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo('products')}
            className="relative overflow-hidden text-cream font-black px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-colors cursor-pointer whitespace-nowrap group"
            style={{ fontFamily: "'Cormorant Garamond', serif", background: '#5C1422', boxShadow: '0 0 20px rgba(122,29,46,0.55), 0 0 12px rgba(201,169,110,0.3)' }}
          >
            <span className="relative z-10">{t('hero_cta_primary')}</span>
            <span className="absolute top-0 bottom-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </button>
          <button
            onClick={() => scrollTo('farmers')}
            className="relative overflow-hidden border border-cream/60 hover:border-cream text-cream hover:bg-cream/5 font-black px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap group"
            style={{ fontFamily: "'Cormorant Garamond', serif", boxShadow: '0 0 18px rgba(245,235,210,0.18)' }}
          >
            <span className="relative z-10">{t('hero_cta_secondary')}</span>
            <span className="absolute top-0 bottom-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === current
                ? 'w-8 h-2 bg-gold'
                : 'w-2 h-2 bg-cream/30 hover:bg-cream/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
