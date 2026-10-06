import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  DollarSign, 
  Wrench, 
  CheckCircle, 
  Clock, 
  Award,
  Sparkles
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Home,
      title: 'Panggilan Langsung ke Rumah',
      desc: 'Anda tidak perlu susah payah membongkar atau mengangkut kulkas, AC, atau mesin cuci Anda. Teknisi kami yang datang langsung ke lokasi.',
    },
    {
      icon: ShieldCheck,
      title: 'Garansi Resmi 30 Hari',
      desc: 'Setiap perbaikan dan penggantian komponen dilindungi garansi tertulis 30 hari. Jika kendala terulang, teknisi kami cek kembali bebas biaya.',
    },
    {
      icon: DollarSign,
      title: 'Harga Jujur & Transparan',
      desc: 'Biaya diinformasikan jelas sebelum pengerjaan dimulai. Tidak ada biaya siluman atau penggantian sparepart fiktif yang tidak perlu.',
    },
    {
      icon: Wrench,
      title: 'Alat Diagnostik Lengkap',
      desc: 'Dilengkapi multimeter digital, manifold gauge presisi, pompa vakum, dan jet cleaner bertekanan untuk hasil pengerjaan bersih dan tuntas.',
    },
    {
      icon: Award,
      title: 'Sparepart Berkualitas Teruji',
      desc: 'Kami hanya memasang sparepart original atau grade A pabrikan berstandar tinggi demi keawetan barang elektronik jangka panjang Anda.',
    },
    {
      icon: Clock,
      title: 'Respon Cepat 7 Hari Seminggu',
      desc: 'Buka setiap hari mulai pukul 07.30 hingga 20.00 WIB untuk melayani panggilan darurat rumah tangga maupun usaha kuliner & toko Anda.',
    },
  ];

  return (
    <section id="keunggulan" className="py-16 sm:py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#1A1615] text-xs font-bold uppercase mb-2">
            <span>Standar Layanan Executive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
            Mengapa Mempercayakan Elektronik Anda ke Serviceku?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Komitmen kami adalah memberikan rasa tenang bagi pemilik rumah dengan pelayanan yang ramah, bersih, dan berintegritas tinggi.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-zinc-200/90 shadow-xs hover:border-[#D4AF37]/60 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1A1615] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1615] group-hover:text-[#C5A028] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
