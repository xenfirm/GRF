import { Heart, Leaf, Shield, Handshake } from 'lucide-react';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import aboutHeroImg from '../assets/grf-growths.jpeg';

export default function About() {
  const { t } = useLanguage();

  const STATS = [
    { icon: '🐓', value: '500+', label: t('Happy Customers') },
    { icon: '⭐', value: '10+', label: t('Years of Experience') },
    { icon: '🏡', value: '100%', label: t('Natural Care') },
  ];

  const FARM_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop&q=80', label: t('Spacious & Clean Environment') },
    { src: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=300&fit=crop&q=80', label: t('Free Range Farming') },
    { src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop&q=80', label: t('Natural & Nutritious Feed') },
    { src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&q=80', label: t('Safe & Hygienic Coops') },
  ];

  const COMMITMENT = [
    { icon: <Heart size={20} />, label: t('We care for our birds') },
    { icon: <Leaf size={20} />, label: t('We follow natural & healthy methods') },
    { icon: <Shield size={20} />, label: t('We ensure quality in every bird') },
    { icon: <Handshake size={20} />, label: t('We build trust with every customer') },
  ];

  const FARM_VALUES = [
    { icon: '🌿', title: t('Natural Feeding'), desc: t('Only organic feed, no growth hormones') },
    { icon: '💪', title: t('Healthy & Strong Birds'), desc: t('Regular vet checks and vaccinations') },
    { icon: '🏆', title: t('Quality Breeds'), desc: t('Pure breeds – Aseel, Nattu, Kili & more') },
    { icon: '🤝', title: t('Trusted by Customers'), desc: t('500+ customers across Tamil Nadu') },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-section py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label mb-3 block">{t('About Us')}</span>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-5">
              {t('Our Farm. Our Passion.')}<br />{t('Your Trust.')}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('GRF Growths is a dedicated farm focused on raising healthy, strong and pure breed roosters. With years of experience and proper care, we provide the best quality birds to farmers and rooster lovers.')}
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
              {t('Our journey started with a passion for poultry farming and a dream to produce top quality roosters. We believe that good genetics, proper nutrition and hygiene are the key to raising strong birds.')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('Today, our farm is trusted by many farmers and customers who value our quality, honesty and service.')}
            </p>
            <blockquote className="border-l-4 border-primary pl-5 py-2 bg-primary-50 rounded-r-xl">
              <p className="text-primary font-medium italic text-sm">
                {t('"We don\'t just raise roosters, we raise trust and long-term relationships."')}
              </p>
              <footer className="text-gray-500 text-xs mt-1">{t('– Founder, GRF Growths')}</footer>
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
              <p className="font-medium text-sm">"ஆரோக்கியமான கோழி – நம்பகமான பண்ணை"</p>
              <p className="text-primary-200 text-xs mt-1">Healthy Birds – Trusted Farm</p>
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
              {t('We are committed to providing healthy roosters with natural care and ethical farming practices. Your satisfaction and the birds\' well-being are always our top priority.')}
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
        title="Want to visit our farm?"
        subtitle="Come meet our birds and see the farm in person!"
      />
    </div>
  );
}
