import { useState, useEffect, useRef } from 'react';

interface MapPin {
  id: string;
  region: string;
  name: string;
  altitude: string;
  story: string;
  storyTitle: string;
  image: string;
  familyImage: string;
  familyCaption: string;
  stat: string;
  statLabel: string;
  x: number;
  y: number;
}

const mapPins: MapPin[] = [
  {
    id: 'segundo',
    region: 'Cusco',
    name: 'Segundo Herrera',
    altitude: '1,400 m.s.n.m',
    storyTitle: 'El cacao Chuncho Orgánico de Segundo',
    story: "Productor de cacao Chuncho Orgánico en Cusco, en el corazón del Cusco. Apostó por mantener la variedad nativa cuando todos cambiaban a híbridos.",
    image: '/Home/images/farmer4.jpeg',
    familyImage: '/Home/images/farmer5.jpg',
    familyCaption: "Cacao Chuncho Orgánico con nombre y origen",
    stat: '100%', statLabel: 'cacao Chuncho Orgánico nativo',
    x: 52, y: 68,
  },
];

const MapWithPins = ({ activeName, hintText }: { activeName?: string; hintText?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Sync with external prop activeName
  useEffect(() => {
    if (activeName) {
      const pin = mapPins.find(p => p.name === activeName);
      if (pin) setActive(pin.id);
    }
  }, [activeName]);
  const [cardTab, setCardTab] = useState<'producer' | 'family'>('producer');
  const containerRef = useRef<HTMLDivElement>(null);

  const activePin = mapPins.find(p => p.id === (active ?? hovered));

  const handlePin = (id: string) => {
    setActive(prev => {
      if (prev === id) return null;
      setCardTab('producer');
      return id;
    });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <div className="relative w-full select-none" style={{ height: '580px' }}>
        <img
          src="/Home/images/mapa.png"
          alt="Mapa del Perú"
          className="w-full h-full object-contain object-center"
          style={{ filter: 'drop-shadow(0 0 40px rgba(201,169,110,0.15))' }}
          draggable={false}
        />

        {mapPins.map((pin) => {
          const isActive = active === pin.id;
          const isHov = hovered === pin.id;
          return (
            <button
              key={pin.id}
              className="absolute z-20 cursor-pointer group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => handlePin(pin.id)}
              onMouseEnter={() => setHovered(pin.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: 'rgba(201,169,110,0.35)', animationDuration: '2s', opacity: isActive || isHov ? 1 : 0.5 }}
              />
              <span
                className="relative flex items-center justify-center rounded-full border-2 transition-all duration-300"
                style={{
                  width: isActive ? '18px' : '13px',
                  height: isActive ? '18px' : '13px',
                  background: isActive ? '#c9a96e' : 'rgba(201,169,110,0.7)',
                  borderColor: isActive ? '#fff' : 'rgba(201,169,110,0.9)',
                  boxShadow: isActive ? '0 0 12px rgba(201,169,110,0.8)' : 'none',
                }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none"
                style={{
                  bottom: isActive ? '-22px' : '-18px',
                  color: isActive ? '#c9a96e' : 'rgba(255,245,230,0.6)',
                  fontSize: isActive ? '9px' : '8px',
                }}
              >
                {pin.region.split('·')[0].trim()}
              </span>
            </button>
          );
        })}

        {/* Active pin card — two tabs */}
        {activePin && (
          <div
            key={activePin.id}
            className="absolute z-30 rounded-2xl overflow-hidden"
            style={{
              width: '180px',
              left: activePin.x > 55 ? `${activePin.x - 2}%` : `${activePin.x + 3}%`,
              top: activePin.y > 60 ? `${activePin.y - 10}%` : `${activePin.y + 3}%`,
              transform: activePin.x > 55 ? 'translateX(-100%)' : 'translateX(0)',
              animation: 'cardIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards',
              background: 'rgba(14,8,3,0.97)',
              border: '1px solid rgba(201,169,110,0.3)',
              boxShadow: '0 20px 56px rgba(0,0,0,0.8)',
            }}
          >
            {/* Photo */}
            <div className="relative w-full" style={{ height: '148px' }}>
              <img
                src={cardTab === 'producer' ? activePin.image : activePin.familyImage}
                alt={cardTab === 'producer' ? activePin.name : 'Familia'}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Tag top-left */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[8px] font-sans font-semibold tracking-widest uppercase"
                style={{ background: 'rgba(194,98,42,0.85)', color: '#fff8f0' }}>
                {cardTab === 'producer' ? 'Productor' : 'Su familia'}
              </div>

              {/* Close */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-cream/70 hover:text-cream cursor-pointer transition-colors"
              >
                <i className="ri-close-line" style={{ fontSize: '10px' }} />
              </button>

              {/* Story title over photo bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                <p className="font-serif text-cream text-[11px] leading-tight font-semibold">
                  {activePin.storyTitle}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="px-3 pt-2 pb-1">
              <p className="text-gold font-sans text-[8px] tracking-widest uppercase mb-0.5 truncate">{activePin.region}</p>
              <h4 className="font-serif text-cream text-sm leading-tight">{activePin.name}</h4>
              {cardTab === 'family' && (
                <p className="text-cream/55 font-sans text-[9px] leading-snug mt-1.5 italic">
                  {activePin.familyCaption}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-t mx-3 mb-2.5 mt-2" style={{ borderColor: 'rgba(201,169,110,0.15)' }}>
              <button
                onClick={() => setCardTab('producer')}
                className="flex-1 py-1.5 font-sans text-[9px] tracking-widest uppercase transition-colors cursor-pointer"
                style={{ color: cardTab === 'producer' ? '#c9a96e' : 'rgba(255,245,230,0.35)', borderBottom: cardTab === 'producer' ? '1.5px solid #c9a96e' : '1.5px solid transparent' }}
              >
                Productor
              </button>
              <button
                onClick={() => setCardTab('family')}
                className="flex-1 py-1.5 font-sans text-[9px] tracking-widest uppercase transition-colors cursor-pointer"
                style={{ color: cardTab === 'family' ? '#c9a96e' : 'rgba(255,245,230,0.35)', borderBottom: cardTab === 'family' ? '1.5px solid #c9a96e' : '1.5px solid transparent' }}
              >
                Su familia
              </button>
            </div>
          </div>
        )}
      </div>



      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default MapWithPins;
