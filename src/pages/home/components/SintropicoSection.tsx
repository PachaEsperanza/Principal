import { useState, useRef, useEffect } from 'react';
import {
  IconCacao, IconPlatano, IconPina, IconYuca, IconNaranja, IconGuayaba,
  IconPapaya, IconLima, IconGuaba, IconPijuayo, IconArbol, IconAbeja,
  IconMoneda, IconAbono, IconSol, FloatIcon,
} from './SintropicoIcons';

// ─── Estilos compartidos ────────────────────────────────────────────────
const eyebrow: React.CSSProperties = {
  fontFamily: "'Josefin Sans', sans-serif",
  fontWeight: 700,
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#9C6B1F',
  marginBottom: '0.5rem',
  display: 'block',
};

const cardTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 800,
  color: '#2A1D0E',
  fontSize: 'clamp(1.3rem, 3vw, 2rem)',
  lineHeight: 1.15,
  marginBottom: '1.25rem',
};

const miniCard: React.CSSProperties = {
  background: '#2A1D0E',
  border: '1px solid rgba(217,164,65,0.25)',
  borderRadius: '1rem',
  padding: '1.1rem',
};

const miniLabel: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  color: '#E0C98A',
  fontSize: '0.95rem',
  marginBottom: '0.35rem',
};

const miniBody: React.CSSProperties = {
  fontFamily: "'Josefin Sans', sans-serif",
  color: 'rgba(245,230,208,0.8)',
  fontSize: '0.8rem',
  lineHeight: 1.55,
};

// ─── Slide 1: Lo que cambia ─────────────────────────────────────────────
const SlideCambia = () => (
  <div>
    <span style={eyebrow}>Lo que cambia</span>
    <h3 style={cardTitle}>Hoy usted vende cacao. Con este sistema vende cacao y fruta.</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div style={{ ...miniCard, background: '#3D2A18' }}>
        <p style={{ ...miniLabel, color: '#C8A671' }}>Parcela actual</p>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li>Un solo producto: cacao en grano.</li>
          <li>Ingreso concentrado en la campaña.</li>
          <li>Suelo descubierto entre líneas, más maleza.</li>
          <li>Sombra despareja, plantas expuestas al sol.</li>
        </ul>
      </div>
      <div style={{ ...miniCard, background: '#1F3D24', borderColor: 'rgba(143,174,78,0.35)' }}>
        <p style={{ ...miniLabel, color: '#A8C97F' }}>Con sistema sintrópico</p>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li>Cacao + plátano, piña, papaya, cítricos, guaba, pijuayo.</li>
          <li>Cosechas cada mes desde el año 1.</li>
          <li>Suelo siempre cubierto con la poda.</li>
          <li>Sombra ordenada: grano más grande y aromático.</li>
        </ul>
      </div>
    </div>
  </div>
);

