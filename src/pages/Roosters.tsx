import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, CalendarDays } from 'lucide-react';
import { ROOSTER_BREEDS } from '../constants';
import RoosterCard from '../components/RoosterCard';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';

import heroBg from '../assets/poultry-farm-clean-environment.jpg';
import featuredImg from '../assets/premium-country-chicken.jpg';

const BREEDS = ['All', 'Country White', 'Aseel', 'Kili Seval', 'Nattu Seval', 'Kadaknath', 'Giriraja'];
const AGES = ['All Ages', '5–7 Months', '6–8 Months', '7–10 Months', '8–12 Months'];

export default function Roosters() {
  const { t } = useLanguage();
  const [breedFilter, setBreedFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [search, setSearch] = useState('');
  const [breedOpen, setBreedOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);

  const filtered = ROOSTER_BREEDS.filter((r) => {
    const matchBreed = breedFilter === 'All' || r.breed === breedFilter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchBreed && matchSearch;
  });

  return (
    <div>
      {/* HERO */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Roosters"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 items-center gap-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-primary transition-colors">{t('Home')}</Link>
              <span>›</span>
              <span className="text-darktext font-medium">{t('Roosters')}</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-3">{t('Our Roosters')}</h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              {t('Explore our premium quality roosters. Healthy, strong, and raised with natural care.')}
            </p>
          </div>
          <div className="hidden md:flex justify-end">
            <img
              src={featuredImg}
              alt="Featured rooster"
              className="w-full max-w-[420px] h-auto rounded-2xl shadow-xl ml-auto"
            />
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Breed Filter */}
          <div className="relative">
            <button
              onClick={() => { setBreedOpen(!breedOpen); setAgeOpen(false); }}
              className="filter-btn gap-2 pr-6 min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={15} /> {breedFilter === 'All' ? t('Filter by Breed') : t(breedFilter)}
              </span>
              <span className="ml-2 text-gray-400">▾</span>
            </button>
            {breedOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 min-w-[180px] py-1">
                {BREEDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => { setBreedFilter(b); setBreedOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary transition-colors ${breedFilter === b ? 'text-primary font-semibold' : ''}`}
                  >
                    {t(b)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Age Filter */}
          <div className="relative">
            <button
              onClick={() => { setAgeOpen(!ageOpen); setBreedOpen(false); }}
              className="filter-btn gap-2 pr-6 min-w-[160px] justify-between"
            >
              <span className="flex items-center gap-2">
                <CalendarDays size={15} /> {t(ageFilter)}
              </span>
              <span className="ml-2 text-gray-400">▾</span>
            </button>
            {ageOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 min-w-[180px] py-1">
                {AGES.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAgeFilter(a); setAgeOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary transition-colors ${ageFilter === a ? 'text-primary font-semibold' : ''}`}
                  >
                    {t(a)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md ml-auto">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('Search roosters...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* ROOSTERS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="text-5xl block mb-3">🐓</span>
            {t('No roosters found. Try a different filter.')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <RoosterCard key={r.id} {...r} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <CTASection
        title="Looking for the Best Roosters?"
        subtitle="Contact us today to check availability and visit our farm."
      />
    </div>
  );
}
