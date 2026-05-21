import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';



const VisionSection = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardsVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#0F0500' }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/Home/videos/fondos3.mp4"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-10 items-center">

          {/* LEFT — Image with ribbon overlay */}
          <div
            className="lg:col-span-2 relative transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            {/* Header arriba de la imagen */}
            <div className="mb-6">
              <div className="mb-3">
                <span className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.25em] uppercase font-semibold" style={{ background: 'linear-gradient(135deg, #7A1D2E 0%, #5C1422 100%)', color: '#FFFFFF', fontFamily: "'Playfair Display', serif", boxShadow: '0 4px 18px rgba(92,20,34,0.45)' }}>
                  <span className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" style={{ animation: 'shimmerSweep 2.2s ease-in-out infinite' }} />
                  <span className="relative z-10">{t('vision_eyebrow')}</span>
                </span>
              </div>
              <h2
                className="font-serif text-4xl md:text-5xl text-cream mb-3 max-w-sm"
                style={{ fontWeight: 900, lineHeight: 1.15 }}
              >
                {t('vision_title')}
              </h2>
              <div
                className="h-[2px] w-16"
                style={{ background: 'linear-gradient(90deg, #7A1D2E, transparent)' }}
              />
            </div>

            {/* Image with zoom-pulse */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(201,168,76,0.25)',
                minHeight: '520px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src="/Home/images/vision.png"
                alt="Visión"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  animation: 'visionPulse 14s ease-in-out infinite',
                }}
              />

              {/* Diagonal vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(15,8,3,0.55) 100%)',
                }}
              />

              {/* Floating golden particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: '4px',
                      height: '4px',
                      background: '#C9A84C',
                      opacity: 0.65,
                      left: `${15 + (i * 14)}%`,
                      top: `${20 + ((i * 17) % 65)}%`,
                      animation: `visionParticle ${4 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                      boxShadow: '0 0 10px rgba(201,168,76,0.8)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — 3 cards apiladas con línea conectora */}
          <div className="lg:col-span-3 relative">
            {/* Línea dorada vertical conectora */}
            <div
              className="hidden lg:block absolute left-[28px] top-12 bottom-12 w-[2px]"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.6) 20%, rgba(201,168,76,0.6) 80%, transparent 100%)',
              }}
            />

            <div className="flex flex-col gap-6">
              {([
                { title: t('vision_card1_title'), body: t('vision_card1_body'), icon: 'ri-earth-line' },
                { title: t('vision_card2_title'), body: t('vision_card2_body'), icon: 'ri-home-heart-line' },
                { title: t('vision_card3_title'), body: t('vision_card3_body'), icon: 'ri-sparkling-2-line' },
              ]).map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="relative flex gap-5 transition-all duration-700"
                  style={{
                    opacity: cardsVisible[i] ? 1 : 0,
                    transform: cardsVisible[i] ? 'translateX(0)' : 'translateX(30px)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Number circle */}
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-serif relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, #3F0D17 0%, #7A1D2E 50%, #3F0D17 100%)',
                      color: '#C9A84C',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      letterSpacing: '0.05em',
                      boxShadow: '0 0 22px rgba(122,29,46,0.55), 0 0 12px rgba(201,169,110,0.25)',
                      border: '1px solid rgba(201,168,76,0.35)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl p-6"
                    style={{
                      background: 'rgba(20,10,5,0.65)',
                      backdropFilter: 'blur(14px)',
                      border: '1px solid rgba(201,168,76,0.18)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <i className={`${item.icon} text-gold`} style={{ fontSize: '1.3rem' }} />
                      <h3
                        className="font-serif text-cream text-lg md:text-xl"
                        style={{ fontWeight: 700, letterSpacing: '0.02em' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-serif text-cream/85 text-xs md:text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes visionPulse {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.06) translate(-1%, -1%); }
        }
        @keyframes visionParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.65; }
          50% { transform: translateY(-30px) scale(1.4); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default VisionSection;