// ─── Slide 2: 4 reglas ──────────────────────────────────────────────────
const reglas = [
  { n: 1, t: 'Suelo siempre cubierto', d: 'Nunca dejamos tierra desnuda. Todo lo que se poda se pica y se queda en la parcela como abono.', icon: <IconAbono /> },
  { n: 2, t: 'Muchos pisos de altura', d: 'Plantas bajas, medianas y altas en el mismo espacio. Cada una aprovecha una parte distinta del sol.', icon: <IconSol /> },
  { n: 3, t: 'Poda como abono', d: 'Podamos guaba y plátano 2 veces al año. Esa hoja verde alimenta al cacao: no se quema ni se saca.', icon: <IconGuaba /> },
  { n: 4, t: 'Cada planta tiene su turno', d: 'Las de vida corta (yuca, papaya, plátano) dan plata rápido y luego dejan sitio a las de vida larga.', icon: <IconCacao /> },
];
const SlideReglas = () => (
  <div>
    <span style={eyebrow}>El sistema en 4 reglas</span>
    <h3 style={cardTitle}>Sembrar juntas las plantas que se ayudan entre sí</h3>
    <div className="grid sm:grid-cols-2 gap-4">
      {reglas.map((r, i) => (
        <div key={r.n} style={miniCard} className="flex gap-4 items-start">
          <FloatIcon delay={i * 0.3}>{r.icon}</FloatIcon>
          <div>
            <p style={miniLabel}>{r.n} · {r.t}</p>
            <p style={miniBody}>{r.d}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Slide 3: Estratos ──────────────────────────────────────────────────
const estratos = [
  { nivel: 'Emergente · 15-25 m', txt: 'Bolaina, capirona, cedro — dan madera y rompen el viento.', color: '#1F3D24' },
  { nivel: 'Alto · 8-12 m', txt: 'Guaba y pijuayo — sombra, abono verde y flor para las abejas.', color: '#3E6B3E' },
  { nivel: 'Medio · 3-5 m', txt: 'CACAO CHUNCHO, cítricos, guayaba, carambola — el corazón del sistema.', color: '#6B3620', bold: true },
  { nivel: 'Bajo · 1,5-3 m', txt: 'Plátano y papaya.', color: '#B8842F' },
  { nivel: 'Rasante · 0-1 m', txt: 'Piña, cúrcuma, jengibre, yuca y maní de cobertura.', color: '#D9C4A0', dark: true },
];
const SlideEstratos = () => (
  <div>
    <span style={eyebrow}>Estratos</span>
    <h3 style={cardTitle}>Los 5 pisos de la parcela</h3>
    <div className="grid md:grid-cols-2 gap-5 items-stretch">
      <div className="flex flex-col gap-2.5">
        {estratos.map((e) => (
          <div key={e.nivel} className="flex-1 flex flex-col justify-center gap-1 rounded-xl px-4 py-3"
            style={{ background: e.color }}>
            <span style={{
              fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.68rem', letterSpacing: '0.05em',
              color: e.dark ? 'rgba(30,20,10,0.7)' : 'rgba(255,255,255,0.65)',
            }}>{e.nivel}</span>
            <span style={{
              fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.85rem',
              color: e.dark ? '#2A1D0E' : '#FBF6EE', fontWeight: e.bold ? 700 : 400,
            }}>{e.txt}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FAF7F2', border: '1px solid rgba(140,90,30,0.12)' }}>
        <img
          src="/Principal/images/estratos-diagrama.jpeg"
          alt="Diagrama de los 5 pisos de la parcela: emergente, alto, medio (cacao), bajo y rasante"
          className="w-full h-full object-contain"
          style={{ display: 'block' }}
        />
      </div>
    </div>
    <p style={{ ...miniBody, color: '#6B5232', marginTop: '1rem', fontStyle: 'italic' }}>
      El cacao chuncho vive en el piso medio y necesita entre 40% y 50% de sombra. Todo el diseño está hecho para darle esa sombra sin quitarle luz.
    </p>
  </div>
);

// ─── Slide 4: Vista desde arriba (mapa simplificado) ───────────────────
const calles = [
  { nombre: 'Calle A', icon: <IconPlatano size={52} />, extra: 'Yuca y piña en el borde' },
  { nombre: 'Calle B', icon: <IconNaranja size={52} />, extra: 'Papaya entre cada árbol' },
  { nombre: 'Calle C', icon: <IconGuaba size={52} />, extra: 'Madera cada 12 metros' },
];
const SlideMapa = () => (
  <div>
    <span style={eyebrow}>Vista desde arriba</span>
    <h3 style={cardTitle}>Qué va entre cada planta de cacao</h3>
    <div className="flex flex-wrap items-center justify-center gap-2 mb-5" style={{ ...miniBody, color: '#5C4326', fontSize: '0.78rem' }}>
      <FloatIcon><IconCacao size={40} /></FloatIcon><span>Cacao cada 3 m</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>Calles a 4 m de distancia</span>
    </div>
    <div className="grid sm:grid-cols-3 gap-4">
      {calles.map((c, i) => (
        <div key={c.nombre} style={miniCard} className="text-center">
          <div className="flex justify-center mb-2"><FloatIcon delay={i * 0.3}>{c.icon}</FloatIcon></div>
          <p style={miniLabel}>{c.nombre}</p>
          <p style={miniBody}>{c.extra}</p>
        </div>
      ))}
    </div>
    <p style={{ ...miniBody, color: '#6B5232', marginTop: '1rem', fontStyle: 'italic' }}>
      Cada planta grande va justo al medio entre dos cacaos de la línea vecina, nunca frente a frente — así ninguna raíz compite y la sombra cae repartida.
    </p>
  </div>
);

// ─── Slide 5: Plátano, yuca y piña ──────────────────────────────────────
const bajos = [
  { icon: <IconPlatano />, t: 'Plátano / bellaco', s: 'cada 3 m', d: 'Da sombra rápida al cacao joven. Después de cosechar, el tallo se pica y queda como abono.' },
  { icon: <IconYuca />, t: 'Yuca', s: 'entre plátanos', d: 'Solo el primer año. Se cosecha a los 8-10 meses y libera el espacio.' },
  { icon: <IconPina />, t: 'Piña', s: 'en los bordes', d: 'Aguanta media sombra y protege el borde de la calle. Se cosecha entre los 16 y 18 meses.' },
];
const SlideBajos = () => (
  <div>
    <span style={eyebrow}>Primera plata del sistema</span>
    <h3 style={cardTitle}>Plátano, yuca y piña</h3>
    <div className="grid sm:grid-cols-3 gap-4">
      {bajos.map((b, i) => (
        <div key={b.t} style={miniCard}>
          <div className="mb-2"><FloatIcon delay={i * 0.3}>{b.icon}</FloatIcon></div>
          <p style={miniLabel}>{b.t}</p>
          <p style={{ ...miniBody, color: '#D9A441', marginBottom: '0.3rem' }}>{b.s}</p>
          <p style={miniBody}>{b.d}</p>
        </div>
      ))}
    </div>
    <p style={{ ...miniBody, color: '#6B5232', marginTop: '1rem', fontStyle: 'italic' }}>Nada sale de la parcela: todo lo que se poda se queda como abono.</p>
  </div>
);

// ─── Slide 6: Cítricos y frutales medianos ──────────────────────────────
const medianos = [
  { icon: <IconNaranja />, t: 'Naranja y mandarina', s: 'cada 6 m', d: 'Producen del año 3 al 4. Su flor es la comida favorita de las abejas.' },
  { icon: <IconGuayaba />, t: 'Guayaba y carambola', s: 'cada 6 m', d: 'Frutas para vender y para la casa. Cargan 2 veces al año.' },
  { icon: <IconPapaya />, t: 'Papaya', s: 'cada 3 m', d: 'Cosecha desde el mes 10. Cuando los cítricos crecen, la papaya se retira.' },
  { icon: <IconLima />, t: 'Lima dulce', s: 'opcional', d: 'Se elige según lo que mejor se venda en la feria de la zona.' },
];
const SlideMedianos = () => (
  <div>
    <span style={eyebrow}>Fruta fresca para el mercado</span>
    <h3 style={cardTitle}>Cítricos y frutales medianos</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
      {medianos.map((m, i) => (
        <div key={m.t} style={miniCard}>
          <div className="mb-2"><FloatIcon delay={i * 0.3}>{m.icon}</FloatIcon></div>
          <p style={miniLabel}>{m.t}</p>
          <p style={{ ...miniBody, color: '#D9A441', marginBottom: '0.3rem' }}>{m.s}</p>
          <p style={miniBody}>{m.d}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Slide 7: Guaba, pijuayo y madera ────────────────────────────────────
const altos = [
  { icon: <IconGuaba />, t: 'Guaba / pacae', s: 'cada 6 m', d: 'Fija nitrógeno. Se poda 2 veces al año: esa hoja es el abono principal del cacao.' },
  { icon: <IconPijuayo />, t: 'Pijuayo', s: 'alternado', d: 'Da fruto desde el año 3. Su hoja dura protege el suelo en época seca.' },
  { icon: <IconArbol />, t: 'Bolaina, capirona, cedro', s: 'cada 12 m', d: 'El ahorro a largo plazo: madera para vender más adelante.' },
];
const SlideAltos = () => (
  <div>
    <span style={eyebrow}>Abono, sombra alta y ahorro</span>
    <h3 style={cardTitle}>Guaba, pijuayo y madera</h3>
    <div className="grid sm:grid-cols-3 gap-4">
      {altos.map((a, i) => (
        <div key={a.t} style={miniCard}>
          <div className="mb-2"><FloatIcon delay={i * 0.3}>{a.icon}</FloatIcon></div>
          <p style={miniLabel}>{a.t}</p>
          <p style={{ ...miniBody, color: '#D9A441', marginBottom: '0.3rem' }}>{a.s}</p>
          <p style={miniBody}>{a.d}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Slide 8: Cuándo entra la plata (destacado) ─────────────────────────
const ingresos = [
  { periodo: 'Mes 8-12', t: 'Yuca, papaya y primer plátano', d: 'La primera venta, en el mismo año de la siembra.', color: '#D9A441' },
  { periodo: 'Año 2', t: 'Piña y plátano continuo', d: 'Cosechas todo el año. Entran las abejas.', color: '#C8961F' },
  { periodo: 'Año 3-4', t: 'Cítricos y pijuayo', d: 'El cacao ya muestra mejor llenado de grano.', color: '#B8571E' },
  { periodo: 'Año 5-7', t: 'Sistema en pleno', d: 'Guayaba, carambola, miel y cacao estable.', color: '#3E6B3E' },
  { periodo: 'Año 8+', t: 'Madera', d: 'Bolaina, capirona y cedro como ahorro familiar.', color: '#1F3D24' },
];
const SlideIngresos = () => (
  <div className="rounded-2xl p-5 md:p-6" style={{ background: '#4A3410', border: '1.5px solid rgba(217,164,65,0.45)' }}>
    <div className="flex items-center gap-2 mb-1">
      <FloatIcon><IconMoneda size={48} /></FloatIcon>
      <span style={{ ...eyebrow, marginBottom: 0, color: '#F0C46A' }}>Ingresos · lo más importante</span>
    </div>
    <h3 style={{ ...cardTitle, color: '#FBF6EE' }}>Cuándo empieza a entrar la plata</h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {ingresos.map((i) => (
        <div key={i.periodo} className="rounded-xl p-3.5" style={{ background: i.color }}>
          <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', marginBottom: '0.3rem' }}>{i.periodo}</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#FBF6EE', fontSize: '0.92rem', marginBottom: '0.3rem' }}>{i.t}</p>
          <p style={{ fontFamily: "'Josefin Sans', sans-serif", color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', lineHeight: 1.4 }}>{i.d}</p>
        </div>
      ))}
    </div>
    <p style={{ ...miniBody, marginTop: '1rem', fontStyle: 'italic' }}>
      Lo seguro es el orden: primero raíces y plátano, después fruta, después madera.
    </p>
  </div>
);

// ─── Slide 9: Abejas ──────────────────────────────────────────────────
const SlideAbejas = () => (
  <div>
    <span style={eyebrow}>Desde el año 2</span>
    <h3 style={cardTitle}>Panales de abejas en 4 puntos de la parcela</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div style={miniCard} className="flex gap-3 items-start">
        <FloatIcon><IconAbeja /></FloatIcon>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li><strong style={{ color: '#E0C98A' }}>Dónde:</strong> una en cada esquina de la parcela, a media sombra.</li>
          <li><strong style={{ color: '#E0C98A' }}>Cuándo:</strong> a partir del año 2, cuando ya hay flores todo el año.</li>
          <li><strong style={{ color: '#E0C98A' }}>Qué abeja:</strong> abejas nativas sin aguijón. No pican y son seguras cerca de la casa.</li>
        </ul>
      </div>
      <div style={{ ...miniCard, background: '#4A3410', borderColor: 'rgba(217,164,65,0.35)' }}>
        <p style={miniLabel}>Lo que aportan</p>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li>Mejor cuajado de flor en cítricos, guayaba y carambola.</li>
          <li>Miel: poco volumen, pero de precio alto.</li>
          <li>Señal viva de que la parcela está limpia de químicos.</li>
        </ul>
      </div>
    </div>
  </div>
);

// ─── Slide 10: Sí / No ───────────────────────────────────────────────
const SlideSiNo = () => (
  <div>
    <span style={eyebrow}>100% orgánico</span>
    <h3 style={cardTitle}>Qué sí se usa y qué no entra a la parcela</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl p-4" style={{ background: '#1F3D24', border: '1px solid rgba(143,174,78,0.3)' }}>
        <p style={{ ...miniLabel, color: '#A8C97F' }}>Sí</p>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li>Compost y humus de la misma finca</li>
          <li>Mulch de poda: la base de todo</li>
          <li>Roca fosfórica, ceniza y guano de isla</li>
          <li>Caldos minerales y trampas para plagas</li>
        </ul>
      </div>
      <div className="rounded-xl p-4" style={{ background: '#2A0F08', border: '1px solid rgba(200,85,30,0.3)' }}>
        <p style={{ ...miniLabel, color: '#D9662A' }}>No</p>
        <ul style={{ ...miniBody, paddingLeft: '1rem', listStyle: 'disc' }}>
          <li>Herbicidas de cualquier tipo</li>
          <li>Insecticidas y fungicidas químicos</li>
          <li>Urea y fertilizantes de síntesis</li>
          <li>Quema de rastrojo o de residuos de poda</li>
        </ul>
      </div>
    </div>
  </div>
);

// ─── Slide 11: Lo que gana el agricultor ────────────────────────────────
const ganancias = [
  { t: 'Ingreso todo el año', d: 'Ya no depende solo de la campaña de cacao: cada mes hay algo que vender.' },
  { t: 'Menos riesgo', d: 'Si el precio del cacao baja, las otras plantas sostienen la parcela.' },
  { t: 'Menos gasto', d: 'Sin agroquímicos y con el suelo cubierto, baja el jornal y el costo de abono.' },
  { t: 'Mejor grano', d: 'Sombra y suelo vivo dan mazorca más llena y fermentación más pareja.' },
  { t: 'Comida en casa', d: 'Plátano, yuca, papaya, cítricos y miel para la familia.' },
  { t: 'Patrimonio', d: 'Árboles maderables creciendo como ahorro familiar.', highlight: true },
];
const SlideGanancias = () => (
  <div>
    <span style={eyebrow}>Para cerrar</span>
    <h3 style={cardTitle}>Lo que gana el agricultor</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      {ganancias.map((g) => (
        <div key={g.t} style={g.highlight ? { ...miniCard, background: '#1F3D24', borderColor: 'rgba(143,174,78,0.4)' } : miniCard}>
          <p style={miniLabel}>{g.t}</p>
          <p style={miniBody}>{g.d}</p>
        </div>
      ))}
    </div>
  </div>
);

const slides = [
  SlideCambia, SlideReglas, SlideEstratos, SlideMapa, SlideBajos,
  SlideMedianos, SlideAltos, SlideIngresos, SlideAbejas, SlideSiNo, SlideGanancias,
];

// ─── Sección principal ───────────────────────────────────────────────
export default function SintropicoSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (idx: number) => {
    const next = (idx + slides.length) % slides.length;
    if (next === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(next); setAnimating(false); }, 220);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  const Slide = slides[current];

  return (
    <section id="sintropico" className="relative py-6 md:py-8 px-4 md:px-6" style={{ background: '#F5E6D0' }}>
      <style>{`
        @keyframes sintropico-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
      `}</style>
      <div className="max-w-5xl mx-auto">

        {/* Título */}
        <div className="text-center mb-10">
          <p style={{
            fontStyle: 'italic',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
            background: 'linear-gradient(90deg,#9E7D45,#C8A96E,#9E7D45)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}>
            Sistema sintrópico
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4.2vw, 2.7rem)',
            color: '#2A1D0E',
            lineHeight: 1.15,
            marginTop: '0.2rem',
          }}>
            en la parcela de cacao chuncho
          </p>
        </div>

        {/* Card grande horizontal */}
        <div
          className="rounded-3xl p-6 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(140,90,30,0.15)',
            boxShadow: '0 12px 40px rgba(90,60,20,0.08)',
            minHeight: '360px',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 50) goTo(current - 1);
            if (diff < -50) goTo(current + 1);
            touchStartX.current = null;
          }}
        >
          <Slide />
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => goTo(current - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
            style={{ border: '1px solid rgba(61,31,0,0.25)', background: 'rgba(255,255,255,0.5)', color: '#3D1F00' }}
            aria-label="Anterior"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>

          <span style={{ fontFamily: "'Josefin Sans', sans-serif", color: 'rgba(42,29,14,0.6)', fontSize: '0.8rem' }}>
            {current + 1} / {slides.length}
          </span>

          <button
            onClick={() => goTo(current + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
            style={{ border: '1px solid rgba(61,31,0,0.25)', background: 'rgba(255,255,255,0.5)', color: '#3D1F00' }}
            aria-label="Siguiente"
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a la parte ${i + 1}`}
              className="rounded-full transition-all cursor-pointer"
              style={{
                width: i === current ? '22px' : '7px',
                height: '7px',
                background: i === current ? '#B8722A' : 'rgba(61,31,0,0.15)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
