import { useTranslation } from 'react-i18next';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const SiteFooter = () => {
  const { t } = useTranslation();

  const companyLinks = [
    { l: t('footer_philosophy'), id: 'manifesto' },
    { l: t('footer_farmers'), id: 'farmers' },
    { l: t('footer_process'), id: 'process' },
  ];

  return (
    <footer style={{ background: 'linear-gradient(160deg, #2C1A06 0%, #3D2308 40%, #2A1504 100%)' }} className="pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div>
          <div
            className="font-serif uppercase mb-3"
            style={{
              color: '#5C1422',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
              letterSpacing: '0.04em',
              WebkitTextStroke: '0.4px #5C1422',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
            }}
          >
            Comparto tu Esperanza
          </div>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'rgba(245,230,211,0.8)' }}
          >
            {t('footer_tagline')}
          </p>
        </div>
        <div>
          <h5
            className="text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: 'rgba(201,168,76,0.9)' }}
          >
            {t('footer_company')}
          </h5>
          <ul className="space-y-2">
            {companyLinks.map(i => (
              <li key={i.id}>
                <button
                  onClick={() => scrollTo(i.id)}
                  className="hover:text-gold text-sm transition-colors cursor-pointer"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'rgba(245,230,211,0.75)' }}
                >
                  {i.l}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex justify-center items-center pt-8">
        <p
          className="text-xs"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'rgba(201,168,76,0.45)' }}
        >
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
