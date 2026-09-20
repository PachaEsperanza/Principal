import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const useCountUp = (target: number, active: boolean, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
};

const CircleStat = ({
  val, prefix = '', suffix, label, maxVal, active,
}: {
  val: number; prefix?: string; suffix: string; label: string; maxVal: number; active: boolean;
}) => {
  const count = useCountUp(val, active);
  const size = 110;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const progress = active ? Math.min(val / maxVal, 1) : 0;
  const dash = circ * progress;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-xl border border-cream/10"
        style={{ width: size + 24, height: size + 24, background: 'rgba(30,18,10,0.55)' }}
      >
        <svg
          width={size}
          height={size}
          className="absolute"
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(201,169,110,0.15)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#c9a96e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circ}`}
            strokeDashoffset={circ - dash}
            style={{ transition: active ? 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
          />
        </svg>
        <span className="font-serif text-gold font-bold relative z-10" style={{ fontSize: '1.5rem' }}>
          {prefix}{count}{suffix}
        </span>
      </div>
      <p className="text-cream/55 font-sans text-[10px] tracking-widest uppercase text-center leading-tight max-w-[100px]">
        {label}
      </p>
    </div>
  );
};

const Manifesto = () => {
  const { t } = useTranslation();
  const [statsVisible, setStatsVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [carouselActive, setCarouselActive] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sintropicoCards = [
    { image: '/Principal/images/1.png', title: 'Sombra y microclima', description: 'Los árboles regulan la temperatura y humedad, protegiendo al cacao de condiciones extremas. Sin embargo, un estudio en Ghana encontró que el crecimiento y rendimiento del cacao disminuyeron cuando la cobertura de sombra era excesiva a nivel de parcela.' },
    { image: '/Principal/images/2.png', title: 'Biomasa y fertilidad del suelo', description: 'Las hojas y ramas podadas se incorporan al suelo, descomponiéndose en materia orgánica que libera nutrientes. Este ciclo mejora la estructura del suelo y aumenta la actividad biológica, favoreciendo condiciones óptimas para el cacao.' },
    { image: '/Principal/images/3.png', title: 'Agua y protección del suelo', description: 'La cobertura vegetal permanente reduce la erosión causada por la lluvia y mejora la infiltración de agua. Esto protege el suelo y ayuda a mantener humedad estable, clave para el desarrollo saludable del cacao.' },
    { image: '/Principal/images/4.png', title: 'Diversificación de ingresos', description: 'Además del cacao, la finca puede producir frutas para venta o consumo y madera como ingreso a largo plazo. Las especies de servicio aportan beneficios ecológicos sin competir directamente por el espacio productivo principal.' },
    { image: '/Principal/images/5.png', title: 'Diseño por estratos', description: 'El sistema se organiza en 4 niveles: árboles altos (maderables/frutales), árboles de sombra media, el cacao como cultivo productivo, y cobertura baja. Cada estrato ocupa un nicho diferente dentro del ciclo del sistema.' },
    { image: '/Principal/images/6.png', title: 'Manejo de densidad y especies', description: 'Sembrar muchos árboles no mejora automáticamente el cacao; el exceso genera competencia por agua y nutrientes. La clave está en elegir la especie correcta, la distancia adecuada y la densidad que permita que cada planta cumpla su función sin perjudicar al cultivo.' },
  ];

  const stats = [
    { val: 142, suffix: '', label: t('manifesto_stat_families'), maxVal: 200 },
    { val: 340, suffix: '', label: t('manifesto_stat_children'), maxVal: 400 },
    { val: 48, prefix: '', suffix: 'K€', label: t('manifesto_stat_donated'), maxVal: 60 },
    { val: 38, suffix: '', label: t('manifesto_stat_women'), maxVal: 50 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setContentVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => setActiveTab((p) => (p + 1) % tabs.length), 4500);
  //   return () => clearInterval(timer);
  // }, [tabs.length]);

  
  return (
    <section id="manifesto" ref={sectionRef} className="relative bg-coffee-900 py-8 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Principal/images/fondito.jpg)', opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-coffee-900/25 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Title */}
        <div className={`text-center mb-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="mb-0" style={{ lineHeight: 1 }}>
            <em
              style={{
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                textTransform: 'lowercase',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                background: 'linear-gradient(90deg,#FFD700,#FFEE00,#FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('manifesto_title')}
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.55em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.5rem)',
              marginTop: '-0.15em',
              lineHeight: 1,
            }}
          >
            {t('manifesto_subtitle')}
          </p>
        </div>

        {/* Sintrópico cards carousel — fan style, 2 cards centradas */}
        <div style={{ position: 'relative', minHeight: 580 }}>
          {sintropicoCards.map((card, idx) => {
            const total = sintropicoCards.length;
            let diff = idx - carouselActive;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0 || diff === 1;
            const distFromCenter = diff === 0 || diff === 1 ? 0 : diff < 0 ? -diff : diff - 1;

            let show = true;
            if (distFromCenter === 1 && screenWidth < 640) show = false;
            if (distFromCenter === 2 && screenWidth < 1024) show = false;
            if (distFromCenter >= 3) show = false;

            const centerWidth = Math.min(360, (screenWidth - 96) / 2);
            const cardWidth = isCenter ? centerWidth : distFromCenter === 1 ? 200 : 160;
            const scale = isCenter ? 1 : distFromCenter === 1 ? 0.9 : 0.75;
            const opacity = !show ? 0 : isCenter ? 1 : distFromCenter === 1 ? 0.7 : 0.4;
            const zIndex = 20 - distFromCenter;
            const step = centerWidth + 30;
            const adjusted = diff - 0.5;

            return (
              <div
                key={idx}
                onClick={() => setCarouselActive(idx)}
                className="rounded-2xl overflow-hidden border cursor-pointer"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: cardWidth,
                  borderColor: isCenter ? 'rgba(212,164,65,0.4)' : 'rgba(255,255,255,0.1)',
                  background: isCenter ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  transform: `translateX(calc(-50% + ${adjusted * step}px)) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: show ? 'auto' : 'none',
                  transition: 'transform 500ms ease, opacity 500ms ease, width 500ms ease',
                }}
              >
                <div style={{ overflow: 'hidden', aspectRatio: '1.2 / 1', background: 'rgba(0,0,0,0.25)' }}>
                  <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
                </div>
                <div style={{ padding: isCenter ? 24 : 16 }}>
                  <h3
                    className="mb-2 uppercase"
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: '#D9A441',
                      fontSize: isCenter ? '1.15rem' : '0.85rem',
                    }}
                  >
                    {card.title}
                  </h3>
                  {isCenter && (
                    <p className="text-cream/70 text-sm" style={{ lineHeight: 1.35 }}>{card.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => setCarouselActive((i) => (i - 1 + sintropicoCards.length) % sintropicoCards.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-cream hover:bg-white/20 transition-all cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>

          <div className="flex gap-2">
            {sintropicoCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselActive(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === carouselActive ? 'w-6 h-2' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
                style={i === carouselActive ? { background: '#D9A441' } : undefined}
              />
            ))}
          </div>

          <button
            onClick={() => setCarouselActive((i) => (i + 1) % sintropicoCards.length)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-cream hover:bg-white/20 transition-all cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>

      </div>
    </section>
  );
};

// shimmerSweep is defined globally in index.css — adding inline fallback
const _shimmerStyle = `
@keyframes shimmerSweep {
  0% { transform: translateX(-100%); }
  60% { transform: translateX(200%); }
  100% { transform: translateX(200%); }
}
@keyframes cacaoFloat {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('manifesto-shimmer')) {
  const s = document.createElement('style');
  s.id = 'manifesto-shimmer';
  s.textContent = _shimmerStyle;
  document.head.appendChild(s);
}

export default Manifesto;
