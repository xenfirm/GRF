import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, ShieldCheck } from 'lucide-react';
import { PHONE, WHATSAPP_LINK, CALL_LINK, EMAIL, ADDRESS, HOURS, MAPS_LINK, LOCATION } from '../constants';
import CTASection from '../components/CTASection';
import { useLanguage } from '../context/LanguageContext';
import roosterImg from '../assets/rooster.png';

export default function Contact() {
  const { t } = useLanguage();

  const CONTACT_INFO = [
  {
    icon: <Phone size={20} />,
    label: t('Phone'),
    value: PHONE,
    sub: t('Call us anytime'),
    href: CALL_LINK,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    label: t('WhatsApp'),
    value: PHONE,
    sub: t('Quick replies on WhatsApp'),
    href: WHATSAPP_LINK,
  },
  {
    icon: <MapPin size={20} />,
    label: t('Location'),
    value: ADDRESS,
    sub: t('Visit our farm'),
    href: MAPS_LINK,
  },
  {
    icon: <Mail size={20} />,
    label: t('Email'),
    value: EMAIL,
    sub: t("We'll reply as soon as possible"),
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <Clock size={20} />,
    label: t('Working Hours'),
    value: HOURS,
    sub: t('Open all days'),
    href: null,
  },
];

  const [form, setForm] = useState({ name: '', phone: '', requirement: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert(t('Please enter your Name and Phone Number to continue.'));
      return;
    }

    const message = `Hi, I want to buy from GRF Growths.

Name: ${form.name}
Phone: ${form.phone}
Requirement: ${form.requirement || 'Not specified'}`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/919952908818?text=${encodedMsg}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', requirement: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      {/* HERO */}
      <section className="hero-section relative overflow-hidden min-h-[280px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={roosterImg}
            alt="Contact"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="hero-overlay absolute inset-0 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-2 items-center gap-8">
          <div>
            <span className="section-label mb-3 block">{t('Contact Us')}</span>
            <h1 className="section-title text-4xl md:text-5xl font-bold text-primary-800 mb-3">
              {t("We're Here to Help You!")}
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              {t('Have questions about our roosters or want to visit our farm?')}<br />
              {t('Get in touch with us anytime.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={CALL_LINK} className="btn-primary text-sm px-5 py-2.5">
                <Phone size={16} /> {t('Call Now')}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-5 py-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {t('WhatsApp Us')}
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src={roosterImg}
              alt="Rooster"
              className="w-full max-w-[380px] h-auto object-contain rounded-2xl shadow-xl ml-auto"
            />
          </div>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="font-bold text-xl text-darktext mb-5 flex items-center gap-2">
              <span className="text-2xl">≡</span> {t('Contact Information')}
            </h2>
            <div className="card p-2 divide-y divide-gray-50">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="contact-info-row">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-darktext font-semibold text-sm hover:text-primary transition-colors break-words block"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-darktext font-semibold text-sm break-words">{info.value}</div>
                    )}
                    <div className="text-gray-400 text-xs">{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl text-darktext mb-5">{t('Send Us a Message')}</h2>
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              {/* Name */}
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                </span>
                <input
                  type="text"
                  id="contact-name"
                  placeholder={t('Your Name *')}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="input-field pl-9"
                />
              </div>
              {/* Phone */}
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-400"><Phone size={15} /></span>
                <input
                  type="tel"
                  id="contact-phone"
                  placeholder={t('Phone Number *')}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                  className="input-field pl-9"
                />
              </div>
              {/* Requirement */}
              <textarea
                id="contact-requirement"
                rows={4}
                placeholder={t('Your Requirement (e.g. breed, quantity, purpose...)')}
                value={form.requirement}
                onChange={e => setForm({ ...form, requirement: e.target.value })}
                className="input-field resize-none"
              />
              <button type="submit" className="btn-primary w-full justify-center py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {sent ? t('Redirecting to WhatsApp...') : t('Send via WhatsApp')}
              </button>
              <p className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
                <ShieldCheck size={14} className="text-primary shrink-0" />
                {t('Your information is safe with us. We never share your details.')}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto card overflow-hidden p-0">
          <div className="grid md:grid-cols-3">
            <div className="p-6 bg-cream flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">{t('Find Us Here')}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  {t('We are located in ')}{LOCATION}.<br />
                  {t('Click on the map for directions.')}
                </p>
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex text-sm self-start"
              >
                <MapPin size={16} /> {t('Get Directions')}
              </a>
            </div>
            <div className="md:col-span-2 h-64 md:h-72">
              <iframe
                title="GRF Growths Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Looking for quality roosters?"
        subtitle="Contact us today and bring home the best!"
      />
    </div>
  );
}
