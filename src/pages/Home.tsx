import { Link } from 'react-router-dom';
import { Phone, Leaf, Shield, Award, Users, Star, ChevronRight } from 'lucide-react';
import { CALL_LINK, WHATSAPP_LINK, LOCATION } from '../constants';
import RoosterCard from '../components/RoosterCard';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import { useBirds } from '../hooks/useBirds';
import roosterHeroBackground from '../assets/rooster.png';
import roosterHeroOverlay from '../assets/country-rooster-healthy.jpg';

export default function Home() {
  const { t } = useLanguage();
  const { birds, loading: birdsLoading, error: birdsError } = useBirds(true);
  const featuredBirds = birds.filter((bird) => bird.is_featured).slice(0, 4);

  const WHY_CHOOSE = [
    { icon: <Leaf size={22} />, title: t('Selective Breeding'), desc: t('Every selected bird is evaluated for structure, vitality, development and breeding purpose.') },
    { icon: <Shield size={22} />, title: t('Responsible Bird Welfare'), desc: t('Quality begins with suitable nutrition, clean water, hygiene, observation and responsible management.') },
    { icon: <Award size={22} />, title: t('Lineage Documentation'), desc: t('Where reliable records are available, we preserve parentage, generation and breeding history.') },
    { icon: <Users size={22} />, title: t('Heritage Preservation'), desc: t('Our long-term goal is to protect desirable Aseel characteristics across future generations.') },
  ];

  const TESTIMONIALS = [
    { name: t('Select'), location: t('Breeding Stock'), text: t('We begin by identifying birds with the right structure, health, development and available lineage for each breeding objective.'), rating: 5 },
    { name: t('Document'), location: t('Bird ID & Lineage'), text: t('Selected birds can be connected with photographs, parentage, generation, breeding status and future offspring records.'), rating: 5 },
    { name: t('Improve'), location: t('Future Generations'), text: t('Every generation becomes part of a continuing breeding history designed for quality, consistency and preservation.'), rating: 5 },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-section min-h-[480px] md:min-h-[520px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={roosterHeroBackground}
            alt="Farm background"
            className="w-full h-full object-cover object-center opacity-25"
          />
        </div>
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="section-label mb-3 block">{t('Premium Aseel Breeding & Heritage Program')}</span>
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary-800">
              {t('Know the Bird.')}<br />
              <span className="text-primary">{t('Know the Line.')}</span><br />
              {t('Build the Legacy.')}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              {t('GAD GROWTHS is a premium Aseel breeding and heritage program dedicated to selective breeding, lineage documentation, responsible welfare and long-term breed preservation.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={CALL_LINK} className="btn-primary text-base px-6 py-3">
                <Phone size={18} /> {t('Call Now')}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline text-base px-6 py-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {t('WhatsApp Us')}
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <img
              src={roosterHeroOverlay}
              alt="Premium Rooster"
              className="w-full max-w-[420px] aspect-square object-cover rounded-2xl shadow-2xl ml-auto"
            />
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-label mb-3 block">{t('About GAD GROWTHS')}</span>
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-5">
              {t('Quality. Lineage.')}<br />{t('Preservation. Progress.')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('GAD GROWTHS is built around the belief that every exceptional Aseel bird has a story, a purpose and a place in the future of its bloodline.')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('Our focus is not simply on raising or selling birds, but on carefully selecting breeding stock, maintaining available lineage information and improving across generations.')}
            </p>
            <Link to="/about" className="btn-primary inline-flex">
              {t('Know More')} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <img
              src={roosterHeroBackground}
              alt="Farm owner with rooster"
              className="w-full h-80 object-contain rounded-2xl shadow-card"
            />
            <div className="absolute -bottom-5 -left-5 bg-primary text-white rounded-2xl px-5 py-4 shadow-lg hidden sm:block">
              <div className="text-3xl font-bold font-display">GAD</div>
              <div className="text-xs text-primary-100 font-medium">Built for Victory</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROOSTERS */}
      <section className="bg-cream py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="section-label mb-2 block">{t('Available Birds')}</span>
              <h2 className="section-title text-3xl font-bold">{t('Selected Aseel Lines')}</h2>
            </div>
            <Link to="/roosters" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
              {t('View Lines')} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {birdsLoading && <div className="col-span-full text-center text-sm text-gray-500 py-8">{t('Loading roosters...')}</div>}
            {birdsError && <div className="col-span-full text-center text-sm text-red-600 py-8">{birdsError}</div>}
            {!birdsLoading && !birdsError && featuredBirds.map((r) => (
              <RoosterCard
                key={r.id}
                name={r.name_en}
                nameTa={r.name_ta}
                age={r.age}
                price={r.price_text}
                priceNum={r.price}
                badge={r.badge}
                description={r.description}
                image={r.image_url || ''}
                isAvailable={r.is_available}
              />
            ))}
            {!birdsLoading && !birdsError && featuredBirds.length === 0 && <div className="col-span-full text-center text-sm text-gray-500 py-8">{t('No roosters found. Try a different filter.')}</div>}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label mb-2 block">{t('Why GAD')}</span>
          <h2 className="section-title text-3xl font-bold">{t('Why Choose GAD GROWTHS?')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="card p-6 text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-darktext mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BREEDING PRINCIPLES */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-primary-200 font-semibold text-sm uppercase tracking-widest mb-2 block">{t('Breeding Philosophy')}</span>
            <h2 className="font-display text-white text-3xl font-bold">{t('Select - Pair - Hatch - Identify - Monitor - Evaluate - Improve')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-primary-100 text-sm leading-relaxed mb-4">{t.text}</p>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-primary-300 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={t('Interested in selected Aseel breeding stock?')}
        subtitle={t('Contact GAD GROWTHS to check availability, lineage details and breeding plans.')}
      />
    </div>
  );
}
