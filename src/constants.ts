// Site-wide constants for Guru Rooster Farm

export const PHONE = '+91 12345 67890';
export const PHONE_RAW = '911234567890';
export const WHATSAPP = '911234567890';
export const EMAIL = 'guru.roosterfarm@gmail.com';
export const ADDRESS = 'GURU Rooster Farm, Omalur Road, Salem, Tamil Nadu – 636 455, India';
export const HOURS = 'Monday – Sunday: 6:00 AM – 8:00 PM';
export const LOCATION = 'Salem, Tamil Nadu, India';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}`;
export const CALL_LINK = `tel:${PHONE_RAW}`;

export const ROOSTER_BREEDS = [
  {
    id: 1,
    name: 'Country White Rooster',
    nameTa: 'நாட்டு வெள்ளை சேவல்',
    breed: 'Country White',
    age: '6 – 8 Months',
    price: '₹1,500',
    priceNum: 1500,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Strong and healthy country breed raised with natural feed.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Aseel Breed',
    nameTa: 'ஆசீல் இனம்',
    breed: 'Aseel',
    age: '7 – 10 Months',
    price: '₹2,000',
    priceNum: 2000,
    badge: 'Popular',
    badgeColor: 'bg-amber-500',
    description: 'Powerful breed known for strength and stamina.',
    image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Kili / Seval Breed',
    nameTa: 'கிளி / சேவல் இனம்',
    breed: 'Kili Seval',
    age: '6 – 8 Months',
    price: '₹1,800',
    priceNum: 1800,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Naturally raised with good health and fast growth.',
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Nattu Seval',
    nameTa: 'நாட்டு சேவல்',
    breed: 'Nattu Seval',
    age: '8 – 12 Months',
    price: '₹2,200',
    priceNum: 2200,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Traditional country breed with high demand.',
    image: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Kadaknath',
    nameTa: 'கடக்நாத்',
    breed: 'Kadaknath',
    age: '8 – 10 Months',
    price: '₹3,500',
    priceNum: 3500,
    badge: 'Premium',
    badgeColor: 'bg-purple-600',
    description: 'Rare black-feathered breed, highly medicinal and sought after.',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Giriraja Breed',
    nameTa: 'கிரிராஜா இனம்',
    breed: 'Giriraja',
    age: '5 – 7 Months',
    price: '₹1,200',
    priceNum: 1200,
    badge: 'Available',
    badgeColor: 'bg-primary',
    description: 'Hardy and fast-growing breed suitable for village farming.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop&q=80',
  },
];

export const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop&q=80', alt: 'Rooster in farm', category: 'Roosters' },
  { id: 2, src: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=500&h=400&fit=crop&q=80', alt: 'Group of roosters', category: 'Roosters' },
  { id: 3, src: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&h=400&fit=crop&q=80', alt: 'White rooster', category: 'Roosters' },
  { id: 4, src: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=500&h=400&fit=crop&q=80', alt: 'Roosters outdoors', category: 'Farm' },
  { id: 5, src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=500&h=400&fit=crop&q=80', alt: 'Farm aerial', category: 'Farm' },
  { id: 6, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=400&fit=crop&q=80', alt: 'Farm coops', category: 'Facilities' },
  { id: 7, src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=400&fit=crop&q=80', alt: 'Baby chicks', category: 'Chicks' },
  { id: 8, src: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=400&fit=crop&q=80', alt: 'Farm life', category: 'Farm Life' },
  { id: 9, src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=400&fit=crop&q=80', alt: 'Healthy rooster', category: 'Roosters' },
  { id: 10, src: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=500&h=400&fit=crop&q=80', alt: 'Farm entrance', category: 'Farm' },
  { id: 11, src: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&h=400&fit=crop&q=80', alt: 'Chicks feeding', category: 'Chicks' },
  { id: 12, src: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=500&h=400&fit=crop&q=80', alt: 'Farm facilities', category: 'Facilities' },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Roosters', to: '/roosters' },
  { label: 'About Us', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];
