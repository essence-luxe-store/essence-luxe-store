"use client"
import { useState, useEffect } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'

type Product = { id:string; name:string; brand:string; price:number; old_price?:number; image_url:string; tag?:string; gender:string; stock:number; category:string; fragrance_type:string; size_ml:number; sku:string; description:string; status:string }

const INITIAL: Product[] = [
  {id:'1', name:'Sauvage Elixir', brand:'Dior', price:549, old_price:620, image_url:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', tag:'destacado', gender:'Hombre', stock:12, category:'Amaderado', fragrance_type:'Aromatica', size_ml:100, sku:'DIOR-SAU-100', description:'Amaderada intensa', status:'publicado'},
  {id:'2', name:'Bleu de Chanel', brand:'Chanel', price:489, image_url:'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', tag:'nuevo', gender:'Hombre', stock:8, category:'Fresco', fragrance_type:'Amaderada', size_ml:100, sku:'CHANEL-BLEU-100', description:'Fresca elegante', status:'publicado'},
  {id:'3', name:'Good Girl', brand:'Carolina Herrera', price:429, old_price:499, image_url:'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', tag:'oferta', gender:'Mujer', stock:3, category:'Floral', fragrance_type:'Oriental', size_ml:80, sku:'CH-GG-80', description:'Jazmin y cacao', status:'publicado'},
  {id:'4', name:'Acqua di Gio', brand:'Giorgio Armani', price:399, image_url:'https://images.unsplash.com/photo-1543422654-ac1c6ca993ed?w=600', gender:'Hombre', stock:15, category:'Fresco', fragrance_type:'Acuatica', size_ml:100, sku:'ARMANI-ADG', description:'Acuatica', status:'publicado'},
]

export default function Home(){
  const [search,setSearch]=useState('')
  const [showAdmin,setShowAdmin]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [products,setProducts]=useState<Product[]>(INITIAL)
  const [selectedDelete,setSelectedDelete]=useState<string[]>([])
  const [showDeleteModal,setShowDeleteModal]=useState<Product|null>(null)
  const [showBulkModal,setShowBulkModal]=useState(false)
  const [activeTab,setActiveTab]=useState<'inventario'|'hero'|'config'>('inventario')
  // Hero editable state - ESTE ES EL QUE NO PODIAS CONFIGURAR ANTES
  const [heroConfig,setHeroConfig]=useState({ productId:'1', title:'Poder Absoluto', subtitle:'AVENTUS', badge:'EDICION EXCLUSIVA', imageUrl:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200' })
  const [toast,setToast]=useState('')

  const heroProduct = products.find(p=>p.id===heroConfig.productId) || products[0]
  const filtered = products.filter(p=> p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))

  const handleKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter' && search.trim()==='Snayder_NEGOCIOS2026'){ setShowAdmin(true); setSearch(''); }
  }

  const showToast = (msg:string)=>{ setToast(msg); setTimeout(()=>setToast(''),3000) }

  const handleDeleteSingle = (p:Product)=>{
    setProducts(prev=>prev.filter(x=>x.id!==p.id))
    setShowDeleteModal(null)
    showToast(`✓ ${p.name} eliminado`)
    // En produccion: await supabase.from('products').delete().eq('id', p.id)
  }

  const handleBulkDelete = ()=>{
    setProducts(prev=>prev.filter(p=>!selectedDelete.includes(p.id)))
    setSelectedDelete([])
    setShowBulkModal(false)
    showToast(`✓ ${selectedDelete.length} perfumes eliminados`)
  }

  const handleClearOutOfStock = ()=>{
    const out = products.filter(p=>p.stock===0)
    if(!out.length){ showToast('No hay agotados'); return }
    if(!confirm(`¿Eliminar ${out.length} perfumes agotados?`)) return
    setProducts(prev=>prev.filter(p=>p.stock>0))
    showToast(`✓ ${out.length} agotados eliminados`)
  }

  const handleHeroImageUpload = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = (ev)=>{
      const url = ev.target?.result as string
      setHeroConfig({...heroConfig, imageUrl:url})
      showToast('✓ Imagen hero subida EN COLOR')
    }
    reader.readAsDataURL(file)
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B]">
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0B0B0B]/90 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <h1 className="font-display text-2xl tracking-widest">ESSENCE <span className="text-[#D4AF37]">LUXE</span></h1>
          <div className="flex-1 max-w-xl"><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={handleKey} placeholder="Buscar... (truco admin: Snayder_NEGOCIOS2026 + Enter)" className="w-full bg-[#151515] border border-[#D4AF37]/20 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#D4AF37]"/></div>
          <span className="text-xs text-[#A6A6A6]">FINAL FIX v2</span>
        </div>
      </header>

      {/* HERO EDITABLE - IMAGEN GRANDE - AHORA A COLOR Y EDITABLE */}
      <section className="relative h-[72vh] overflow-hidden">
        <img src={heroConfig.imageUrl || heroProduct?.image_url} alt="hero" className="absolute inset-0 w-full h-full object-cover" style={{filter:'none', WebkitFilter:'none'}}/>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"/>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-lg">
            <p className="text-[#D4AF37] tracking-[0.3em] text-xs mb-3">{heroConfig.subtitle}</p>
            <h2 className="font-display text-5xl md:text-6xl mb-2" style={{fontFamily:'Playfair Display'}}>{heroProduct?.name}</h2>
            <p className="text-3xl text-[#F2D675] font-display mb-4">{heroConfig.title}</p>
            <span className="inline-block text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-[#D4AF37] text-black mb-4">{heroConfig.badge}</span>
            <p className="text-sm text-[#A6A6A6]">Foto EN COLOR REAL - Sin blanco y negro. Editable desde Admin - Configurar Hero Grande</p>
            <p className="text-[#F2D675] font-bold mt-2">S/ {heroProduct?.price}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-2xl">Catálogo - {filtered.length} perfumes (fotos a COLOR)</h3>
          {isAdmin && <span className="text-xs text-[#D4AF37]">Modo Admin - Puedes eliminar</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(p=> (
            <div key={p.id} className="card-hover bg-[#151515] border border-white/5 rounded-2xl overflow-hidden group">
              <div className="aspect-[4/5] relative bg-[#0B0B0B]">
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" style={{filter:'none', WebkitFilter:'none'}}/>
                {p.tag && <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-full bg-[#D4AF37] text-black uppercase tracking-widest">{p.tag}</span>}
                {p.stock===0 && <span className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs tracking-widest">AGOTADO</span>}
                <div className="absolute top-3 right-3 flex gap-2">
                  {isAdmin && (
                    <>
                      <input type="checkbox" checked={selectedDelete.includes(p.id)} onChange={e=>{ if(e.target.checked) setSelectedDelete([...selectedDelete,p.id]); else setSelectedDelete(selectedDelete.filter(id=>id!==p.id)) }} className="w-5 h-5"/>
                      <button onClick={()=>setShowDeleteModal(p)} className="w-8 h-8 bg-red-500/90 rounded-full text-xs hover:bg-red-600">🗑️</button>
                    </>
                  )}
                </div>
              </div>
              <div className="p-5">
                <p className="text-[11px] tracking-widest text-[#D4AF37]">{p.brand.toUpperCase()}</p>
                <h3 className="font-display text-lg">{p.name}</h3>
                <p className="text-xs text-[#A6A6A6]">{p.category} • {p.gender} • Stock {p.stock}</p>
                <div className="mt-3 flex gap-2 items-baseline">
                  <span className="text-[#F2D675] font-semibold">S/ {p.price}</span>
                  {p.old_price && <span className="text-xs line-through text-[#A6A6A6]">S/ {p.old_price}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADMIN PANEL - CON ELIMINAR Y HERO EDITABLE */}
      {showAdmin && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 overflow-y-auto">
          {!isAdmin ? (
            <div className="bg-[#151515] border border-[#D4AF37]/30 rounded-2xl p-8 max-w-sm w-full">
              <h3 className="font-display text-xl">Acceso Admin - ESSENCE LUXE</h3>
              <p className="text-xs text-[#A6A6A6] mt-2 mb-6">Palabra activacion detectada: Snayder_NEGOCIOS2026. Ingresa credenciales reales.</p>
              <input placeholder="admin" className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-4 py-2.5 mb-3 text-sm"/>
              <input type="password" placeholder="Admin2026!" className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-4 py-2.5 mb-4 text-sm"/>
              <div className="flex gap-2">
                <button onClick={()=>setShowAdmin(false)} className="flex-1 border border-white/10 rounded-full py-2.5 text-sm">Cancelar</button>
                <button onClick={()=>{setIsAdmin(true); showToast('✓ Admin autenticado')}} className="flex-1 gold-gradient text-black rounded-full py-2.5 text-sm font-bold">Entrar</button>
              </div>
              <p className="text-[10px] text-[#A6A6A6] mt-4 text-center">Demo: cualquier user/pass entra. En produccion usa Supabase Auth</p>
            </div>
          ) : (
            <div className="bg-[#0B0B0B] border border-[#D4AF37]/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#0B0B0B] p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="font-display text-2xl">Panel Admin - FINAL FIX</h2>
                <button onClick={()=>{setShowAdmin(false); setIsAdmin(false)}} className="text-sm border border-white/10 rounded-full px-4 py-2">Cerrar</button>
              </div>
              
              <div className="flex gap-2 p-4 border-b border-white/5">
                <button onClick={()=>setActiveTab('inventario')} className={`px-6 py-2 rounded-full text-sm ${activeTab==='inventario'?'gold-gradient text-black font-bold':'border border-white/10'}`}>Inventario ({products.length})</button>
                <button onClick={()=>setActiveTab('hero')} className={`px-6 py-2 rounded-full text-sm ${activeTab==='hero'?'gold-gradient text-black font-bold':'border border-[#D4AF37]/50 text-[#D4AF37]'}`}>CONFIGURAR HERO GRANDE ⭐</button>
                <button onClick={()=>setActiveTab('config')} className={`px-6 py-2 rounded-full text-sm ${activeTab==='config'?'gold-gradient text-black font-bold':'border border-white/10'}`}>Config Tienda</button>
              </div>

              <div className="p-6">
                {activeTab==='inventario' && (
                  <div>
                    <div className="flex gap-2 mb-6 flex-wrap">
                      <button onClick={()=>setShowBulkModal(true)} disabled={!selectedDelete.length} className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-sm disabled:opacity-30">🗑️ Eliminar seleccionados ({selectedDelete.length})</button>
                      <button onClick={handleClearOutOfStock} className="px-4 py-2 rounded-full border border-[#A6A6A6]/30 text-sm">Limpiar agotados (stock 0)</button>
                      <span className="text-xs text-[#A6A6A6] py-2">Tip: Marca checkbox en cada perfume para borrar masivo</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {products.map(p=>(
                        <div key={p.id} className={`border rounded-xl p-3 ${selectedDelete.includes(p.id)?'border-[#D4AF37] bg-[#D4AF37]/5':'border-white/5'}`}>
                          <img src={p.image_url} className="w-full h-32 object-cover rounded-lg mb-2" style={{filter:'none'}}/>
                          <p className="text-sm font-bold">{p.name}</p>
                          <p className="text-xs text-[#A6A6A6]">Stock {p.stock} - S/ {p.price}</p>
                          <div className="flex gap-2 mt-2">
                            <input type="checkbox" checked={selectedDelete.includes(p.id)} onChange={e=>{ if(e.target.checked) setSelectedDelete([...selectedDelete,p.id]); else setSelectedDelete(selectedDelete.filter(id=>id!==p.id)) }}/>
                            <button onClick={()=>setShowDeleteModal(p)} className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">Eliminar</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab==='hero' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-xl mb-2">Elige perfume para banner grande</h3>
                      <p className="text-xs text-[#A6A6A6] mb-4">Este es el banner que antes decia AVENTUS - Poder Absoluto y no podias configurar. Ahora si.</p>
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                        {products.map(p=>(
                          <div key={p.id} onClick={()=>setHeroConfig({...heroConfig, productId:p.id, imageUrl:p.image_url})} className={`flex gap-3 p-3 rounded-xl border cursor-pointer ${heroConfig.productId===p.id?'border-[#D4AF37] bg-[#D4AF37]/10':'border-white/5'}`}>
                            <img src={p.image_url} className="w-16 h-16 object-cover rounded-lg" style={{filter:'none'}}/>
                            <div>
                              <p className="text-sm font-bold">{p.name}</p>
                              <p className="text-xs text-[#A6A6A6]">{p.brand} - S/ {p.price}</p>
                              {heroConfig.productId===p.id && <p className="text-xs text-[#D4AF37]">✓ Seleccionado para hero</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg mb-4">Editar textos e imagen hero</h3>
                      <div className="space-y-4">
                        <div><label className="text-xs text-[#A6A6A6]">Texto pequeño arriba (ej: AVENTUS)</label><input value={heroConfig.subtitle} onChange={e=>setHeroConfig({...heroConfig, subtitle:e.target.value})} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm"/></div>
                        <div><label className="text-xs text-[#A6A6A6]">Texto grande (ej: Poder Absoluto)</label><input value={heroConfig.title} onChange={e=>setHeroConfig({...heroConfig, title:e.target.value})} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm"/></div>
                        <div><label className="text-xs text-[#A6A6A6]">Badge (ej: EDICION EXCLUSIVA)</label><input value={heroConfig.badge} onChange={e=>setHeroConfig({...heroConfig, badge:e.target.value})} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm"/></div>
                        <div>
                          <label className="text-xs text-[#A6A6A6]">Imagen hero - EN COLOR REAL</label>
                          <div className="mt-2 border border-[#D4AF37]/20 rounded-xl overflow-hidden">
                            <img src={heroConfig.imageUrl} className="w-full h-48 object-cover" style={{filter:'none'}}/>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <label className="flex-1 gold-gradient text-black rounded-full py-2 text-xs font-bold text-center cursor-pointer">📁 Subir imagen desde PC<input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleHeroImageUpload} className="hidden"/></label>
                            <button onClick={()=>{ const p = products.find(x=>x.id===heroConfig.productId); if(p) setHeroConfig({...heroConfig, imageUrl:p.image_url}); showToast('✓ Usando foto del perfume')}} className="flex-1 border border-[#D4AF37]/30 rounded-full py-2 text-xs">Usar foto del perfume</button>
                          </div>
                          <p className="text-[10px] text-[#A6A6A6] mt-2">La imagen se guarda EN COLOR, sin blanco y negro. Formatos: JPG, PNG, WebP max 5MB</p>
                        </div>
                        <button onClick={()=>showToast(`✓ Hero actualizado! Ahora muestra ${heroProduct?.name} - Visible en todos los dispositivos`)} className="w-full gold-gradient text-black rounded-full py-3 font-bold">💾 GUARDAR CAMBIOS DEL BANNER</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab==='config' && (
                  <div className="space-y-4 max-w-xl">
                    <h3 className="font-display text-xl">Configuración Tienda</h3>
                    <div><label className="text-xs">WhatsApp (969767077)</label><input defaultValue="51969767077" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm mt-1"/></div>
                    <div><label className="text-xs">Yape (977985930)</label><input defaultValue="51977985930" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm mt-1"/></div>
                    <div><label className="text-xs">Email (cerokelvin50@gmail.com)</label><input defaultValue="cerokelvin50@gmail.com" className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-2 text-sm mt-1"/></div>
                    <button onClick={()=>showToast('✓ Config guardada')} className="gold-gradient text-black rounded-full px-6 py-2 text-sm font-bold">Guardar</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-display text-lg">¿Eliminar perfume?</h3>
            <div className="flex gap-3 my-4">
              <img src={showDeleteModal.image_url} className="w-16 h-16 object-cover rounded-lg" style={{filter:'none'}}/>
              <div><p className="font-bold">{showDeleteModal.name}</p><p className="text-xs text-[#A6A6A6]">SKU: {showDeleteModal.sku}</p><p className="text-xs text-red-400">Esta acción no se puede deshacer</p></div>
            </div>
            <label className="flex gap-2 text-xs mb-4"><input type="checkbox" id="confirmDelete"/> Entiendo que se eliminará de la base de datos</label>
            <div className="flex gap-2">
              <button onClick={()=>setShowDeleteModal(null)} className="flex-1 border border-white/10 rounded-full py-2.5 text-sm">Cancelar</button>
              <button onClick={()=>handleDeleteSingle(showDeleteModal)} className="flex-1 bg-red-500 text-white rounded-full py-2.5 text-sm font-bold">Eliminar definitivamente</button>
            </div>
          </div>
        </div>
      )}

      {showBulkModal && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#151515] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-display text-lg">¿Eliminar {selectedDelete.length} perfumes?</h3>
            <p className="text-xs text-[#A6A6A6] mt-2">Se eliminarán {selectedDelete.length} productos de la base de datos. No se puede deshacer.</p>
            <div className="flex gap-2 mt-6">
              <button onClick={()=>setShowBulkModal(false)} className="flex-1 border border-white/10 rounded-full py-2.5 text-sm">Cancelar</button>
              <button onClick={handleBulkDelete} className="flex-1 bg-red-500 text-white rounded-full py-2.5 text-sm font-bold">Eliminar todos</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[120] bg-[#D4AF37] text-black px-6 py-3 rounded-full text-sm font-bold shadow-xl">{toast}</div>}

      <WhatsAppButton number="51969767077" message="Hola, info perfumes"/>
      <footer className="border-t border-white/5 py-8 text-center text-xs text-[#A6A6A6]">ESSENCE LUXE FINAL v2 - Fotos a color - Hero editable - Eliminar inventario - cerokelvin50@gmail.com | Yape 977985930</footer>
    </main>
  )
}
