import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  MapPin, 
  PlusCircle, 
  Edit3 
} from 'lucide-react';
import { BannerItem, APP_CONFIG } from '../appConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface BannerSliderProps {
  banners: BannerItem[];
  isAdmin: boolean;
  onOpenAdminBanners?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({
  banners,
  isAdmin,
  onOpenAdminBanners,
  onSelectCategory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex] || banners[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleWhatsAppBooking = (banner: BannerItem) => {
    const text = `Halo Serviceku, saya melihat promo "${banner.title}". Saya ingin memesan teknisi panggilan untuk layanan ${banner.serviceCategory || 'elektronik'} ke rumah saya.`;
    const url = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-[#1A1615]">
      {/* Slider Container */}
      <div 
        className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image with Fallback and Smooth Transition */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
          />
          {/* Multi-layer luxury executive gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1615] via-[#1A1615]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-transparent to-[#1A1615]/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(212,175,55,0.12),transparent_60%)]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
          <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
            
            {/* Infographic Top Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold tracking-wide uppercase shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentBanner.badge || 'Garansi 30 Hari'}
              </span>
              <span className="text-zinc-400 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                Teknisi Langsung Datang ke Rumah
              </span>
            </div>

            {/* Main Infographic Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF8F5] tracking-tight leading-[1.15]">
              {currentBanner.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed font-normal">
              {currentBanner.subtitle ||
                'Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer & Dispenser. Teknisi jujur, cepat, dan transparan di Indramayu, Cirebon, & Majalengka.'}
            </p>

            {/* Infographic Metric Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 pb-1 border-t border-zinc-700/60 max-w-lg">
              <div className="text-left">
                <div className="text-base sm:text-lg font-extrabold text-[#D4AF37]">100%</div>
                <div className="text-[11px] text-zinc-400">Teknisi ke Rumah</div>
              </div>
              <div className="text-left border-l border-zinc-800 pl-3">
                <div className="text-base sm:text-lg font-extrabold text-[#FAF8F5]">30 Hari</div>
                <div className="text-[11px] text-zinc-400">Garansi Service</div>
              </div>
              <div className="text-left border-l border-zinc-800 pl-3">
                <div className="text-base sm:text-lg font-extrabold text-[#25D366]">Jujur</div>
                <div className="text-[11px] text-zinc-400">Transparan Biaya</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                  `Halo Serviceku, saya melihat promo "${currentBanner.title}". Saya ingin memesan teknisi panggilan untuk layanan ${currentBanner.serviceCategory || 'elektronik'} ke rumah saya.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-lg shadow-emerald-950/40 hover:bg-[#20ba5a] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 fill-current" />
                <span>{currentBanner.ctaText || 'Pesan Teknisi Sekarang'}</span>
              </a>

              <a
                href="#katalog"
                onClick={() => {
                  if (currentBanner.serviceCategory && onSelectCategory) {
                    onSelectCategory(currentBanner.serviceCategory);
                  }
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 text-[#FAF8F5] hover:bg-white/20 border border-white/20 text-sm font-semibold transition-all backdrop-blur-xs cursor-pointer"
              >
                <span>Lihat Daftar Harga Jasa</span>
              </a>

              {isAdmin && (
                <button
                  onClick={onOpenAdminBanners}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D4AF37] text-[#1A1615] text-xs font-bold hover:bg-[#c5a028] transition-colors cursor-pointer"
                  title="Kelola Banner Slideshow di Dashboard Admin"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Banner (Admin)</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Arrow Controls */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white/90 hover:bg-[#D4AF37] hover:text-[#1A1615] transition-all backdrop-blur-xs border border-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 text-white/90 hover:bg-[#D4AF37] hover:text-[#1A1615] transition-all backdrop-blur-xs border border-white/10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
            {banners.map((b, idx) => (
              <button
                key={b.id || idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ke slide ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#D4AF37]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Sub-Banner Bar: Nama Jasa Serviceku Infografis Ribbon */}
      <div className="relative z-20 bg-gradient-to-r from-[#11100F] via-[#201C1A] to-[#11100F] border-t border-[#D4AF37]/30 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] inline-block animate-ping"></span>
            <span className="tracking-wide">LAYANAN UTAMA SERVICEKU:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-zinc-300 font-medium">
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('AC')}>
              ❄️ Service & Cuci AC
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('Kulkas')}>
              🧊 Reparasi Kulkas
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('Mesin Cuci')}>
              🌀 Mesin Cuci 1 & 2 Tabung
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('Showcase')}>
              🏪 Showcase & Chiller
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('Freezer Box')}>
              🥩 Freezer Box
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('Dispenser')}>
              💧 Dispenser Galon
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Indramayu · Cirebon · Majalengka</span>
          </div>

        </div>
      </div>
    </section>
  );
};
