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
    <footer className="bg-coffee-950 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-gold/10">
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
            className="text-cream/65 text-sm leading-relaxed whitespace-pre-line"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            {t('footer_tagline')}
          </p>
        </div>
        <div>
          <h5
            className="text-cream/85 text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}
          >
            {t('footer_company')}
          </h5>
          <ul className="space-y-2">
            {companyLinks.map(i => (
              <li key={i.id}>
                <button
                  onClick={() => scrollTo(i.id)}
                  className="text-cream/60 hover:text-gold text-sm transition-colors cursor-pointer"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
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
          className="text-cream/40 text-xs"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          {t('footer_copyright')}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
