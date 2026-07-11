import { useTranslation } from 'react-i18next';

const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }} className="pt-16 pb-8 px-6">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/Principal/images/products-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.65 }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(26,10,4,0.55) 0%, rgba(42,18,6,0.45) 100%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>

        {/* LEFT: brand */}
        <div>
          <div className="mb-3">
            <span style={{ display: 'block', fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.25em', color: '#FFD700', textTransform: 'uppercase', lineHeight: 1 }}>PΛCHΛ</span>
            <span style={{ display: 'block', fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: 'clamp(0.7rem, 1.4vw, 1rem)', letterSpacing: '0.55em', color: '#FFD700', textTransform: 'uppercase', marginTop: '0.1em' }}>ESPERANZA</span>
          </div>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, color: 'rgba(245,230,211,0.8)' }}
          >
            {t('footer_tagline')}
          </p>
        </div>

        {/* RIGHT: contacto + direcciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Contacto & redes */}
          <div>
            <h5 className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 800, color: '#FFD700' }}>
              Contacto
            </h5>
            <ul className="space-y-2 text-sm" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, color: 'rgba(245,230,211,0.75)' }}>
              <li>
                <a href="mailto:info@compartotuesperanza.com" className="hover:text-gold transition-colors">
                  info@compartotuesperanza.com
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Direcciones */}
          <div>
            <h5 className="text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 800, color: '#FFD700' }}>
              Nuestras sedes
            </h5>
            <div className="space-y-4 text-sm" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, color: 'rgba(245,230,211,0.75)' }}>
              <div>
                <p className="text-gold/80 text-xs uppercase tracking-wider mb-1">🇵🇪 Perú</p>
                <p>Cusco, Perú</p>
              </div>
              <div>
                <p className="text-gold/80 text-xs uppercase tracking-wider mb-1">🇨🇿 República Checa</p>
                <p>Praga, República Checa</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto flex justify-center items-center pt-8">
        <p className="text-xs" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 600, color: '#FFD700' }}>
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
