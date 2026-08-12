export type BirdBadge = 'Available' | 'Popular' | 'Premium' | 'Sold Out';

export interface Bird {
  id: string;
  name_en: string;
  name_ta: string;
  breed: string;
  age: string;
  price: number | null;
  price_text: string;
  description: string;
  is_available: boolean;
  badge: BirdBadge;
  image_url: string | null;
  image_path: string | null;
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type BirdInput = Omit<Bird, 'id' | 'created_at' | 'updated_at'>;

export type GalleryCategory = 'Roosters' | 'Farm' | 'Chicks' | 'Farm Life' | 'Facilities';

export interface GalleryImage {
  id: string;
  image_url: string;
  image_path: string;
  title: string;
  alt_text: string;
  category: GalleryCategory;
  is_visible: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type GalleryImageInput = Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>;

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  created_at?: string;
}

export interface WebsiteContentSection {
  id: string;
  section_key: string;
  nav_label: string;
  title: string;
  body: string;
  highlight: string;
  display_order: number;
  show_in_nav: boolean;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export type WebsiteContentSectionInput = Omit<WebsiteContentSection, 'id' | 'created_at' | 'updated_at'>;

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  group_name: string;
  label: string;
  field_type: 'text' | 'textarea' | 'url';
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type SiteSettingInput = Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>;
