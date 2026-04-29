import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Languages } from 'lucide-react';
import { NAV_LINKS, CALL_LINK, PHONE, WHATSAPP_LINK, LOCATION } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0b3d2c] text-white text-[13px] py-2.5 px-4 hidden lg:block font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {LOCATION}
          </div>
          <div className="flex items-center gap-4 text-gray-100">
            <span>{t('Healthy Birds')}</span>
            <span className="text-[10px]">●</span>
            <span>{t('Natural Care')}</span>
            <span className="text-[10px]">●</span>
            <span>{t('Strong Breeds')}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={CALL_LINK} className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <Phone size={14} fill="currentColor" className="text-white" /> {PHONE}
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-300 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {t('WhatsApp')}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="GRF Growths Logo" className="w-10 h-10 object-contain shrink-0 drop-shadow-sm" />
            <div className="leading-tight">
              <div className="font-display font-bold text-primary text-lg leading-none">GRF</div>
              <div className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Growths</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link pb-1 ${location.pathname === link.to ? 'active' : ''}`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* CTA & Language Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-primary-200 hover:bg-primary-50 transition-colors"
              title="Toggle English/Tamil"
            >
              <Languages size={16} />
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </button>
            <a href={CALL_LINK} className="btn-primary hidden lg:inline-flex text-sm px-4 py-2.5">
              <Phone size={15} />
              {t('Call Now')}
            </a>
            <button
              className="md:hidden text-darktext p-1 ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 font-medium border-b border-gray-50 last:border-0 ${
                  location.pathname === link.to ? 'text-primary' : 'text-darktext'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
            <a href={CALL_LINK} className="btn-primary w-full justify-center mt-4">
              <Phone size={16} /> {t('Call Now')}
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
