import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const IMAGES = [
  '/Home/images/mision1.png',
  '/Home/images/mision2.png',
];

const AUTOPLAY_MS = 4500;

const MisionSection = () => {
  const { t } = useTranslation();
  const [cur, setCur] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (transitioning || idx === cur) return;
    setTransitioning(true);
    setTimeout(() => {
      setCur(idx);
      setTransitioning(false);
    }, 400);
  };

  const advance = () => setCur((c) => (c + 1) % IMAGES.length);

  useEffect(() => {
    timerRef.current = setInterval(advance, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="mision"
      ref={sectionRef}
      className="relative w-full bg-coffee-900 overflow-hidden py-16 px-6"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Home/images/hero1.jpg)' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-coffee-900/72 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT — header + text */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            {/* Header */}
            <div className="mb-8">
              <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-3">
                {t('farmers_eyebrow')}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                {t('mision_title', 'Misión')}
              </h2>
              <div
                className="h-[2px] w-16 mb-8"
                style={{ background: 'linear-gradient(90deg, #7A1D2E, transparent)' }}
              />
            </div>

            {/* Mission text */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(20,10,5,0.60)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <i
                className="ri-double-quotes-l text-gold/40 block mb-3"
                style={{ fontSize: '2rem' }}
              />
              <p className="font-serif text-cream/90 text-base md:text-lg leading-relaxed">
                {t('manifesto_mision')}
              </p>
            </div>

            {/* Decorative stat row */}
            <div className="flex gap-6 mt-8">
              <div className="flex flex-col">
                <span className="font-serif text-gold font-bold text-2xl">142</span>
                <span className="text-cream/40 font-sans text-[10px] tracking-widest uppercase">{t('manifesto_stat_families')}</span>
              </div>
              <div className="w-px bg-cream/10" />
              <div className="flex flex-col">
                <span className="font-serif text-gold font-bold text-2xl">48K€</span>
                <span className="text-cream/40 font-sans text-[10px] tracking-widest uppercase">{t('manifesto_stat_donated')}</span>
              </div>
              <div className="w-px bg-cream/10" />
              <div className="flex flex-col">
                <span className="font-serif text-gold font-bold text-2xl">340</span>
                <span className="text-cream/40 font-sans text-[10px] tracking-widest uppercase">{t('manifesto_stat_children')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — image carousel */}
          <div
            className="transition-all duration-700 delay-200"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.2)', minHeight: '420px', maxHeight: '520px' }}
            >
              {IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Misión ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: i === cur ? 1 : 0,
                    transform: i === cur ? 'scale(1)' : 'scale(1.03)',
                  }}
                />
              ))}

              {/* Gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(15,8,3,0.8), transparent)' }}
              />

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-[3px] rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                    style={{
                      width: i === cur ? '48px' : '16px',
                      background: 'rgba(201,169,110,0.25)',
                    }}
                  >
                    {i === cur && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: '#C9A84C',
                          animation: `misionProgress ${AUTOPLAY_MS}ms linear forwards`,
                          transformOrigin: 'left',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                onClick={() => goTo((cur - 1 + IMAGES.length) % IMAGES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(20,10,5,0.55)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <i className="ri-arrow-left-s-line text-cream text-lg" />
              </button>
              <button
                onClick={() => goTo((cur + 1) % IMAGES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(20,10,5,0.55)', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <i className="ri-arrow-right-s-line text-cream text-lg" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes misionProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default MisionSection;
