'use client'
import { Product } from '@/lib/types'
export default function ProductCard({product, onDelete, onEdit, isAdmin}:{product:Product; onDelete?:()=>void; onEdit?:()=>void; isAdmin?:boolean}){
  return (
    <div className="card-hover bg-[#151515] border border-white/5 rounded-2xl overflow-hidden group">
      <div className="aspect-[4/5] relative bg-[#0B0B0B]">
        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" style={{filter:'none'}} />
        {product.tag && <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-full bg-[#D4AF37] text-black uppercase tracking-widest">{product.tag}</span>}
        {product.stock===0 && <span className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs tracking-widest">AGOTADO</span>}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <button onClick={onEdit} className="w-8 h-8 bg-black/70 rounded-full text-xs">✏️</button>
            <button onClick={onDelete} className="w-8 h-8 bg-red-500/90 rounded-full text-xs">🗑️</button>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] tracking-widest text-[#D4AF37]">{product.brand.toUpperCase()}</p>
        <h3 className="font-display text-lg">{product.name}</h3>
        <p className="text-xs text-[#A6A6A6]">{product.category} • {product.gender}</p>
        <div className="mt-3 flex gap-2 items-baseline">
          <span className="text-[#F2D675] font-semibold">S/ {product.price}</span>
          {product.old_price && <span className="text-xs line-through text-[#A6A6A6]">S/ {product.old_price}</span>}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a href={`https://wa.me/51969767077?text=${encodeURIComponent(`Hola me interesa ${product.name} S/${product.price}`)}`} target="_blank" className="text-xs border border-[#D4AF37]/30 rounded-full py-2 text-center">WhatsApp</a>
          <button className="text-xs gold-gradient text-black rounded-full py-2 font-medium">Carrito</button>
        </div>
      </div>
    </div>
  )
}
