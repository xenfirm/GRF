import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TRANSLATIONS } from '../translations';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to load from localStorage if previously set
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('grf_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('grf_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = (key: string) => {
    if (language === 'en') return key;
    if (TRANSLATIONS[key] && TRANSLATIONS[key].ta) {
      return TRANSLATIONS[key].ta;
    }
    // Simple fallback logic to replace partial matches (for compound strings if needed)
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
