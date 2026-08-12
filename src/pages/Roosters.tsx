import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, CalendarDays } from 'lucide-react';
import RoosterCard from '../components/RoosterCard';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import { useBirds } from '../hooks/useBirds';

import heroBg from '../assets/poultry-farm-clean-environment.jpg';
import featuredImg from '../assets/premium-country-chicken.jpg';

export default function Roosters() {
  const { t } = useLanguage();
  const { birds, loading, error } = useBirds(false);
  const [breedFilter, setBreedFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [search, setSearch] = useState('');
  const [breedOpen, setBreedOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);

  const breeds = ['All', ...Array.from(new Set(birds.map((bird) => bird.breed))).filter(Boolean)];
  const ages = ['All Ages', ...Array.from(new Set(birds.map((bird) => bird.age))).filter(Boolean)];

  const filtered = birds.filter((r) => {
    const matchBreed = breedFilter === 'All' || r.breed === breedFilter;
    const matchAge = ageFilter === 'All Ages' || r.age === ageFilter;
    const term = search.toLowerCase();
    const matchSearch = [r.name_en, r.name_ta, r.breed, r.description].some((value) => value.toLowerCase().includes(term));
    return matchBreed && matchAge && matchSearch;
  });

  const AVAILABILITY_NOTES = [
    {
      title: 'Breeding Males & Females',
      text: 'Selected Aseel breeding males and females may be offered only when they fit current program decisions and availability.',
    },
    {
      title: 'Hatching Eggs & Chicks',
      text: 'For eggs and chicks, information about the relevant breeding pair or line can be shared where records are available.',
    },
    {
      title: 'Bird ID & Records',
      text: 'Where appropriate, available birds can include GAD Bird ID, breed or line, age, generation, parentage and relevant health information.',
    },
  ];

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
              <span className="text-darktext font-medium">{t('Aseel Lines')}</span>
            </div>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-3">{t('Available Birds')}</h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-md">
              {t('GAD GROWTHS may offer selected Aseel breeding males, females, hatching eggs and chicks depending on breeding plans and availability.')}
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
                <SlidersHorizontal size={15} /> {breedFilter === 'All' ? t('Filter by Line') : t(breedFilter)}
              </span>
              <span className="ml-2 text-gray-400">▾</span>
            </button>
            {breedOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 min-w-[180px] py-1">
                {breeds.map((b) => (
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
                {ages.map((a) => (
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
              placeholder={t('Search birds, lines or records...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* ROOSTERS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {loading ? (
          <div className="text-center py-16 text-gray-400">{t('Loading roosters...')}</div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <span className="text-5xl block mb-3">🐓</span>
            {t('No roosters found. Try a different filter.')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((r) => (
              <RoosterCard
                key={r.id}
                name={r.name_en}
                age={r.age}
                price={r.price_text}
                priceNum={r.price}
                badge={r.badge}
                description={r.description}
                image={r.image_url || ''}
                isAvailable={r.is_available}
              />
            ))}
          </div>
        )}
      </div>

      {/* AVAILABILITY DETAILS */}
      <section className="bg-cream py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <span className="section-label mb-3 block">Availability Approach</span>
            <h2 className="section-title text-3xl font-bold mb-4">Connecting the Right Bird with the Right Breeder</h2>
            <p className="text-gray-600 leading-relaxed">
              Our priority is the development of the GAD GROWTHS breeding program, so not every bird is automatically offered for sale. Selected birds may be retained when they have importance for future generations. Availability can change as birds are selected, reserved, retained or sold.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {AVAILABILITY_NOTES.map((note) => (
              <div key={note.title} className="card p-6">
                <h3 className="font-display text-xl font-bold text-darktext mb-3">{note.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Need current availability or lineage details?"
        subtitle="Contact us directly for selected birds, hatching eggs, chicks, pricing and transportation information."
      />
    </div>
  );
}
