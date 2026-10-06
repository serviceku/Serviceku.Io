import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG, GalleryItem } from '../appConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface GallerySectionProps {
  gallery?: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  gallery = APP_CONFIG.gallery,
}) => {
  return (
    <section id="galeri" className="py-16 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C5A028] uppercase mb-2">
            <span className="w-6 h-0.5 bg-[#D4AF37]"></span>
            <span>Dokumentasi Kerja Nyata</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
            Galeri Pengerjaan Teknisi Serviceku
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Foto asli pengerjaan perbaikan elektronik panggilan langsung di rumah pelanggan area Indramayu, Cirebon, dan Majalengka.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#1A1615]/80 backdrop-blur-xs text-[#D4AF37] text-[10px] font-extrabold uppercase">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1A1615] group-hover:text-[#C5A028] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Selesai & Bergaransi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
