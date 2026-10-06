import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  RotateCcw, 
  MapPin,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';
import { APP_CONFIG } from '../appConfig';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMON_SYMPTOMS = [
  { appliance: 'AC', symptom: 'AC tidak dingin, hanya keluar angin seperti kipas' },
  { appliance: 'AC', symptom: 'AC meneteskan air (bocor) di dalam ruangan' },
  { appliance: 'Kulkas', symptom: 'Kulkas bawah tidak dingin, tapi freezer atas beku' },
  { appliance: 'Kulkas', symptom: 'Kompresor kulkas panas berdengung dan tidak mau start' },
  { appliance: 'Mesin Cuci', symptom: 'Pengering tidak berputar dan bunyi dengung keras' },
  { appliance: 'Mesin Cuci', symptom: 'Air terus mengalir masuk tidak berhenti atau eror level air' },
  { appliance: 'Showcase', symptom: 'Kaca berembun parah & minuman kurang dingin' },
  { appliance: 'Dispenser', symptom: 'Air panas atau pendingin tidak berfungsi sama sekali' },
];

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [appliance, setAppliance] = useState('AC');
  const [problem, setProblem] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Indramayu');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await api.getAiDiagnosis({
        appliance,
        problem: problem.trim(),
        customerLocation,
        note: note.trim(),
      });
      setDiagnosis(result);
    } catch (err: any) {
      setError(err.message || 'Gagal memproses analisa. Silakan coba lagi atau langsung chat WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForwardToWhatsApp = () => {
    const text = `Halo Teknisi Serviceku, saya baru saja konsultasi analisa kerusakan via website:
*Alat:* ${appliance}
*Keluhan:* ${problem}
*Lokasi:* ${customerLocation}

*Hasil Diagnosa AI Serviceku:*
${diagnosis ? diagnosis.slice(0, 450) + '...' : ''}

Mohon bantuan untuk penjadwalan teknisi panggilan ke alamat saya. Terima kasih.`;

    const url = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setDiagnosis(null);
    setProblem('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1A1615] px-6 py-5 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-[#FAF8F5]">
                  Konsultan AI Serviceku
                </h3>
                <span className="text-[10px] bg-[#D4AF37] text-[#1A1615] font-bold px-2 py-0.5 rounded uppercase">
                  Gratis
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Deteksi awal kerusakan elektronik rumah tangga & estimasi penanganan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!diagnosis ? (
            /* Inquiry Form */
            <form onSubmit={handleAskAI} className="space-y-4">
              {/* Select Appliance */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                  1. Pilih Jenis Peralatan Elektronik
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['AC', 'Kulkas', 'Mesin Cuci', 'Showcase', 'Freezer Box', 'Dispenser'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAppliance(item)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        appliance === item
                          ? 'bg-[#1A1615] text-[#D4AF37] border-[#1A1615] shadow-xs'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Preset Symptoms */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                  Pilih Keluhan Cepat (Atau Ketik Sendiri di Bawah):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_SYMPTOMS.filter((s) => s.appliance === appliance).map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProblem(s.symptom)}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-zinc-100 hover:bg-[#D4AF37]/20 hover:text-[#1A1615] text-zinc-700 border border-zinc-200 transition-colors text-left"
                    >
                      {s.symptom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                  2. Jelaskan Keluhan / Gejala Kerusakan *
                </label>
                <textarea
                  required
                  rows={3}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Contoh: AC kamar saya merk Sharp 1/2 PK, nyala tapi tidak ada hawa dingin sama sekali, pipa luar keluar es tipis..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-zinc-300 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                    3. Wilayah Tempat Tinggal Anda
                  </label>
                  <select
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                  >
                    <option value="Indramayu">Indramayu (Kota, Jatibarang, Kertasmaya, dll)</option>
                    <option value="Cirebon">Cirebon (Kota, Kedawung, Sumber, Weru, dll)</option>
                    <option value="Majalengka">Majalengka (Kota, Kadipaten, Kertajati, dll)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1.5">
                    Catatan Tambahan (Merk / Lama Pemakaian)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Sudah dipakai 3 tahun, belum pernah service"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !problem.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1A1615] text-[#D4AF37] hover:bg-zinc-800 disabled:opacity-50 font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                      <span>Sedang Menganalisa Kerusakan dengan AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>Analisa Kerusakan Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Results View */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-bold text-zinc-900">
                    Hasil Diagnosa & Solusi Kerusakan {appliance}
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Konsultasi Keluhan Lain</span>
                </button>
              </div>

              {/* AI Output Content Container */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-zinc-200 text-zinc-800 text-sm leading-relaxed whitespace-pre-line font-sans space-y-2">
                {diagnosis}
              </div>

              {/* Direct Forward to WhatsApp Button */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950 uppercase">
                      Langkah Selanjutnya: Hubungi Teknisi Panggilan
                    </h5>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Kirim hasil analisa ini langsung ke WhatsApp Serviceku agar teknisi siap membawa sparepart dan alat yang sesuai ke rumah Anda.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleForwardToWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba5a] shadow-md transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Kirim Diagnosa ke WhatsApp (+62 878-7441-7978)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 shrink-0">
          <span>Didukung oleh Official Gemini AI Technology</span>
          <span className="text-emerald-700 font-semibold">Teknisi Cepat Datang ke Rumah</span>
        </div>
      </div>
    </div>
  );
};
