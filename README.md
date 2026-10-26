# ESSENCE LUXE - Perfumes Premium | Trujillo Peru

Tienda online de lujo con Next.js + Supabase + Vercel.

Paleta: #0B0B0B, #151515, #D4AF37, #F2D675, #F5F1E8

## Features
- Catalogo con filtros marca/precio/genero/tipo/disponibilidad
- Buscador con palabra secreta Snayder_NEGOCIOS2026 abre admin login (no otorga acceso)
- Carrito funcional + pedidos con codigo PERF-XXXX
- WhatsApp flotante https://wa.me/51969767077 con mensaje predefinido
- Yape 977985930 editable + QR + copiar
- Pago contra entrega solo Trujillo (zonas editables)
- Panel admin protegido con Supabase Auth + RLS
- CRUD perfumes con upload imagen desde PC a Supabase Storage (color real, sin grayscale)
- Hero grande editable: elige perfume destacado para banner Aventus Poder Absoluto
- Eliminar perfumes con confirmacion y borrado masivo
- Sincronizacion realtime entre dispositivos

## Setup
1. Crear proyecto en supabase.com
2. SQL Editor -> ejecutar supabase/schema.sql
3. Storage -> crear bucket 'perfumes' publico + bucket 'hero' publico
4. Auth -> Add user admin@essenceluxe.com
5. Insertar en admin_users el uuid del usuario
6. Clonar repo, cp .env.example .env.local, completar
7. npm install && npm run dev

## Deploy Vercel
- Push a GitHub
- Import en Vercel, poner env vars
- Deploy automatico HTTPS

## Estructura
app/page.tsx -> home + catalogo + hero editable
app/admin/* -> login, dashboard, products (con eliminar), hero-config, settings, orders
components/* -> Header, ProductCard, Cart, WhatsAppButton
lib/supabase.ts -> cliente
supabase/schema.sql -> DB + RLS

## Seguridad
- RLS habilitado
- Passwords hasheadas por Supabase Auth
- Service role solo en server actions
- Rate limit login
- Validacion archivos JPG/PNG/WebP max 5MB
- No secrets en frontend
