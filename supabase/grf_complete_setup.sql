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

create index if not exists idx_admin_users_user_id on public.admin_users(user_id);
create index if not exists idx_birds_public on public.birds(is_available, display_order);
create index if not exists idx_birds_featured on public.birds(is_featured, display_order);
create index if not exists idx_birds_breed on public.birds(breed);
create index if not exists idx_gallery_public on public.gallery_images(is_visible, category, display_order);

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

-- Create the first admin:
-- 1. In Supabase Dashboard, create an Auth user with email and password.
-- 2. Copy that user's UUID from Authentication > Users.
-- 3. Run this statement with the real UUID and email:
--
-- insert into public.admin_users (user_id, email)
-- values ('SUPABASE_AUTH_USER_UUID', 'ADMIN_EMAIL');
