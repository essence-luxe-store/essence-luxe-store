"use client"
import { useState, useEffect } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import ProductCard from '@/components/ProductCard'

const DEMO = [
  {id:'1', name:'Sauvage Elixir', brand:'Dior', price:549, old_price:620, image_url:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', tag:'destacado', gender:'Hombre', stock:12, category:'Amaderado', fragrance_type:'Aromatica', size_ml:100, sku:'DIOR-1', description:'', status:'publicado'},
  {id:'2', name:'Bleu de Chanel', brand:'Chanel', price:489, image_url:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', tag:'nuevo', gender:'Hombre', stock:8, category:'Fresco', fragrance_type:'Amaderada', size_ml:100, sku:'CHANEL-1', description:'', status:'publicado'},
  {id:'3', name:'Good Girl', brand:'Carolina Herrera', price:429, old_price:499, image_url:'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', tag:'oferta', gender:'Mujer', stock:3, category:'Floral', fragrance_type:'Oriental', size_ml:80, sku:'CH-1', description:'', status:'publicado'},
]

export default function Home(){
  const [search,setSearch]=useState('')
  const [showLogin,setShowLogin]=useState(false)
  const [products,setProducts]=useState(DEMO)
  const [heroConfig,setHeroConfig]=useState({productId:'1', title:'Poder Absoluto', subtitle:'AVENTUS', badge:'EDICION EXCLUSIVA', imageUrl:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200'})
  const heroProduct = products.find(p=>p.id===heroConfig.productId) || products[0]
  const filtered = products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))

  const handleKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter' && search.trim()==='Snayder_NEGOCIOS2026'){ setShowLogin(true); setSearch('') }
  }

  const handleDelete = (id:string)=>{
    if(!confirm('¿Eliminar este perfume definitivamente?')) return
    setProducts(prev=>prev.filter(p=>p.id!==id))
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B]">
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0B0B0B]/90 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <h1 className="font-display text-2xl tracking-widest">ESSENCE <span className="text-[#D4AF37]">LUXE</span></h1>
          <div className="flex-1 max-w-xl"><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={handleKey} placeholder="Buscar perfume, marca... (truco: Snayder_NEGOCIOS2026 + Enter)" className="w-full bg-[#151515] border border-[#D4AF37]/20 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#D4AF37]"/></div>
          <span className="text-sm">🛒 0</span>
        </div>
      </header>

      <section className="relative h-[70vh] overflow-hidden">
        <img src={heroConfig.imageUrl || heroProduct.image_url} alt="hero" className="absolute inset-0 w-full h-full object-cover" style={{filter:'none'}}/>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div>
            <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-4">{heroConfig.subtitle}</p>
            <h2 className="font-display text-6xl mb-2">{heroProduct?.name}</h2>
            <p className="text-3xl text-[#F2D675] font-display mb-4">{heroConfig.title}</p>
            <span className="inline-block text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-[#D4AF37] text-black">{heroConfig.badge}</span>
            <p className="mt-6 text-sm text-[#A6A6A6] max-w-md">Ahora el perfume destacado es editable desde admin - Configurar Hero Grande</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="font-display text-2xl mb-6">Catálogo - {filtered.length} perfumes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p=> <ProductCard key={p.id} product={p as any} isAdmin onDelete={()=>handleDelete(p.id)} />)}
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6">
          <div className="bg-[#151515] border border-[#D4AF37]/30 rounded-2xl p-8 max-w-sm w-full">
            <h3 className="font-display text-xl">Acceso Admin</h3>
            <p className="text-xs text-[#A6A6A6] mt-2 mb-6">Palabra activacion detectada. Ingresa credenciales reales.</p>
            <input placeholder="admin" className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-4 py-2.5 mb-3 text-sm"/>
            <input type="password" placeholder="••••••" className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-4 py-2.5 mb-4 text-sm"/>
            <div className="flex gap-2"><button onClick={()=>setShowLogin(false)} className="flex-1 border border-white/10 rounded-full py-2.5 text-sm">Cancelar</button><button className="flex-1 gold-gradient text-black rounded-full py-2.5 text-sm">Entrar a Panel</button></div>
          </div>
        </div>
      )}

      <WhatsAppButton number="51969767077" message="Hola, info perfumes"/>
      <footer className="border-t border-white/5 py-8 text-center text-xs text-[#A6A6A6]">cerokelvin50@gmail.com | Yape 977985930 | WhatsApp 969767077 | Trujillo Perú</footer>
    </main>
  )
}
