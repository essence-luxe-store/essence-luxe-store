# Como subir a GitHub

1. Crea repo vacio en github.com/new -> nombre essence-luxe-store -> NO marques README

2. En tu PC:
```
cd /ruta/a/este/proyecto
git init
git add .
git commit -m "feat: tienda premium completa con hero editable y eliminar"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/essence-luxe-store.git
git push -u origin main
```

3. Vercel:
- vercel.com -> Add New Project -> Import essence-luxe-store
- Environment Variables: pega las de .env.example con valores reales de Supabase
- Deploy

4. Supabase:
- Ejecuta supabase/schema.sql
- Storage buckets: perfumes y hero publicos

Listo! URL: https://essence-luxe-store.vercel.app

Para actualizar despues:
```
git add .
git commit -m "update: ..."
git push
```
Vercel despliega automatico.
