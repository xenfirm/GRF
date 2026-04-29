import img1 from './assets/country-rooster-healthy.jpg';
import img2 from './assets/premium-country-chicken.jpg';
import img3 from './assets/natural-rooster-farm-raised.jpg';
import img4 from './assets/organic-country-chicken-india.jpg';
import img5 from './assets/chicken-farm-natural-lifestyle.jpg';
import img6 from './assets/rooster-feeding-time.jpg';
import img7 from './assets/poultry-farm-clean-environment.jpg';
import newImg1 from './assets/IMG-20241007-WA0097.jpg';
import newImg2 from './assets/IMG-20241007-WA0105.jpg';
import newImg3 from './assets/IMG_20260125_145314.jpg';
import newImg4 from './assets/IMG_20260125_145322.jpg';
import newImg5 from './assets/IMG_20260125_145323.jpg';

// Site-wide constants for GRF Growths

export const PHONE = '+91 99529 08818';
export const PHONE_RAW = '919952908818';
export const WHATSAPP = '919952908818';
export const EMAIL = 'grf.entrepreneur@gmail.com';
export const ADDRESS = 'No.81, Mankanoor, Puthagaram, Tamil Nadu 635602';
export const HOURS = 'Monday – Sunday: 6:00 AM – 8:00 PM';
export const LOCATION = 'Tirupattur district, Tamil Nadu';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}`;
export const CALL_LINK = `tel:${PHONE_RAW}`;
export const FACEBOOK_LINK = 'https://www.facebook.com/share/1ChfWmbqgN/';
export const INSTAGRAM_LINK = 'https://www.instagram.com/guru_rooster/';
export const MAPS_LINK = 'https://maps.app.goo.gl/gRkaQ4JexHB9AtSr6';

export const ROOSTER_BREEDS = [
  {
    id: 1,
    name: 'Country White Rooster',
    nameTa: 'நாட்டு வெள்ளை சேவல்',
    breed: 'Country White',
    age: '6 – 8 Months',
    price: 'Affordable Prices',
    priceNum: 1500,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Strong and healthy country breed raised with natural feed.',
    image: img1,
  },
  {
    id: 2,
    name: 'Aseel Breed',
    nameTa: 'ஆசீல் இனம்',
    breed: 'Aseel',
    age: '7 – 10 Months',
    price: 'Affordable Prices',
    priceNum: 2000,
    badge: 'Popular',
    badgeColor: 'bg-amber-500',
    description: 'Powerful breed known for strength and stamina.',
    image: img2,
  },
  {
    id: 3,
    name: 'Kili / Seval Breed',
    nameTa: 'கிளி / சேவல் இனம்',
    breed: 'Kili Seval',
    age: '6 – 8 Months',
    price: 'Affordable Prices',
    priceNum: 1800,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Naturally raised with good health and fast growth.',
    image: img3,
  },
  {
    id: 4,
    name: 'Nattu Seval',
    nameTa: 'நாட்டு சேவல்',
    breed: 'Nattu Seval',
    age: '8 – 12 Months',
    price: 'Affordable Prices',
    priceNum: 2200,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Traditional country breed with high demand.',
    image: img4,
  },
  {
    id: 5,
    name: 'Kadaknath',
    nameTa: 'கடக்நாத்',
    breed: 'Kadaknath',
    age: '8 – 10 Months',
    price: 'Affordable Prices',
    priceNum: 3500,
    badge: 'Premium',
    badgeColor: 'bg-purple-600',
    description: 'Rare black-feathered breed, highly medicinal and sought after.',
    image: img5,
  },
  {
    id: 6,
    name: 'Giriraja Breed',
    nameTa: 'கிரிராஜா இனம்',
    breed: 'Giriraja',
    age: '5 – 7 Months',
    price: 'Affordable Prices',
    priceNum: 1200,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Hardy and fast-growing breed suitable for village farming.',
    image: img6,
  },
];

export const GALLERY_IMAGES = [
  { id: 1, src: img1, alt: 'Country Rooster', category: 'Roosters' },
  { id: 2, src: img2, alt: 'Premium Chicken', category: 'Roosters' },
  { id: 3, src: img3, alt: 'Natural Farm Raised', category: 'Farm Life' },
  { id: 4, src: img4, alt: 'Organic Chicken', category: 'Farm' },
  { id: 5, src: img5, alt: 'Farm Lifestyle', category: 'Farm Life' },
  { id: 6, src: img6, alt: 'Feeding Time', category: 'Facilities' },
  { id: 7, src: img7, alt: 'Clean Environment', category: 'Facilities' },
  { id: 8, src: img1, alt: 'Rooster close up', category: 'Roosters' },
  { id: 9, src: img2, alt: 'Farm view', category: 'Farm' },
  { id: 10, src: img3, alt: 'Roosters outdoors', category: 'Roosters' },
  { id: 11, src: img4, alt: 'Chicks area', category: 'Chicks' },
  { id: 12, src: img5, alt: 'Daily farm life', category: 'Farm Life' },
  { id: 13, src: newImg1, alt: 'Farm rooster 1', category: 'Roosters' },
  { id: 14, src: newImg2, alt: 'Farm rooster 2', category: 'Roosters' },
  { id: 15, src: newImg3, alt: 'Farm life 1', category: 'Farm Life' },
  { id: 16, src: newImg4, alt: 'Farm life 2', category: 'Farm Life' },
  { id: 17, src: newImg5, alt: 'Farm life 3', category: 'Farm Life' },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Roosters', to: '/roosters' },
  { label: 'About Us', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];
