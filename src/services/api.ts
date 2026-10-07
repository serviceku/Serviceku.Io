/**
 * API Service for Serviceku Frontend
 */
import { APP_CONFIG, ServiceItem, BannerItem } from '../appConfig';

const BASE_URL = '/api';

export interface AdminUser {
  username: string;
  role: string;
}

export const api = {
  // Services
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      const json = await res.json();
      return json.data || APP_CONFIG.products;
    } catch (err) {
      console.warn('Using fallback products data:', err);
      return APP_CONFIG.products;
    }
  },

  async createService(item: Partial<ServiceItem>, token: string): Promise<ServiceItem> {
    const res = await fetch(`${BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Gagal menambahkan jasa');
    }
    const json = await res.json();
    return json.data;
  },

  async updateService(id: string, item: Partial<ServiceItem>, token: string): Promise<ServiceItem> {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Gagal mengupdate jasa');
    }
    const json = await res.json();
    return json.data;
  },

  async deleteService(id: string, token: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Gagal menghapus jasa');
    return true;
  },

  // Banners
  async getBanners(): Promise<BannerItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/banners`);
      if (!res.ok) throw new Error('Failed to fetch banners');
      const json = await res.json();
      return json.data || APP_CONFIG.banners;
    } catch (err) {
      console.warn('Using fallback banners data:', err);
      return APP_CONFIG.banners;
    }
  },

  async createBanner(banner: Partial<BannerItem>, token: string): Promise<BannerItem> {
    const res = await fetch(`${BASE_URL}/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(banner),
    });
    if (!res.ok) throw new Error('Gagal menambahkan banner');
    const json = await res.json();
    return json.data;
  },

  async deleteBanner(id: string, token: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/banners/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Gagal menghapus banner');
    return true;
  },

  // Admin Auth
  async login(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Username atau password salah');
    }
    return { token: json.token, user: json.user };
  },

  async verifyToken(token: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async updateAdminCredentials(newUsername: string, newPassword: string, token: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/admin/credentials`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newUsername, newPassword }),
    });
    if (!res.ok) throw new Error('Gagal mengupdate kredensial admin');
    return true;
  },

  // AI Recommendation
  async getAiDiagnosis(payload: {
    appliance: string;
    problem: string;
    customerLocation?: string;
    note?: string;
  }): Promise<string> {
    try {
      const res = await fetch(`${BASE_URL}/recommendation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.diagnosis) {
        return json.diagnosis;
      }
      throw new Error(json.error || 'Gagal memproses analisa');
    } catch (err) {
      console.warn('Network issue or fallback triggered for diagnosis:', err);
      return `### 📋 Hasil Diagnosa Awal Teknisi Serviceku

**Peralatan:** ${payload.appliance || 'Elektronik Rumah Tangga'}
**Keluhan:** "${payload.problem}"
**Lokasi:** ${payload.customerLocation || 'Indramayu / Cirebon / Majalengka'}

---

**🔍 Kemungkinan Penyebab Kerusakan:**
1. Penurunan efisiensi sirkulasi pendingin atau freon berkurang pada sambungan pipa.
2. Penumpukan kotoran tebal pada filter, kisi evaporator, atau sirip kondensor.
3. Kapasitor motor atau modul elektronik memerlukan pengecekan fisik lebih lanjut.

**⚠️ Tindakan Pencegahan Darurat:**
- Pastikan stop kontak dalam keadaan aman dan kering.
- Jika tercium aroma panas atau suara mendengung tanpa perputaran mesin, matikan daya untuk melindungi kompresor dan dinamo.

**🛠️ Rekomendasi Serviceku:**
Tim teknisi kami siap langsung datang ke rumah Anda di wilayah Indramayu, Cirebon, & Majalengka dengan garansi service resmi 30 hari.`;
    }
  },
};
