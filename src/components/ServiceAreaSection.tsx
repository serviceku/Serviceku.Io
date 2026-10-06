import React from 'react';
import { MapPin, Navigation, Clock, ShieldAlert, CheckCircle, PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../appConfig';

export const ServiceAreaSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Halo Serviceku, saya ingin bertanya apakah alamat rumah saya dijangkau teknisi panggilan?'
  )}`;

  return (
    <section id="wilayah" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#1A1615] text-xs font-bold uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C5A028]" />
            <span>Jangkauan Teknisi Panggilan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
            Wilayah Layanan Indramayu, Cirebon, & Majalengka
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Anda tidak perlu repot membawa AC berat, kulkas besar, atau mesin cuci ke tempat service.
            Teknisi jujur & profesional Serviceku yang akan langsung datang ke rumah Anda.
          </p>
        </div>

        {/* 3 Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {APP_CONFIG.contact.serviceAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1615] text-[#D4AF37] flex items-center justify-center font-black text-lg">
                    {idx + 1}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Respon Cepat
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1615]">
                  Wilayah {area.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Melayani perumahan, perkantoran, warung, toko & ruko
                </p>

                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <span className="text-xs font-bold text-zinc-700 uppercase block mb-2">
                    Kecamatan / Area Utama:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Estimasi Tiba: 30-60 Mnt
                </span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Siap Panggilan
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner Bottom */}
        <div className="mt-10 rounded-2xl bg-[#1A1615] text-[#FAF8F5] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#D4AF37]">
              Alamat Rumah Anda Tidak Tercantum di Atas?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Jangan khawatir! Hubungi WhatsApp kami sekarang untuk mengecek jangkauan armada teknisi kami di dekat lokasi Anda.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba5a] transition-colors shrink-0 shadow-md cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 fill-current" />
            <span>Tanyakan Lokasi via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
