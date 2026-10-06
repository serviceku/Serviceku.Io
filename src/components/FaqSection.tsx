import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { APP_CONFIG, FaqItem } from '../appConfig';

interface FaqSectionProps {
  faq?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faq = APP_CONFIG.faq,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Halo Admin Serviceku, saya ingin bertanya tentang syarat garansi dan pemesanan teknisi.'
  )}`;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#1A1615] text-xs font-bold uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A028]" />
            <span>Pertanyaan Umum (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1615] tracking-tight">
            Transparansi Layanan & Garansi
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Segala hal yang perlu Anda ketahui sebelum memesan layanan teknisi panggilan Serviceku.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faq.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#1A1615]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#D4AF37]/20 text-[#1A1615]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 mt-1 animate-in fade-in duration-200">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-zinc-200">
          <h4 className="text-sm font-bold text-[#1A1615]">
            Masih ada pertanyaan seputar kerusakan barang Anda?
          </h4>
          <p className="text-xs text-zinc-500 mt-1">
            Tim CS dan teknisi kami siap merespons chat konsultasi Anda secara cuma-cuma.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4 fill-current" />
            <span>Tanya Langsung ke WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
