import { useState } from 'react';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import { useGalleryImages } from '../hooks/useGalleryImages';
import heroBg from '../assets/rooster.png';
import featuredImg from '../assets/country-rooster-healthy.jpg';

const CATEGORIES = ['All Photos', 'Roosters', 'Farm', 'Chicks', 'Farm Life', 'Facilities'];
const CATEGORY_LABELS: Record<string, string> = {
  Roosters: 'Breeding Birds',
  Farm: 'Farm Facilities',
  Chicks: 'Chicks & Eggs',
  'Farm Life': 'Development Stages',
  Facilities: 'Management Practices',
};

export default function Gallery() {
  const { t } = useLanguage();
  const { images, loading, error } = useGalleryImages(true);
  const [active, setActive] = useState('All Photos');

  const filtered = active === 'All Photos'
    ? images
    : images.filter((img) => img.category === active);

  return (
    <div>
      {/* HERO */}
      <section className="hero-section relative overflow-hidden min-h-[320px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Farm gallery"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 items-center gap-8">
          <div>
            <span className="section-label mb-3 block">{t('GAD Gallery')}</span>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-3">
              {t('Visual Record of')}<br />{t('Our Breeding Journey')}
            </h1>
            <p className="text-gray-600 text-base max-w-md leading-relaxed">
              {t('Explore selected breeding birds, chicks, eggs, facilities and development stages that show the work behind GAD GROWTHS.')}
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src={featuredImg}
              alt="Gallery rooster"
              className="w-full aspect-square max-w-[360px] ml-auto object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
            >
              {cat === 'All Photos' && '📷 '}
              {cat === 'Roosters' && '🐓 '}
              {cat === 'Farm' && '🏡 '}
              {cat === 'Chicks' && '🐣 '}
              {cat === 'Farm Life' && '👨‍🌾 '}
              {cat === 'Facilities' && '🏠 '}
              {t(CATEGORY_LABELS[cat] || cat)}
            </button>
          ))}
        </div>
      </div>

      {/* IMAGE GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {loading && <div className="text-center py-16 text-gray-400">{t('Loading gallery...')}</div>}
          {error && <div className="text-center py-16 text-red-600">{error}</div>}
          {!loading && !error && filtered.map((img) => (
            <div key={img.id} className="gallery-item rounded-xl overflow-hidden break-inside-avoid">
              <img
                src={img.image_url}
                alt={img.alt_text}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = heroBg;
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-full">
                  {t(img.category)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <span className="text-5xl block mb-3">📷</span>
            {t('No photos in this category yet.')}
          </div>
        )}
      </div>

      {/* CTA */}
      <CTASection
        icon="📸"
        title="Want to see the story behind each bird?"
        subtitle="Where possible, gallery records can connect selected birds with Bird ID and lineage information."
      />
    </div>
  );
}
