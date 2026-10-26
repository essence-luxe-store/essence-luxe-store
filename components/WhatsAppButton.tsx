'use client'
export default function WhatsAppButton({number, message}:{number:string; message?:string}){
  const url = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  return <a href={url} target="_blank" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-xl hover:scale-110 transition">💬</a>
}
