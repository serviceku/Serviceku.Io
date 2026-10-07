import React from 'react';
import { 
  X, 
  Phone, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Wrench, 
  Award 
} from 'lucide-react';
import { ServiceItem, APP_CONFIG } from '../appConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  if (!service) return null;

  const handleWhatsAppBooking = () => {
    const text = `Halo Admin Serviceku, saya ingin konsultasi dan booking teknisi panggilan ke rumah saya untuk:
*${service.name}*
Estimasi: ${service.priceFormatted}

Mohon konfirmasi ketersediaan jadwal teknisi terdekat di wilayah Indramayu / Cirebon / Majalengka. Terima kasih.`;
    const url = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full bg-zinc-900 shrink-0">
          <ImageWithFallback
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615] via-[#1A1615]/50 to-transparent"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service Title on Image */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#1A1615] text-[10px] font-extrabold uppercase tracking-wider">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 text-[#FAF8F5]">
              {service.name}
            </h3>
            <p className="text-[#D4AF37] font-extrabold text-lg mt-0.5">
              {service.priceFormatted}
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Deskripsi & Cakupan Layanan
            </h4>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features list */}
          {service.features && service.features.length > 0 && (
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-zinc-200/80">
              <h4 className="text-xs font-bold text-[#1A1615] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Standar Pengerjaan Teknisi Serviceku
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-800">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4 Steps Flow */}
          <div className="border-t border-zinc-200 pt-5">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
              Alur Pemesanan Mudah Panggilan ke Rumah
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold flex items-center justify-center mx-auto mb-1.5">
                  1
                </div>
                <div className="text-xs font-bold text-zinc-800">Chat WhatsApp</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Kirim jenis barang & alamat</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold flex items-center justify-center mx-auto mb-1.5">
                  2
                </div>
                <div className="text-xs font-bold text-zinc-800">Teknisi Tiba</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Cek fisik & analisa kerusakan</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold flex items-center justify-center mx-auto mb-1.5">
                  3
                </div>
                <div className="text-xs font-bold text-zinc-800">Persetujuan</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Harga disepakati transparan</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="w-6 h-6 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold flex items-center justify-center mx-auto mb-1.5">
                  4
                </div>
                <div className="text-xs font-bold text-zinc-800">Selesai & Garansi</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">Nota garansi resmi 30 hari</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[11px] text-zinc-500 block">Jadwalkan Teknisi Sekarang</span>
            <span className="text-sm font-bold text-[#1A1615]">Respons Cepat WhatsApp</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-zinc-700 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <a
              href={`https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                `Halo Admin Serviceku, saya ingin konsultasi dan booking teknisi panggilan ke rumah saya untuk: *${service.name}* (${service.priceFormatted}). Mohon konfirmasi ketersediaan jadwal teknisi terdekat di wilayah Indramayu / Cirebon / Majalengka. Terima kasih.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp (+62 878-7441-7978)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
