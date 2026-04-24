import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Languages } from 'lucide-react';
import { NAV_LINKS, CALL_LINK, PHONE, WHATSAPP_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';

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
      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m13.5 17.5 2.5 3" />
              <path d="m18.5 17.5-2.5 3" />
              <path d="M12 20.5v-3" />
              <path d="M16 8c-1.5-1.5-3.5-2.5-6-2.5-3 0-5 2-5 5s2 5 5 5c1 0 2-.5 3-1.5" />
              <path d="M6 14.5a3 3 0 0 0 4 0" />
              <path d="M9.5 3a2 2 0 1 1 3.5 1.5" />
              <path d="m14 12 3 5" />
              <path d="M17 17a3 3 0 1 0 3-3" />
            </svg>
            <div className="leading-none">
              <div className="font-sans font-bold text-primary text-xl tracking-wide">GURU</div>
              <div className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase mt-0.5">Rooster Farm</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold h-16 flex items-center border-b-2 transition-colors ${
                  location.pathname === link.to 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-darktext hover:text-primary'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* CTA & Language Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary px-3 py-2 rounded-full border border-primary-200 hover:bg-primary-50 transition-colors"
              title="Toggle English/Tamil"
            >
              <Languages size={16} />
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </button>
            <a href={CALL_LINK} className="btn-primary hidden lg:inline-flex text-sm px-5 py-2.5 rounded-full">
              <Phone size={15} className="mr-1 fill-white" />
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
            <div className="flex justify-between items-center py-2 mb-2 border-b border-gray-50">
              <span className="text-sm text-gray-500 font-medium">Language</span>
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-semibold text-primary px-3 py-1.5 rounded-full border border-primary-200 bg-primary-50"
              >
                <Languages size={16} />
                {language === 'en' ? 'Switch to Tamil' : 'Switch to English'}
              </button>
            </div>
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
