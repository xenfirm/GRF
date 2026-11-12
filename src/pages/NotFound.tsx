import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { NAV_LINKS, WHATSAPP_LINK } from '../constants';

export default function NotFound() {
  const { t } = useLanguage();

  // Tell search engines not to index this URL, and give the tab a clear title.
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    const timer = window.setTimeout(() => { document.title = 'Page not found | GAD GROWTHS'; }, 0);
    return () => {
      window.clearTimeout(timer);
      meta.remove();
      document.title = previousTitle;
    };
  }, []);

  return (
    <section className="hero-section px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-label mb-3 block">404</span>
        <h1 className="section-title mb-4 text-4xl font-bold text-primary-800 md:text-5xl">{t('Page not found')}</h1>
        <p className="mb-8 text-gray-600">
          {t("The page you're looking for doesn't exist or may have moved.")}
        </p>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">{t('Back to Home')}</Link>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline">{t('Chat on WhatsApp')}</a>
        </div>
        <nav aria-label="Site pages" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="text-primary hover:underline">{t(link.label)}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
