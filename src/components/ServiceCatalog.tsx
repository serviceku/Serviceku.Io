import React, { useState, useMemo } from 'react';
import { 
  Phone, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Wrench, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ServiceItem, APP_CONFIG } from '../appConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface ServiceCatalogProps {
  services: ServiceItem[];
  isAdmin: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenDetail: (service: ServiceItem) => void;
  onOpenAddService: () => void;
  onEditService: (service: ServiceItem) => void;
  onDeleteService: (id: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  services,
  isAdmin,
  selectedCategory,
  onSelectCategory,
  onOpenDetail,
  onOpenAddService,
  onEditService,
  onDeleteService,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Extract distinct categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(services.map((s) => s.category)));
    return ['Semua', ...list];
  }, [services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const matchCat =
        selectedCategory === 'Semua' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleWhatsAppClick = (service: ServiceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Halo Serviceku, saya ingin pesan layanan teknisi panggilan untuk:
*${service.name}* (${service.priceFormatted})

Mohon informasi jadwal teknisi dan konfirmasi kedatangan ke rumah saya di wilayah Indramayu / Cirebon / Majalengka. Terima kasih.`;
    const url = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="katalog" className="py-16 sm:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C5A028] uppercase mb-2">
              <span className="w-6 h-0.5 bg-[#D4AF37]"></span>
              <span>Katalog Layanan Panggilan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
              Pilihan Service Elektronik Terpercaya
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Semua layanan dikerjakan oleh teknisi bersertifikat langsung di tempat tinggal Anda.
              Tanpa repot mengangkut barang, transparan, dan bergaransi resmi.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAddService}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A1615] text-[#FAF8F5] text-sm font-bold hover:bg-zinc-800 transition-all shadow-md cursor-pointer self-start md:self-end"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Tambah Jasa Baru</span>
            </button>
          )}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1615] text-[#D4AF37] shadow-xs'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:min-w-[300px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari AC, Kulkas, Mesin Cuci..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
              >
                Reset
              </button>
            )}
          </div>

        </div>

        {/* Services Card Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-300 p-8">
            <Wrench className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-zinc-800">Tidak ada layanan yang sesuai</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-md mx-auto">
              Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('Semua');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#1A1615] bg-[#D4AF37]/20 rounded-lg hover:bg-[#D4AF37]/30 transition-colors"
            >
              Tampilkan Semua Jasa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => onOpenDetail(service)}
                className="group relative bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Frame */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-100">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-md bg-[#1A1615]/85 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-bold tracking-wide uppercase">
                      {service.category}
                    </span>
                  </div>

                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#1A1615] text-[10px] font-extrabold uppercase shadow-xs">
                        Paling Sering Dipesan
                      </span>
                    </div>
                  )}

                  {/* Overlay Gradient on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Price Banner at Bottom of Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] text-zinc-300 block uppercase font-medium">Estimasi Tarif</span>
                      <span className="text-lg font-black text-[#D4AF37] tracking-tight drop-shadow-xs">
                        {service.priceFormatted || `Mulai Rp ${service.price.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                    <span className="text-[11px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white/90">
                      Garansi 30 Hari
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1615] group-hover:text-[#C5A028] transition-colors line-clamp-1">
                      {service.name}
                    </h3>
                    
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    {service.features && service.features.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-zinc-100 space-y-1.5">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-zinc-100 space-y-2">
                    {/* Primary WhatsApp Direct CTA */}
                    <button
                      onClick={(e) => handleWhatsAppClick(service, e)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#20ba5a] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      <span>Order via WhatsApp</span>
                    </button>

                    {/* View Detail Link */}
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 px-1 pt-1">
                      <span className="group-hover:text-[#1A1615] transition-colors flex items-center gap-1">
                        Lihat Rincian & Estimasi Pengerjaan
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div 
                        className="pt-2 border-t border-zinc-100 flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => onEditService(service)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus layanan "${service.name}"?`)) {
                              onDeleteService(service.id);
                            }
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
