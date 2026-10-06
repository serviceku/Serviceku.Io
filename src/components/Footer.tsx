import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { APP_CONFIG } from '../appConfig';
import { ServicekuLogo } from './ServicekuLogo';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenAiConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onOpenAiConsultant,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Halo Serviceku, saya ingin konsultasi dan pesan layanan teknisi panggilan.'
  )}`;

  return (
    <footer className="bg-[#1A1615] text-[#FAF8F5] pt-16 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Brand Info with Official Logo */}
          <div className="space-y-4">
            <div className="mb-2 inline-block bg-white/95 p-2 rounded-2xl shadow-md border border-white/20">
              <img 
                src="/serviceku-logo.svg" 
                alt="Serviceku - Elektronik Terbaik" 
                className="h-14 sm:h-16 w-auto object-contain" 
              />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Jasa Service Elektronik Profesional Panggilan. Melayani perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Garansi 30 Hari
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-medium">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Service & Cuci AC Rumah
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Reparasi Kulkas 1 & 2 Pintu Inverter
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Service Mesin Cuci Top & Front Load
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Showcase & Chiller Warung/Minimarket
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Freezer Box Daging & Frozen Food
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Dispenser Galon Bawah & Atas
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Operational */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Kontak & Operasional
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {APP_CONFIG.contact.whatsapp} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{APP_CONFIG.contact.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{APP_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Fitur Pintar & Admin */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-[#D4AF37] uppercase tracking-wider">
              Konsultasi & Pengelola
            </h4>
            <p className="text-xs text-zinc-400">
              Konsultasikan kerusakan barang Anda secara instan menggunakan asisten AI pintar Serviceku.
            </p>
            <button
              onClick={onOpenAiConsultant}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2A2320] to-[#362D29] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold hover:border-[#D4AF37] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Coba Konsultasi AI Gratis</span>
            </button>

            <div className="pt-2">
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Pengelola Website (Admin)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-zinc-300">Serviceku</strong>. Seluruh Hak Cipta Dilindungi. Jasa Service Elektronik Profesional Panggilan.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
