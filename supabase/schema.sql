-- ESSENCE LUXE FINAL - FIX COLOR + HERO EDITABLE + DELETE
create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  price numeric not null check (price >=0),
  old_price numeric,
  description text not null,
  category text not null,
  gender text check (gender in ('Hombre','Mujer','Unisex')),
  fragrance_type text not null,
  size_ml int not null,
  stock int default 0,
  sku text unique not null,
  image_url text not null,
  images text[] default '{}',
  status text check (status in ('publicado','oculto','agotado')) default 'publicado',
  tag text check (tag in ('nuevo','oferta','destacado')),
  created_at timestamptz default now()
);

create table if not exists store_config (
  id text primary key default 'main',
  store_name text default 'ESSENCE LUXE',
  whatsapp_number text default '51969767077',
  whatsapp_message text default 'Hola, estoy interesado en {perfume} - S/{precio} - Cant: {cantidad}',
  yape_number text default '51977985930',
  yape_holder text default 'Snayder Rengifo',
  yape_qr_url text,
  contact_email text default 'cerokelvin50@gmail.com',
  delivery_zones text[] default '{"Trujillo Centro","Victor Larco","Huanchaco","La Esperanza","El Porvenir","Florencia de Mora","Moche"}',
  shipping_cost numeric default 15,
  min_purchase numeric default 0,
  delivery_instructions text default 'Entrega 24-48h Trujillo. Contra entrega solo zonas habilitadas.',
  hero_product_id uuid references products(id) on delete set null,
  hero_title text default 'Poder Absoluto',
  hero_subtitle text default 'AVENTUS',
  hero_badge text default 'EDICION EXCLUSIVA',
  hero_image_url text default 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200'
);
insert into store_config (id) values ('main') on conflict (id) do nothing;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  customer_name text not null,
  customer_phone text not null,
  address text not null,
  district text not null,
  items jsonb not null,
  subtotal numeric not null,
  total numeric not null,
  payment_method text check (payment_method in ('yape','contra_entrega','whatsapp')),
  status text default 'pendiente' check (status in ('pendiente','confirmado','preparando','en_camino','entregado','cancelado')),
  created_at timestamptz default now()
);

create table if not exists admin_users ( id uuid primary key references auth.users(id) on delete cascade, email text not null, role text default 'admin');
create table if not exists admin_logs ( id uuid primary key default gen_random_uuid(), admin_id uuid references auth.users(id), action text not null, entity text, entity_id text, created_at timestamptz default now());

alter table products enable row level security;
alter table store_config enable row level security;
alter table orders enable row level security;

drop policy if exists "public read published" on products;
create policy "public read published" on products for select using (status='publicado');
drop policy if exists "public read config" on store_config;
create policy "public read config" on store_config for select using (true);
drop policy if exists "admin all products" on products;
create policy "admin all products" on products for all using (auth.role()='authenticated');
drop policy if exists "admin all config" on store_config;
create policy "admin all config" on store_config for all using (auth.role()='authenticated');
drop policy if exists "admin all orders" on orders;
create policy "admin all orders" on orders for all using (auth.role()='authenticated');

-- Seed
insert into products (name, brand, price, old_price, description, category, gender, fragrance_type, size_ml, stock, sku, image_url, tag, status) values
('Sauvage Elixir','Dior',549,620,'Amaderada aromatica intensa con lavanda','Amaderado','Hombre','Aromatica',100,12,'DIOR-SAU-100','https://images.unsplash.com/photo-1541643600914-78b084683601?w=600','destacado','publicado'),
('Bleu de Chanel','Chanel',489,null,'Elegancia atemporal fresca y amaderada','Fresco','Hombre','Amaderada',100,8,'CHANEL-BLEU-100','https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600','nuevo','publicado'),
('Good Girl','Carolina Herrera',429,499,'Jazmin y cacao, sofisticacion femenina','Floral','Mujer','Oriental',80,3,'CH-GG-80','https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600','oferta','publicado')
on conflict (sku) do nothing;
