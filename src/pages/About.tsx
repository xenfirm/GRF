import { Heart, Leaf, Shield, Handshake } from 'lucide-react';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import aboutHeroImg from '../assets/grf-growths.jpeg';

export default function About() {
  const { t } = useLanguage();

  const STATS = [
    { icon: '🐓', value: 'GAD', label: t('Bird ID Vision') },
    { icon: '⭐', value: '100%', label: t('Quality Focus') },
    { icon: '🏡', value: 'Long Term', label: t('Heritage Program') },
  ];

  const FARM_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop&q=80', label: t('Spacious & Clean Environment') },
    { src: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=300&fit=crop&q=80', label: t('Free Range Farming') },
    { src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop&q=80', label: t('Natural & Nutritious Feed') },
    { src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&q=80', label: t('Safe & Hygienic Coops') },
  ];

  const COMMITMENT = [
    { icon: <Heart size={20} />, label: t('We put bird welfare before commercial value') },
    { icon: <Leaf size={20} />, label: t('We select with patience and observation') },
    { icon: <Shield size={20} />, label: t('We document reliable lineage information') },
    { icon: <Handshake size={20} />, label: t('We build trust through transparent records') },
  ];

  const FARM_VALUES = [
    { icon: '🌿', title: t('Selective Breeding'), desc: t('Purposeful selection over uncontrolled breeding') },
    { icon: '💪', title: t('Health & Vitality'), desc: t('Development, structure and body condition matter') },
    { icon: '🏆', title: t('Aseel Heritage'), desc: t('Preserving desirable Aseel characteristics') },
    { icon: '🤝', title: t('Traceability'), desc: t('Bird identity, parentage and records where available') },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-section py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label mb-3 block">{t('About GAD GROWTHS')}</span>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-5">
              {t('Premium Aseel Breeding')}<br />{t('& Heritage Program')}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('GAD GROWTHS was established with a vision to create a professional and trusted identity in Aseel breeding, built on patience, observation, selection and proper records.')}
            </p>
            {/* Value Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FARM_VALUES.map((v) => (
                <div key={v.title} className="text-center p-3 rounded-xl bg-primary-50">
                  <span className="text-2xl block mb-1">{v.icon}</span>
                  <div className="text-xs font-semibold text-primary leading-tight">{v.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src={aboutHeroImg}
              alt="Farm owner holding rooster"
              className="w-full h-[380px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* OUR STORY + STATS */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Story */}
          <div>
            <h2 className="section-title text-2xl font-bold mb-4">{t('Our Story')}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('Our breeding program combines respect for traditional Aseel characteristics with a systematic approach to selection and documentation. We observe birds through development and consider their overall quality before deciding their role in the program.')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('A selected bird is not treated simply as a male or female. Wherever records are available, it becomes part of a documented breeding history that helps us understand relationships between generations.')}
            </p>
            <blockquote className="border-l-4 border-primary pl-5 py-2 bg-primary-50 rounded-r-xl">
              <p className="text-primary font-medium italic text-sm">
                {t('"Know the Bird. Know the Line. Build the Legacy."')}
              </p>
              <footer className="text-gray-500 text-xs mt-1">{t('GAD GROWTHS - Built for Victory')}</footer>
            </blockquote>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-4">
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="card p-5 text-center">
                  <span className="text-3xl block mb-1">{s.icon}</span>
                  <div className="font-display text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Tamil slogan */}
            <div className="card p-4 text-center bg-primary text-white rounded-2xl">
              <p className="font-medium text-sm">Quality. Lineage. Preservation. Progress.</p>
              <p className="text-primary-200 text-xs mt-1">Built for Victory</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR FARM GALLERY */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="section-title text-2xl font-bold mb-6">{t('Our Farm')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FARM_IMAGES.map((img) => (
            <div key={img.label} className="gallery-item aspect-square">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="py-12 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="section-title text-2xl font-bold mb-2">{t('Our Commitment')}</h2>
            <p className="text-gray-600 text-sm max-w-xl">
              {t('We are committed to quality over quantity, responsible bird welfare, transparent information and long-term breed preservation.')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COMMITMENT.map((c) => (
              <div key={c.label} className="card p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary-50 text-primary rounded-full flex items-center justify-center">
                  {c.icon}
                </div>
                <p className="text-sm font-medium text-darktext leading-snug">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to understand our breeding program?"
        subtitle="Connect with GAD GROWTHS to learn about selected Aseel lines, availability and records."
      />
    </div>
  );
}
