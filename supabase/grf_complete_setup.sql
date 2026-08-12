-- GRF Growths complete Supabase setup
-- Run this in a new Supabase project's SQL editor after Authentication is enabled.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.birds (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ta text not null,
  breed text not null,
  age text not null,
  price integer check (price is null or price >= 0),
  price_text text not null default 'Affordable Prices',
  description text not null,
  is_available boolean not null default true,
  badge text not null default 'Available' check (badge in ('Available', 'Popular', 'Premium', 'Sold Out')),
  image_url text,
  image_path text,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  image_path text not null,
  title text not null,
  alt_text text not null,
  category text not null check (category in ('Roosters', 'Farm', 'Chicks', 'Farm Life', 'Facilities')),
  is_visible boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.website_content_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  nav_label text not null,
  title text not null,
  body text not null,
  highlight text not null default '',
  display_order integer not null default 0,
  show_in_nav boolean not null default true,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value text not null default '',
  group_name text not null default 'General',
  label text not null,
  field_type text not null default 'text' check (field_type in ('text', 'textarea', 'url')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_admin_users_user_id on public.admin_users(user_id);
create index if not exists idx_birds_public on public.birds(is_available, display_order);
create index if not exists idx_birds_featured on public.birds(is_featured, display_order);
create index if not exists idx_birds_breed on public.birds(breed);
create index if not exists idx_gallery_public on public.gallery_images(is_visible, category, display_order);
create index if not exists idx_website_content_public on public.website_content_sections(is_visible, show_in_nav, display_order);
create index if not exists idx_site_settings_order on public.site_settings(group_name, display_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_birds_updated_at on public.birds;
create trigger set_birds_updated_at
before update on public.birds
for each row execute function public.set_updated_at();

drop trigger if exists set_gallery_images_updated_at on public.gallery_images;
create trigger set_gallery_images_updated_at
before update on public.gallery_images
for each row execute function public.set_updated_at();

drop trigger if exists set_website_content_sections_updated_at on public.website_content_sections;
create trigger set_website_content_sections_updated_at
before update on public.website_content_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.admin_users enable row level security;
alter table public.birds enable row level security;
alter table public.gallery_images enable row level security;
alter table public.website_content_sections enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users for select
to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins can manage birds" on public.birds;
create policy "Admins can manage birds"
on public.birds for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read available birds" on public.birds;
create policy "Public can read available birds"
on public.birds for select
to anon, authenticated
using (is_available = true or public.is_admin());

drop policy if exists "Admins can manage gallery images" on public.gallery_images;
create policy "Admins can manage gallery images"
on public.gallery_images for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read visible gallery images" on public.gallery_images;
create policy "Public can read visible gallery images"
on public.gallery_images for select
to anon, authenticated
using (is_visible = true or public.is_admin());

drop policy if exists "Admins can manage website content sections" on public.website_content_sections;
create policy "Admins can manage website content sections"
on public.website_content_sections for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read visible website content sections" on public.website_content_sections;
create policy "Public can read visible website content sections"
on public.website_content_sections for select
to anon, authenticated
using (is_visible = true or public.is_admin());

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings for select
to anon, authenticated
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'grf-media',
  'grf-media',
  true,
  5242880,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view GRF media" on storage.objects;
create policy "Public can view GRF media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'grf-media');

drop policy if exists "Admins can upload GRF media" on storage.objects;
create policy "Admins can upload GRF media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'grf-media'
  and public.is_admin()
  and (name like 'birds/%' or name like 'gallery/%')
);

drop policy if exists "Admins can update GRF media" on storage.objects;
create policy "Admins can update GRF media"
on storage.objects for update
to authenticated
using (bucket_id = 'grf-media' and public.is_admin())
with check (
  bucket_id = 'grf-media'
  and public.is_admin()
  and (name like 'birds/%' or name like 'gallery/%')
);

drop policy if exists "Admins can delete GRF media" on storage.objects;
create policy "Admins can delete GRF media"
on storage.objects for delete
to authenticated
using (bucket_id = 'grf-media' and public.is_admin());

insert into public.birds
  (name_en, name_ta, breed, age, price, price_text, description, is_available, badge, image_url, image_path, is_featured, display_order)
values
  ('Country White Rooster', 'நாட்டு வெள்ளை சேவல்', 'Country White', '6 - 8 Months', 1500, 'Affordable Prices', 'Strong and healthy country breed raised with natural feed.', true, 'Available', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=900&q=80', '', true, 1),
  ('Aseel Breed', 'ஆசீல் இனம்', 'Aseel', '7 - 10 Months', 2000, 'Affordable Prices', 'Powerful breed known for strength and stamina.', true, 'Popular', 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=900&q=80', '', true, 2),
  ('Kili / Seval Breed', 'கிளி / சேவல் இனம்', 'Kili Seval', '6 - 8 Months', 1800, 'Affordable Prices', 'Naturally raised with good health and fast growth.', true, 'Available', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=900&q=80', '', true, 3),
  ('Nattu Seval', 'நாட்டு சேவல்', 'Nattu Seval', '8 - 12 Months', 2200, 'Affordable Prices', 'Traditional country breed with high demand.', true, 'Available', 'https://images.unsplash.com/photo-1592018706419-6b1bdb00da14?w=900&q=80', '', true, 4),
  ('Kadaknath', 'கடக்நாத்', 'Kadaknath', '8 - 10 Months', 3500, 'Affordable Prices', 'Rare black-feathered breed, highly medicinal and sought after.', true, 'Premium', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=900&q=80', '', false, 5),
  ('Giriraja Breed', 'கிரிராஜா இனம்', 'Giriraja', '5 - 7 Months', 1200, 'Affordable Prices', 'Hardy and fast-growing breed suitable for village farming.', true, 'Available', 'https://images.unsplash.com/photo-1578969834528-27bb14a4afc6?w=900&q=80', '', false, 6)
on conflict do nothing;

insert into public.gallery_images
  (image_url, image_path, title, alt_text, category, is_visible, display_order)
values
  ('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1000&q=80', '', 'Country Rooster', 'Country Rooster', 'Roosters', true, 1),
  ('https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=1000&q=80', '', 'Premium Chicken', 'Premium Chicken', 'Roosters', true, 2),
  ('https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80', '', 'Natural Farm Raised', 'Natural Farm Raised', 'Farm Life', true, 3),
  ('https://images.unsplash.com/photo-1592018706419-6b1bdb00da14?w=1000&q=80', '', 'Organic Chicken', 'Organic Chicken', 'Farm', true, 4),
  ('https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1000&q=80', '', 'Farm Lifestyle', 'Farm Lifestyle', 'Farm Life', true, 5),
  ('https://images.unsplash.com/photo-1578969834528-27bb14a4afc6?w=1000&q=80', '', 'Feeding Time', 'Feeding Time', 'Facilities', true, 6)
on conflict do nothing;

insert into public.website_content_sections
  (section_key, nav_label, title, body, highlight, display_order, show_in_nav, is_visible)
values
  (
    'our-story',
    'Our Story',
    'Our Story',
    'GAD GROWTHS was established with a vision to create a professional and trusted identity in Aseel breeding. Our philosophy is based on the belief that good breeding requires patience, observation, selection and proper records. Instead of focusing only on the present generation, we think about how today''s breeding decisions will influence future generations. Our breeding program combines respect for traditional Aseel characteristics with a systematic approach to selection and documentation.',
    'Know the Bird. Know the Line. Build the Legacy.',
    1,
    true,
    true
  ),
  (
    'aseel-breeds',
    'Our Aseel Breeds',
    'Our Aseel Breeds',
    'GAD GROWTHS focuses on selected Aseel breeding lines and their individual characteristics. Aseel birds can differ in appearance, structure, size, colour, development and historical background, so each line should be understood and evaluated on its own characteristics rather than judged only by appearance.',
    'Each line is evaluated through background, parentage, generation and important physical characteristics where reliable information is available.',
    2,
    true,
    true
  ),
  (
    'breeding-program',
    'Breeding Program',
    'Breeding Program',
    'The GAD GROWTHS breeding program is designed around purposeful selection rather than uncontrolled breeding. We begin by identifying suitable breeding birds, understanding their health, structure, development and available lineage, then planning breeding pairs according to the objectives of each line. After breeding, chicks can be identified and recorded so their development can be followed.',
    'Select - Pair - Hatch - Identify - Monitor - Evaluate - Improve.',
    3,
    true,
    true
  ),
  (
    'lineage-pedigree',
    'Lineage / Pedigree',
    'Lineage / Pedigree',
    'Lineage is one of the most important features planned for GAD GROWTHS. In a structured breeding program, knowing where a bird comes from helps breeders understand its background and make better future breeding decisions. Each important breeding bird can receive a unique GAD Bird ID.',
    'The planned GAD Bird ID and Bloodline Registry will connect selected birds with parents, generation, photographs, hatch information, breeding status and offspring.',
    4,
    true,
    true
  ),
  (
    'available-birds',
    'Available Birds',
    'Available Birds',
    'GAD GROWTHS may offer selected Aseel breeding males, females, hatching eggs and chicks depending on breeding plans and availability. Because our priority is the development of our own breeding program, not every bird will automatically be offered for sale.',
    'Our objective is to connect the right bird with the right breeder through honest availability, background and suitability information.',
    5,
    true,
    true
  ),
  (
    'health-quality',
    'Health & Quality',
    'Health & Quality',
    'Health is the foundation of every successful breeding program. Breeding quality cannot be separated from proper bird management, including suitable nutrition, clean water, appropriate housing, hygiene, biosecurity and regular observation throughout development.',
    'Quality should be supported by proper management and honest information - not only attractive photographs.',
    6,
    true,
    true
  ),
  (
    'gallery-records',
    'Gallery & Growth Records',
    'Gallery & Growth Records',
    'The GAD GROWTHS gallery is designed as a visual record of the breeding journey. Visitors can see selected breeding males, females, chicks, eggs, farm facilities and different stages of bird development. Growth documentation can show how selected birds progress over time.',
    'Where possible, photos can connect individual birds with GAD Bird ID and lineage information.',
    7,
    true,
    true
  ),
  (
    'our-commitment',
    'Our Commitment',
    'Our Commitment',
    'We are committed to quality over quantity, responsible bird welfare, transparent information and long-term breed preservation. Responsible breeding means putting bird welfare before commercial value and avoiding the promotion of unsuitable birds as premium breeding stock.',
    'GAD GROWTHS represents quality, heritage, transparency and continuous improvement in Aseel breeding.',
    8,
    true,
    true
  )
on conflict (section_key) do update
set nav_label = excluded.nav_label,
    title = excluded.title,
    body = excluded.body,
    highlight = excluded.highlight,
    display_order = excluded.display_order,
    show_in_nav = excluded.show_in_nav,
    is_visible = excluded.is_visible;

insert into public.site_settings
  (setting_key, setting_value, group_name, label, field_type, display_order)
values
  ('seo_title', 'GAD GROWTHS | Premium Aseel Breeding & Heritage Program', 'SEO', 'SEO page title', 'text', 1),
  ('seo_description', 'GAD GROWTHS is a premium Aseel breeding and heritage program focused on selective breeding, lineage documentation, responsible bird welfare and long-term breed preservation.', 'SEO', 'SEO meta description', 'textarea', 2),
  ('seo_share_image', '/logo.png', 'SEO', 'Social sharing image URL', 'url', 3),
  ('seo_canonical_url', '', 'SEO', 'Canonical website URL', 'url', 4),
  ('business_name', 'GAD GROWTHS', 'SEO', 'Business schema name', 'text', 5),
  ('business_description', 'Premium Aseel breeding and heritage program built around quality, lineage, preservation and progress.', 'SEO', 'Business schema description', 'textarea', 6),
  ('home_hero_eyebrow', 'Premium Aseel Breeding & Heritage Program', 'Home', 'Hero eyebrow', 'text', 10),
  ('home_hero_title_1', 'Know the Bird.', 'Home', 'Hero title line 1', 'text', 11),
  ('home_hero_title_2', 'Know the Line.', 'Home', 'Hero title line 2', 'text', 12),
  ('home_hero_title_3', 'Build the Legacy.', 'Home', 'Hero title line 3', 'text', 13),
  ('home_hero_description', 'GAD GROWTHS is a premium Aseel breeding and heritage program dedicated to selective breeding, lineage documentation, responsible welfare and long-term breed preservation.', 'Home', 'Hero description', 'textarea', 14),
  ('home_core_title', 'Quality. Lineage. Preservation. Progress.', 'Home', 'Core message title', 'text', 15),
  ('home_core_body', 'GAD GROWTHS is more than an Aseel farm. It is a long-term breeding and heritage program built around the belief that every exceptional bird has a story, a purpose and a place in the future of its bloodline.', 'Home', 'Core message body', 'textarea', 16),
  ('footer_description', 'A premium Aseel breeding and heritage program built on quality, lineage, preservation and progress.', 'Footer', 'Footer brand description', 'textarea', 30),
  ('footer_feature_1', '✔ Selective Aseel Breeding', 'Footer', 'Footer feature 1', 'text', 31),
  ('footer_feature_2', '✔ Lineage Documentation', 'Footer', 'Footer feature 2', 'text', 32),
  ('footer_feature_3', '✔ Responsible Bird Welfare', 'Footer', 'Footer feature 3', 'text', 33),
  ('footer_feature_4', '✔ Heritage Preservation', 'Footer', 'Footer feature 4', 'text', 34),
  ('footer_copyright', '© 2026 GAD GROWTHS. All Rights Reserved.', 'Footer', 'Footer copyright', 'text', 35),
  ('contact_hero_title', 'Connect with GAD GROWTHS', 'Contact', 'Contact hero title', 'text', 50),
  ('contact_hero_body', 'Enquire about selected breeding birds, hatching eggs, chicks, available Aseel lines or our breeding program. For current availability, pricing and transportation, contact us directly.', 'Contact', 'Contact hero body', 'textarea', 51),
  ('contact_guide_title', 'What to Ask Us', 'Contact', 'Contact guide title', 'text', 52),
  ('contact_guide_body', 'Connect with GAD GROWTHS for enquiries about selected breeding birds, hatching eggs, chicks, our breeding program or available Aseel lines.', 'Contact', 'Contact guide body', 'textarea', 53),
  ('global_cta_title', 'Interested in selected Aseel breeding stock?', 'CTA', 'Default CTA title', 'text', 70),
  ('global_cta_subtitle', 'Contact GAD GROWTHS to check availability, lineage details and breeding plans.', 'CTA', 'Default CTA subtitle', 'textarea', 71)
on conflict (setting_key) do update
set setting_value = excluded.setting_value,
    group_name = excluded.group_name,
    label = excluded.label,
    field_type = excluded.field_type,
    display_order = excluded.display_order;

-- Create the first admin:
-- 1. In Supabase Dashboard, create an Auth user with email and password.
-- 2. Copy that user's UUID from Authentication > Users.
-- 3. Run this statement with the real UUID and email:
--
-- insert into public.admin_users (user_id, email)
-- values ('SUPABASE_AUTH_USER_UUID', 'ADMIN_EMAIL');
