import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import { useWebsiteContentSections } from '../hooks/useWebsiteContentSections';
import aboutHeroImg from '../assets/grf-growths.jpeg';

export default function About() {
  const { t } = useLanguage();
  const { sections: contentSections, loading: contentLoading, error: contentError } = useWebsiteContentSections(true);

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

  const FARM_VALUES = [
    { icon: '🌿', title: t('Selective Breeding'), desc: t('Purposeful selection over uncontrolled breeding') },
    { icon: '💪', title: t('Health & Vitality'), desc: t('Development, structure and body condition matter') },
    { icon: '🏆', title: t('Aseel Heritage'), desc: t('Preserving desirable Aseel characteristics') },
    { icon: '🤝', title: t('Traceability'), desc: t('Bird identity, parentage and records where available') },
  ];

  const sortedContentSections = [...contentSections].sort((a, b) => a.display_order - b.display_order);
  const featuredContentSection = sortedContentSections[0];

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

      {/* FEATURED STORY + STATS */}
      <section id={featuredContentSection?.section_key || 'our-story'} className="scroll-mt-28 py-12 px-4 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Story */}
          <div>
            <h2 className="section-title text-2xl font-bold mb-4">{t(featuredContentSection?.title || 'Our Story')}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t(featuredContentSection?.body || 'Our breeding program combines respect for traditional Aseel characteristics with a systematic approach to selection and documentation.')}
            </p>
            <blockquote className="border-l-4 border-primary pl-5 py-2 bg-primary-50 rounded-r-xl">
              <p className="text-primary font-medium italic text-sm">
                {t(featuredContentSection?.highlight || '"Know the Bird. Know the Line. Build the Legacy."')}
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

      {/* COMPLETE WEBSITE CONTENT TOPICS */}
      <section className="py-14 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-9">
            <span className="section-label mb-3 block">Complete Program Overview</span>
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">
              Every Topic Behind the GAD GROWTHS Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              GAD GROWTHS is more than an Aseel farm. It is a long-term breeding and heritage program built around quality, lineage documentation, transparency, responsible management and continuous improvement across generations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contentLoading && <div className="col-span-full text-center text-sm text-gray-500 py-8">Loading website content...</div>}
            {contentError && <div className="col-span-full text-center text-sm text-red-600 py-8">{contentError}</div>}
            {!contentLoading && !contentError && sortedContentSections.map((topic) => (
              <article id={topic.section_key} key={topic.id} className="card scroll-mt-28 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-display text-3xl font-bold text-primary-200 leading-none">{String(topic.display_order).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-darktext">{topic.title}</h3>
                    <div className="w-14 h-1 bg-primary rounded-full mt-2" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{topic.body}</p>
                {topic.highlight && (
                  <p className="text-primary-800 text-sm leading-relaxed font-medium bg-primary-50 rounded-xl p-4">
                    {topic.highlight}
                  </p>
                )}
              </article>
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
