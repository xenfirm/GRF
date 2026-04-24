import { WHATSAPP_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';

interface RoosterCardProps {
  name: string;
  age: string;
  price: string;
  badge: string;
  badgeColor: string;
  description: string;
  image: string;
}

export default function RoosterCard({ name, age, price, badge, badgeColor, description, image }: RoosterCardProps) {
  const { t } = useLanguage();
  const msg = encodeURIComponent(`Hi! I'm interested in ${name} (${age}) priced at ${price}. Please share availability.`);

  return (
    <div className="rooster-card">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop&q=80';
          }}
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-darktext text-base mb-1 text-center">{t(name)}</h3>
        <div className="text-primary text-xs font-semibold mb-2 text-center">
          {age}
        </div>
        <div className="font-bold text-darktext text-lg mb-4 text-center">{price}</div>
        <a
          href={`${WHATSAPP_LINK}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center text-sm py-2 rounded-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
          {t('Enquire on WhatsApp')}
        </a>
      </div>
    </div>
  );
}
