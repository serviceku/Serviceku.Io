import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Image as ImageIcon, 
  Eye, 
  EyeOff, 
  Check, 
  RefreshCw, 
  Sliders, 
  Layout, 
  Lock, 
  Phone, 
  MapPin, 
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ServiceItem, BannerItem, APP_CONFIG } from '../appConfig';
import { api } from '../services/api';
import { ImageWithFallback } from './ImageWithFallback';

import { ServicekuLogo } from './ServicekuLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  adminUsername: string;
  services: ServiceItem[];
  banners: BannerItem[];
  onRefreshData: () => Promise<void>;
  onLogout: () => void;
  initialEditingService?: ServiceItem | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  token,
  adminUsername,
  services,
  banners,
  onRefreshData,
  onLogout,
  initialEditingService,
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'banners' | 'settings'>('services');
  
  // Service form state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('AC');
  const [servicePrice, setServicePrice] = useState<number>(75000);
  const [servicePriceFormatted, setServicePriceFormatted] = useState('Mulai Rp 75.000');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImage, setServiceImage] = useState(
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop'
  );
  const [serviceFeatures, setServiceFeatures] = useState(
    'Pemeriksaan Tekanan Freon\nPembersihan Evaporator Higienis\nGaransi Service 30 Hari'
  );
  const [servicePopular, setServicePopular] = useState(false);

  // Banner form state
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerBadge, setBannerBadge] = useState('Garansi 30 Hari');
  const [bannerImage, setBannerImage] = useState(
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
  );
  const [bannerCta, setBannerCta] = useState('Pesan Teknisi Sekarang');
  const [bannerCategory, setBannerCategory] = useState('AC');

  // Admin Credentials State
  const [newUsername, setNewUsername] = useState(adminUsername || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State feedback
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pre-fill if editing triggered externally
  useEffect(() => {
    if (initialEditingService) {
      handleEditService(initialEditingService);
      setActiveTab('services');
    }
  }, [initialEditingService]);

  if (!isOpen) return null;

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEditService = (s: ServiceItem) => {
    setEditingServiceId(s.id);
    setServiceName(s.name);
    setServiceCategory(s.category);
    setServicePrice(s.price);
    setServicePriceFormatted(s.priceFormatted || `Mulai Rp ${s.price.toLocaleString('id-ID')}`);
    setServiceDescription(s.description);
    setServiceImage(s.image);
    setServiceFeatures(Array.isArray(s.features) ? s.features.join('\n') : '');
    setServicePopular(Boolean(s.popular));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetServiceForm = () => {
    setEditingServiceId(null);
    setServiceName('');
    setServiceCategory('AC');
    setServicePrice(65000);
    setServicePriceFormatted('Mulai Rp 65.000');
    setServiceDescription('');
    setServiceImage('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop');
    setServiceFeatures('Pengecekan Komponen Bergaransi\nTeknisi Langsung ke Rumah');
    setServicePopular(false);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      showToast('error', 'Nama jasa wajib diisi');
      return;
    }

    setIsLoading(true);
    const featuresList = serviceFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Partial<ServiceItem> = {
      name: serviceName.trim(),
      category: serviceCategory,
      price: Number(servicePrice) || 0,
      priceFormatted: servicePriceFormatted.trim() || `Mulai Rp ${Number(servicePrice).toLocaleString('id-ID')}`,
      description: serviceDescription.trim(),
      image: serviceImage.trim(),
      features: featuresList,
      popular: servicePopular,
    };

    try {
      if (editingServiceId) {
        await api.updateService(editingServiceId, payload, token);
        showToast('success', `Jasa "${serviceName}" berhasil diperbarui permanen!`);
      } else {
        await api.createService(payload, token);
        showToast('success', `Jasa "${serviceName}" berhasil dipublikasikan permanen!`);
      }
      await onRefreshData();
      handleResetServiceForm();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan jasa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    try {
      if (typeof window !== 'undefined' && window.confirm && !window.confirm(`Yakin ingin menghapus jasa "${name}" secara permanen?`)) return;
    } catch {
      // Continue if confirm is restricted by sandbox
    }
    setIsLoading(true);
    try {
      await api.deleteService(id, token);
      showToast('success', `Jasa "${name}" telah dihapus.`);
      await onRefreshData();
      if (editingServiceId === id) handleResetServiceForm();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menghapus jasa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim()) {
      showToast('error', 'Judul banner wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      await api.createBanner(
        {
          title: bannerTitle.trim(),
          subtitle: bannerSubtitle.trim(),
          badge: bannerBadge.trim(),
          image: bannerImage.trim(),
          ctaText: bannerCta.trim(),
          serviceCategory: bannerCategory,
        },
        token
      );
      showToast('success', 'Banner slideshow baru berhasil ditambahkan permanen!');
      await onRefreshData();
      setBannerTitle('');
      setBannerSubtitle('');
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menambahkan banner.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      if (typeof window !== 'undefined' && window.confirm && !window.confirm('Hapus banner slideshow ini?')) return;
    } catch {
      // Continue if sandbox blocks confirm
    }
    setIsLoading(true);
    try {
      await api.deleteBanner(id, token);
      showToast('success', 'Banner slideshow berhasil dihapus.');
      await onRefreshData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menghapus banner.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword.length < 4) {
      showToast('error', 'Password minimal 4 karakter');
      return;
    }

    setIsLoading(true);
    try {
      await api.updateAdminCredentials(newUsername, newPassword, token);
      showToast('success', 'Kredensial login admin berhasil diperbarui!');
      setNewPassword('');
    } catch (err: any) {
      showToast('error', err.message || 'Gagal memperbarui kredensial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#1A1615] px-6 py-4 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-xs">
              <img src="/serviceku-logo.svg" alt="Serviceku" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#FAF8F5]">
                Dashboard Admin Serviceku
              </h3>
              <p className="text-[11px] text-zinc-400">
                Pusat Publikasi Jasa, Foto & Slideshow Banner Permanen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors cursor-pointer"
            >
              Keluar
            </button>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-zinc-100 px-6 py-2.5 border-b border-zinc-200 flex items-center justify-between shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-[#1A1615] shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Kelola Jasa & Foto ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'banners'
                  ? 'bg-white text-[#1A1615] shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Kelola Slideshow Banner ({banners.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white text-[#1A1615] shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Pengaturan Kredensial
            </button>
          </div>

          <div className="text-[11px] text-zinc-500 hidden sm:block">
            Penyimpanan: <span className="font-semibold text-emerald-600">Permanen (Server Sync)</span>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* Add / Edit Form Card */}
              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/30 flex items-center justify-center text-[#1A1615] font-bold text-xs">
                      {editingServiceId ? '✎' : '+'}
                    </div>
                    <h4 className="text-sm font-extrabold text-[#1A1615]">
                      {editingServiceId ? 'Edit Jasa & Foto Terpilih' : 'Publikasikan Jasa & Foto Baru'}
                    </h4>
                  </div>
                  {editingServiceId && (
                    <button
                      type="button"
                      onClick={handleResetServiceForm}
                      className="text-xs text-zinc-600 hover:text-zinc-900 underline"
                    >
                      Batal Edit (Ganti Tambah Baru)
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama Jasa */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Nama Jasa *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Contoh: Service AC Split 1 PK Inverter"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Kategori */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Kategori Alat
                      </label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      >
                        <option value="AC">AC (Air Conditioner)</option>
                        <option value="Kulkas">Kulkas & Refrigerator</option>
                        <option value="Mesin Cuci">Mesin Cuci</option>
                        <option value="Showcase">Showcase & Chiller</option>
                        <option value="Freezer Box">Freezer Box</option>
                        <option value="Dispenser">Dispenser Galon</option>
                        <option value="Elektronik Lainnya">Elektronik Lainnya</option>
                      </select>
                    </div>

                    {/* Harga Angka */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Estimasi Biaya Dasar (Rp) *
                      </label>
                      <input
                        type="number"
                        required
                        value={servicePrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setServicePrice(val);
                          setServicePriceFormatted(`Mulai Rp ${val.toLocaleString('id-ID')}`);
                        }}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Format Teks Harga */}
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Label Tarif Tampilan
                      </label>
                      <input
                        type="text"
                        value={servicePriceFormatted}
                        onChange={(e) => setServicePriceFormatted(e.target.value)}
                        placeholder="Contoh: Mulai Rp 65.000 / unit"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Deskripsi Jasa & Solusi Kerusakan
                    </label>
                    <textarea
                      rows={2}
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Jelaskan jenis penanganan, kerusakan yang diatasi, garansi pengerjaan..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Foto Jasa URL & Live Preview */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      URL Foto Jasa (Unsplash Direct Link / Gambar)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        required
                        value={serviceImage}
                        onChange={(e) => setServiceImage(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                    
                    {/* Live Preview of image */}
                    {serviceImage && (
                      <div className="mt-2.5 p-3 rounded-xl bg-white border border-zinc-200 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-200">
                          <ImageWithFallback
                            src={serviceImage}
                            alt="Live Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xs text-zinc-600">
                          <span className="font-bold text-zinc-800 block">Preview Foto Langsung:</span>
                          Gambar di atas adalah tampilan foto yang akan langsung muncul pada kartu layanan di beranda untuk semua pengunjung.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fitur & Checklist Pengerjaan */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Poin Keunggulan / Cakupan Pengerjaan (1 Baris = 1 Poin)
                    </label>
                    <textarea
                      rows={3}
                      value={serviceFeatures}
                      onChange={(e) => setServiceFeatures(e.target.value)}
                      placeholder="Cuci AC Bertekanan Tinggi&#10;Pengecekan Tekanan Freon&#10;Garansi 30 Hari"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 font-mono text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Popular check */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="popCheck"
                      checked={servicePopular}
                      onChange={(e) => setServicePopular(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="popCheck" className="text-xs font-semibold text-zinc-700">
                      Tandai sebagai Layanan Paling Sering Dipesan (Badge Khusus)
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end gap-3">
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={handleResetServiceForm}
                        className="px-4 py-2.5 text-xs font-semibold text-zinc-600 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#1A1615] bg-[#D4AF37] hover:bg-[#c5a028] disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingServiceId ? 'Simpan Perubahan Jasa' : 'Publikasikan Sekarang'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Published Services */}
              <div>
                <h4 className="text-sm font-extrabold text-[#1A1615] mb-3">
                  Daftar Jasa yang Sedang Aktif ({services.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase font-bold text-[#C5A028]">
                            {item.category}
                          </span>
                          <h5 className="text-xs font-bold text-zinc-900 truncate">{item.name}</h5>
                          <p className="text-xs font-extrabold text-[#1A1615] mt-0.5">
                            {item.priceFormatted}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditService(item)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 cursor-pointer"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteService(item.id, item.name)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BANNERS MANAGEMENT */}
          {activeTab === 'banners' && (
            <div className="space-y-8">
              {/* Add Banner Form */}
              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/30 flex items-center justify-center text-[#1A1615] font-bold text-xs">
                    +
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1A1615]">
                    Tambah Banner Slideshow Infografis Baru
                  </h4>
                </div>

                <form onSubmit={handleSaveBanner} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Judul Utama Banner *
                      </label>
                      <input
                        type="text"
                        required
                        value={bannerTitle}
                        onChange={(e) => setBannerTitle(e.target.value)}
                        placeholder="Contoh: Service AC Dingin Maksimal"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Badge / Label Tag
                      </label>
                      <input
                        type="text"
                        value={bannerBadge}
                        onChange={(e) => setBannerBadge(e.target.value)}
                        placeholder="Contoh: Garansi 30 Hari / Promo"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Deskripsi / Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={bannerSubtitle}
                      onChange={(e) => setBannerSubtitle(e.target.value)}
                      placeholder="Penjelasan keunggulan layanan atau teknisi..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Teks Tombol CTA
                      </label>
                      <input
                        type="text"
                        value={bannerCta}
                        onChange={(e) => setBannerCta(e.target.value)}
                        placeholder="Contoh: Pesan Teknisi AC Sekarang"
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                        Kategori Layanan Terkait
                      </label>
                      <select
                        value={bannerCategory}
                        onChange={(e) => setBannerCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      >
                        <option value="AC">AC</option>
                        <option value="Kulkas">Kulkas</option>
                        <option value="Mesin Cuci">Mesin Cuci</option>
                        <option value="Showcase">Showcase</option>
                        <option value="Dispenser">Dispenser</option>
                        <option value="Freezer Box">Freezer Box</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      URL Foto Banner (Unsplash / Image Direct Link)
                    </label>
                    <input
                      type="url"
                      required
                      value={bannerImage}
                      onChange={(e) => setBannerImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                    {bannerImage && (
                      <div className="mt-2.5 h-32 rounded-xl overflow-hidden border border-zinc-200">
                        <ImageWithFallback
                          src={bannerImage}
                          alt="Banner Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#1A1615] bg-[#D4AF37] hover:bg-[#c5a028] disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Banner ke Slideshow</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Active Banners */}
              <div>
                <h4 className="text-sm font-extrabold text-[#1A1615] mb-3">
                  Banner Slideshow yang Aktif ({banners.length})
                </h4>
                <div className="space-y-3">
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200">
                          <ImageWithFallback
                            src={b.image}
                            alt={b.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-black px-1.5 py-0.5 rounded">
                            {b.badge}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-zinc-900 truncate mt-1">
                            {b.title}
                          </h5>
                          <p className="text-[11px] text-zinc-500 truncate">{b.subtitle}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteBanner(b.id)}
                        disabled={banners.length <= 1}
                        title={banners.length <= 1 ? 'Minimal harus ada 1 banner' : 'Hapus banner'}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADMIN SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-zinc-200/90 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-sm font-extrabold text-[#1A1615]">
                    Ubah Kredensial Login Admin
                  </h4>
                </div>

                <form onSubmit={handleUpdateCredentials} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Username Baru
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                      Password Baru (Kosongkan jika tidak ingin diubah)
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Ketik password baru jika ingin mengubah"
                        className="w-full pl-3.5 pr-10 py-2 text-sm rounded-xl bg-white border border-zinc-200 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label="Toggle password view"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-2.5 text-xs font-bold text-[#1A1615] bg-[#D4AF37] hover:bg-[#c5a028] disabled:opacity-50 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Perbarui Kredensial Admin
                    </button>
                  </div>
                </form>
              </div>

              {/* Information Notice */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-2">
                <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Keamanan & Sinkronisasi Data Permanen
                </span>
                <p>
                  Setiap perubahan jasa, foto, dan banner langsung ditulis ke file database server permanen (`data/db.json`). Data akan tersimpan terus-menerus dan dapat dilihat oleh siapapun dari handphone atau komputer yang berbeda.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
