import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// ── Carrusel manual ───────────────────────────────────────────────────────────
const Carrusel = ({ cards, pressLabel }: { cards: string[]; pressLabel: string }) => {
  const [cur, setCur] = useState(0);
  const [anim, setAnim] = useState(false);

  const goTo = (next: number) => {
    const idx = (next + cards.length) % cards.length;
    if (idx === cur) return;
    setAnim(true);
    setTimeout(() => { setCur(idx); setAnim(false); }, 230);
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(15,8,3,0.50)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(201,168,76,0.18)',
    borderRadius: '1rem',
    padding: '1.25rem',
    transition: 'opacity 0.23s ease, transform 0.23s ease',
    opacity: anim ? 0 : 1,
    transform: anim ? 'translateY(6px)' : 'translateY(0)',
    minHeight: '120px',
  };

  const arrowBtn: React.CSSProperties = {
    width: '2rem', height: '2rem', borderRadius: '50%',
    border: '1px solid rgba(201,168,76,0.3)',
    background: 'rgba(20,10,5,0.55)',
    color: '#fff8f0', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', fontSize: '1rem', flexShrink: 0,
  };

  return (
    <div>
      {cards.length > 1 && (
        <div style={{ marginBottom: '0.6rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'linear-gradient(135deg,#5A0D1E 0%,#7A1D2E 100%)',
            color: '#fff', fontSize: '0.72rem', fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700,
            letterSpacing: '0.07em', padding: '0.28rem 0.8rem',
            borderRadius: '9999px', boxShadow: '0 0 10px rgba(122,29,46,0.4)',
          }}>
            <i className="ri-arrow-left-right-line" style={{ fontSize: '0.72rem' }} />
            {pressLabel}
          </span>
        </div>
      )}

      <div style={cardStyle}>
        <i className="ri-double-quotes-l" style={{ color: 'rgba(201,169,110,0.32)', fontSize: '1.3rem', display: 'block', marginBottom: '0.5rem' }} />
        <p style={{ fontFamily: "'Josefin Sans', sans-serif", color: 'rgba(255,248,240,0.88)', fontSize: '0.8rem', lineHeight: 1.8 }}>
          {cards[cur]}
        </p>
      </div>

      {cards.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.65rem' }}>
          <button style={arrowBtn} onClick={() => goTo(cur - 1)}><i className="ri-arrow-left-s-line" /></button>
          <div style={{ display: 'flex', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>
            {cards.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                height: '3px', width: i === cur ? '32px' : '10px',
                borderRadius: '9999px', border: 'none', cursor: 'pointer',
                background: i === cur ? '#C9A84C' : 'rgba(201,169,110,0.25)',
                transition: 'all 0.3s ease', padding: 0,
              }} />
            ))}
          </div>
          <button style={arrowBtn} onClick={() => goTo(cur + 1)}><i className="ri-arrow-right-s-line" /></button>
        </div>
      )}
    </div>
  );
};

// ── Subtítulo dorado más grande y más amarillo ────────────────────────────────
const GoldenTitle = ({ text, children }: { text?: string; children?: ReactNode }) => (
  <div style={{ margin: '1.2rem 0 0.7rem' }}>
    <p style={{
      fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, letterSpacing: '0.2em',
      fontSize: 'clamp(1.2rem, 2.6vw, 1.7rem)', letterSpacing: '0.02em',
      textTransform: 'uppercase',
      background: 'linear-gradient(90deg,#FFD700,#FFEE00,#FFD700)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      backgroundClip: 'text', lineHeight: 1.2,
      WebkitTextStroke: '0.6px #FFD700',
    }}>{children || text}</p>
    <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg,#FFD700,transparent)', marginTop: '0.3rem' }} />
  </div>
);

// ── Sección principal ─────────────────────────────────────────────────────────
const HistoriaSection = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cards1: string[] = t('historia_cards1', { returnObjects: true }) as string[];
  const cards2: string[] = t('historia_cards2', { returnObjects: true }) as string[];
  const cards3: string[] = t('historia_cards3', { returnObjects: true }) as string[];
  const pressLabel: string = t('historia_press');

  const fadeLeft: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };
  const fadeRight: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(30px)',
    transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
  };

  return (
    <section id="historia" ref={sectionRef} className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>

      {/* Fondo */}
      <div className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: 'url(/Principal/images/fondos.jpg)', zIndex: 0 }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(160deg,rgba(15,5,2,0.38) 0%,rgba(8,3,1,0.44) 60%,rgba(15,5,2,0.36) 100%)',
        zIndex: 1,
      }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8" style={{ zIndex: 2 }}>

        {/* Eyebrow centrado arriba */}
        {/* ── Fila superior: bloque historia (izq) + COMPARTO (der) ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: título + carrusel historia */}
          <div style={fadeLeft}>
            <h2 style={{
              fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100,
              fontSize: 'clamp(0.9rem,2.2vw,2rem)', color: '#fff8f0',
              lineHeight: 1.15, marginBottom: '0.4rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'nowrap',
            }}>
              {t('historia_title_line1')} {t('historia_title_line2')}
            </h2>
            <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg,#7A1D2E,transparent)', marginBottom: '1.2rem', margin: '0.4rem auto 1.2rem' }} />
            <Carrusel cards={cards1} pressLabel={pressLabel} />
          </div>

          {/* RIGHT: COMPARTO TU ESPERANZA — alineado a la card izquierda */}
          <div style={fadeRight} className="lg:pt-[3rem]">
            <div style={{ margin: '1.2rem 0 0.7rem' }}>
              <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: 'clamp(1.4rem,2.8vw,2.2rem)', letterSpacing: '0.25em', lineHeight: 1, display: 'block', color: '#FFD700' }}>PΛCHΛ</p>
              <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: 'clamp(0.6rem,1.2vw,0.95rem)', letterSpacing: '0.55em', textTransform: 'uppercase', marginTop: '0.15em', lineHeight: 1, color: '#FFD700' }}>ESPERANZA</p>
              <div style={{ height: '2px', width: '40px', background: 'linear-gradient(90deg,#FFD700,transparent)', marginTop: '0.3rem' }} />
            </div>
            <Carrusel cards={cards2} pressLabel={pressLabel} />
          </div>

        </div>

        {/* ── Fila inferior: SALKANTAY centrado ── */}
        <div className="flex flex-col items-center mt-6" style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.3s',
        }}>
          <div style={{ width: '100%', maxWidth: '620px' }}>
            <GoldenTitle text="SALKANTAY ANDINO" />
            <Carrusel cards={cards3} pressLabel={pressLabel} />
          </div>
        </div>

        {/* Frase final */}
        <div style={{ textAlign: 'center', marginTop: '1.8rem', paddingBottom: '0.5rem' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(1.2rem, 2.8vw, 2rem)',
            color: 'rgba(255,248,240,0.92)',
            letterSpacing: '0.03em', lineHeight: 1.3,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            "{t('historia_frase')}"
          </p>
        </div>

      </div>
    </section>
  );
};

export default HistoriaSection;
