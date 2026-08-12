import type { SiteSetting } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSetting[] = [
  { id: 'default-seo-title', setting_key: 'seo_title', setting_value: 'GAD GROWTHS | Premium Aseel Breeding & Heritage Program', group_name: 'SEO', label: 'SEO page title', field_type: 'text', display_order: 1 },
  { id: 'default-seo-description', setting_key: 'seo_description', setting_value: 'GAD GROWTHS is a premium Aseel breeding and heritage program focused on selective breeding, lineage documentation, responsible bird welfare and long-term breed preservation.', group_name: 'SEO', label: 'SEO meta description', field_type: 'textarea', display_order: 2 },
  { id: 'default-seo-share-image', setting_key: 'seo_share_image', setting_value: '/logo.png', group_name: 'SEO', label: 'Social sharing image URL', field_type: 'url', display_order: 3 },
  { id: 'default-seo-url', setting_key: 'seo_canonical_url', setting_value: '', group_name: 'SEO', label: 'Canonical website URL', field_type: 'url', display_order: 4 },
  { id: 'default-business-name', setting_key: 'business_name', setting_value: 'GAD GROWTHS', group_name: 'SEO', label: 'Business schema name', field_type: 'text', display_order: 5 },
  { id: 'default-business-description', setting_key: 'business_description', setting_value: 'Premium Aseel breeding and heritage program built around quality, lineage, preservation and progress.', group_name: 'SEO', label: 'Business schema description', field_type: 'textarea', display_order: 6 },

  { id: 'default-home-eyebrow', setting_key: 'home_hero_eyebrow', setting_value: 'Premium Aseel Breeding & Heritage Program', group_name: 'Home', label: 'Hero eyebrow', field_type: 'text', display_order: 10 },
  { id: 'default-home-title-1', setting_key: 'home_hero_title_1', setting_value: 'Know the Bird.', group_name: 'Home', label: 'Hero title line 1', field_type: 'text', display_order: 11 },
  { id: 'default-home-title-2', setting_key: 'home_hero_title_2', setting_value: 'Know the Line.', group_name: 'Home', label: 'Hero title line 2', field_type: 'text', display_order: 12 },
  { id: 'default-home-title-3', setting_key: 'home_hero_title_3', setting_value: 'Build the Legacy.', group_name: 'Home', label: 'Hero title line 3', field_type: 'text', display_order: 13 },
  { id: 'default-home-description', setting_key: 'home_hero_description', setting_value: 'GAD GROWTHS is a premium Aseel breeding and heritage program dedicated to selective breeding, lineage documentation, responsible welfare and long-term breed preservation.', group_name: 'Home', label: 'Hero description', field_type: 'textarea', display_order: 14 },
  { id: 'default-home-core-title', setting_key: 'home_core_title', setting_value: 'Quality. Lineage. Preservation. Progress.', group_name: 'Home', label: 'Core message title', field_type: 'text', display_order: 15 },
  { id: 'default-home-core-body', setting_key: 'home_core_body', setting_value: 'GAD GROWTHS is more than an Aseel farm. It is a long-term breeding and heritage program built around the belief that every exceptional bird has a story, a purpose and a place in the future of its bloodline.', group_name: 'Home', label: 'Core message body', field_type: 'textarea', display_order: 16 },

  { id: 'default-footer-description', setting_key: 'footer_description', setting_value: 'A premium Aseel breeding and heritage program built on quality, lineage, preservation and progress.', group_name: 'Footer', label: 'Footer brand description', field_type: 'textarea', display_order: 30 },
  { id: 'default-footer-feature-1', setting_key: 'footer_feature_1', setting_value: '✔ Selective Aseel Breeding', group_name: 'Footer', label: 'Footer feature 1', field_type: 'text', display_order: 31 },
  { id: 'default-footer-feature-2', setting_key: 'footer_feature_2', setting_value: '✔ Lineage Documentation', group_name: 'Footer', label: 'Footer feature 2', field_type: 'text', display_order: 32 },
  { id: 'default-footer-feature-3', setting_key: 'footer_feature_3', setting_value: '✔ Responsible Bird Welfare', group_name: 'Footer', label: 'Footer feature 3', field_type: 'text', display_order: 33 },
  { id: 'default-footer-feature-4', setting_key: 'footer_feature_4', setting_value: '✔ Heritage Preservation', group_name: 'Footer', label: 'Footer feature 4', field_type: 'text', display_order: 34 },
  { id: 'default-footer-copyright', setting_key: 'footer_copyright', setting_value: '© 2026 GAD GROWTHS. All Rights Reserved.', group_name: 'Footer', label: 'Footer copyright', field_type: 'text', display_order: 35 },

  { id: 'default-contact-title', setting_key: 'contact_hero_title', setting_value: 'Connect with GAD GROWTHS', group_name: 'Contact', label: 'Contact hero title', field_type: 'text', display_order: 50 },
  { id: 'default-contact-body', setting_key: 'contact_hero_body', setting_value: 'Enquire about selected breeding birds, hatching eggs, chicks, available Aseel lines or our breeding program. For current availability, pricing and transportation, contact us directly.', group_name: 'Contact', label: 'Contact hero body', field_type: 'textarea', display_order: 51 },
  { id: 'default-contact-guide-title', setting_key: 'contact_guide_title', setting_value: 'What to Ask Us', group_name: 'Contact', label: 'Contact guide title', field_type: 'text', display_order: 52 },
  { id: 'default-contact-guide-body', setting_key: 'contact_guide_body', setting_value: 'Connect with GAD GROWTHS for enquiries about selected breeding birds, hatching eggs, chicks, our breeding program or available Aseel lines.', group_name: 'Contact', label: 'Contact guide body', field_type: 'textarea', display_order: 53 },

  { id: 'default-cta-title', setting_key: 'global_cta_title', setting_value: 'Interested in selected Aseel breeding stock?', group_name: 'CTA', label: 'Default CTA title', field_type: 'text', display_order: 70 },
  { id: 'default-cta-subtitle', setting_key: 'global_cta_subtitle', setting_value: 'Contact GAD GROWTHS to check availability, lineage details and breeding plans.', group_name: 'CTA', label: 'Default CTA subtitle', field_type: 'textarea', display_order: 71 },
];

export const DEFAULT_SITE_SETTING_MAP = DEFAULT_SITE_SETTINGS.reduce<Record<string, string>>((acc, setting) => {
  acc[setting.setting_key] = setting.setting_value;
  return acc;
}, {});
