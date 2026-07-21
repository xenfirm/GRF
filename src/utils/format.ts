import type { Bird } from '../types';

export function formatInr(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return '';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function birdDisplayPrice(bird: Pick<Bird, 'is_available' | 'price' | 'price_text'>) {
  if (!bird.is_available) return 'Currently Unavailable';
  return bird.price ? formatInr(bird.price) : bird.price_text;
}

export function badgeColor(badge: string, isAvailable = true) {
  if (!isAvailable || badge === 'Sold Out') return 'bg-gray-500';
  if (badge === 'Popular') return 'bg-amber-500';
  if (badge === 'Premium') return 'bg-purple-600';
  return 'bg-primary';
}
