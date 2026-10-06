import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { APP_CONFIG } from '../appConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Halo Serviceku, saya ingin konsultasi dan pesan layanan teknisi panggilan ke rumah.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip */}
      {showTooltip && (
        <div className="mb-2 bg-[#1A1615] text-[#FAF8F5] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <span className="font-bold text-[#D4AF37] block">Teknisi Siap Panggilan</span>
            <span className="text-[11px] text-zinc-300">Chat WhatsApp sekarang</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-500 hover:text-white ml-1 p-0.5"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Serviceku"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <Phone className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};
