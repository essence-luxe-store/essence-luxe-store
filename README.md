# ESSENCE LUXE - Tienda Perfumes Premium - FINAL FIX

## FIXES INCLUIDOS EN ESTE ZIP (diferente al anterior):
- ✅ FIX blanco y negro: filter:none !important en todas las img, fotos a color real
- ✅ ELIMINAR perfumes: botón 🗑️ con modal confirmación, borrado masivo, limpiar agotados
- ✅ HERO EDITABLE: tab CONFIGURAR HERO GRANDE, elige perfume para banner grande Aventus Poder Absoluto, sube imagen desde PC en color
- ✅ Sincronización real Supabase (no localStorage)
- ✅ Diseño premium #0B0B0B + #D4AF37 + #F2D675

## Palabra activación admin
Buscador principal escribir exactamente: Snayder_NEGOCIOS2026 + Enter -> abre /admin/login
No otorga acceso, solo abre login. Auth real Supabase.

## Deploy
1. Supabase: crear proyecto, SQL Editor -> ejecutar supabase/schema.sql, Storage crear buckets perfumes y hero PUBLIC
2. Vercel: Framework Next.js (no Eve), añadir 7 env vars, Deploy
3. Prueba: cambia precio en PC -> aparece en celular al instante
