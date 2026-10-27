# ZIP FINAL - DIFERENCIAS CON ANTERIOR

Este zip es DIFERENTE al anterior essence-luxe-github.zip

## FIXES NUEVOS:
1. Foto blanco y negro: en app/globals.css agregue img{filter:none !important} - ahora subes foto y se ve a color real
2. Eliminar perfumes: en app/page.tsx agregue estado selectedDelete, modals de confirmacion, handleDeleteSingle, handleBulkDelete, handleClearOutOfStock
3. Hero editable: nuevo tab CONFIGURAR HERO GRANDE con seleccion de perfume, edicion de subtitle/title/badge/imageUrl, upload desde PC con FileReader en color
4. Toasts y confirmaciones

## Para desplegar:
- Supabase: ya creaste buckets perfumes y hero PUBLIC
- Vercel: Framework Next.js (no Eve), 7 env vars, Deploy
- Despues de deploy, para probar eliminar: busca Snayder_NEGOCIOS2026 + Enter -> login -> Inventario -> marca checkbox -> Eliminar

## Archivos clave modificados:
- app/globals.css -> fix color
- app/page.tsx -> 400 lineas con delete + hero editable completo
