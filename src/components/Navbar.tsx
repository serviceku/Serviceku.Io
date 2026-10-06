import React, { useState } from 'react';
import { 
  Phone, 
  Lock, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  UserCheck
} from 'lucide-react';
import { APP_CONFIG } from '../appConfig';
import { ServicekuLogo } from './ServicekuLogo';

interface NavbarProps {
  isAdmin: boolean;
  adminUsername?: string;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  onOpenAiConsultant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdmin,
  adminUsername,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
  onOpenAiConsultant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${APP_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Halo Admin Serviceku, saya ingin konsultasi dan booking teknisi panggilan ke rumah saya.'
  )}`;

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#1A1615] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Teknisi Siap Datang Langsung ke Rumah</span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="text-[#D4AF37] font-medium hidden sm:inline">Indramayu, Cirebon, & Majalengka</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors font-medium">
                {APP_CONFIG.contact.whatsapp}
              </a>
            </div>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">07:30 - 20:00 WIB</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Official Logo Brand */}
            <a href="#" className="flex items-center gap-2 group focus:outline-hidden hover:opacity-90 transition-opacity py-1">
              <img 
                src="/serviceku-logo.svg" 
                alt="Serviceku - Elektronik Terbaik" 
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs" 
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-700">
              <a href="#katalog" className="hover:text-[#C5A028] transition-colors py-1">
                Katalog Jasa
              </a>
              <a href="#keunggulan" className="hover:text-[#C5A028] transition-colors py-1">
                Keunggulan
              </a>
              <a href="#wilayah" className="hover:text-[#C5A028] transition-colors py-1">
                Wilayah Panggilan
              </a>
              <a href="#galeri" className="hover:text-[#C5A028] transition-colors py-1">
                Galeri Teknisi
              </a>
              <a href="#faq" className="hover:text-[#C5A028] transition-colors py-1">
                FAQ & Garansi
              </a>
              <button
                onClick={onOpenAiConsultant}
                className="flex items-center gap-1.5 text-zinc-800 hover:text-[#C5A028] font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Konsultasi AI</span>
              </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenDashboard}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 text-[#FAF8F5] text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Admin ({adminUsername || 'Admin'})</span>
                  </button>
                  <button
                    onClick={onLogout}
                    title="Keluar Admin"
                    className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 text-xs font-semibold hover:border-zinc-900 hover:text-zinc-900 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Admin Login</span>
                </button>
              )}

              {/* Direct WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenAiConsultant}
                className="p-2 rounded-lg bg-[#1A1615] text-[#D4AF37] text-xs flex items-center gap-1 font-semibold"
                title="Tanya AI"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px]">AI</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-800">
              <a
                href="#katalog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors"
              >
                Katalog Jasa Elektronik
              </a>
              <a
                href="#keunggulan"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors"
              >
                Mengapa Memilih Kami
              </a>
              <a
                href="#wilayah"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors"
              >
                Wilayah Panggilan
              </a>
              <a
                href="#galeri"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors"
              >
                Dokumentasi & Galeri
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-zinc-100 transition-colors"
              >
                FAQ & Ketentuan Garansi
              </a>
            </div>

            <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiConsultant();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1A1615] text-[#D4AF37] font-semibold text-xs shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Konsultasi Kerusakan dengan AI Gratis</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] text-white font-bold text-xs shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Pesan Teknisi via WhatsApp (+62 878-7441-7978)</span>
              </a>

              {isAdmin ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-zinc-800 text-white text-xs font-semibold text-center"
                  >
                    Buka Dashboard Admin
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="py-2 px-3 rounded-lg border border-red-200 text-red-600 text-xs font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2 px-4 rounded-lg border border-zinc-300 text-zinc-700 text-xs font-medium text-center"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
