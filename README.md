# Serviceku - World-Class Business Website
> **Jasa Service Elektronik Profesional Panggilan (Indramayu, Cirebon, & Majalengka)**  
> *Standar Arsitektur: Satelitweb Zero-Slop, Mobile-First, Production-Grade Architecture*

---

## 🌟 Ringkasan Proyek

**Serviceku** adalah platform website bisnis modern dan mewah untuk layanan perbaikan elektronik panggilan langsung ke rumah konsumen di area **Indramayu, Cirebon, dan Majalengka**.

Website ini dilengkapi sistem manajemen konten mandiri (Admin Dashboard) untuk mempublikasikan foto dan jasa baru secara permanen, slideshow banner infografis gradasi, tombol pemesanan langsung WhatsApp, serta integrasi resmi **Google Gemini AI (@google/genai)** sebagai asisten diagnosa awal kerusakan elektronik bagi konsumen.

---

## ⚙️ Tech Stack & Spesifikasi

- **Frontend:** React 19 / Vite + Tailwind CSS + Google Font *"Plus Jakarta Sans"* + Lucide React Icons
- **Backend:** Express.js (Node.js ESM)
- **AI Engine:** Official Google Gen AI SDK (`@google/genai`) dengan model `gemini-3.8-flash`
- **Data Persistence:** Server-side JSON database (`data/db.json`) dengan sinkronisasi permanen antar perangkat
- **Ready for:** cPanel Node.js Selector (Satelitweb) & Google Cloud Run

---

## 🚀 Panduan Pengujian & Menjalankan Lokal

### 1. Prasyarat
- Node.js versi 18+ atau 20+
- NPM atau PNPM

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (`.env`)
Salin file `.env.example` ke `.env`:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=3000
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Akses website melalui browser di: `http://localhost:3000`

### 5. Build Produksi
```bash
npm run build
npm start
```

---

## 🔐 Akun & Kredensial Admin Bawaan

Tombol **Admin Login** terletak di navigasi kanan atas:
- **Username:** `admin`
- **Password:** `serviceku2026`
*(Dilengkapi fitur tombol icon mata untuk melihat password)*

### Fitur Dashboard Admin:
1. **Kelola Jasa & Foto:**
   - Tambah atau edit nama jasa, harga dasar, label harga, dan deskripsi.
   - Masukkan URL foto Unsplash atau gambar langsung dengan fitur **Live Image Preview**.
   - Input checklist poin pengerjaan teknisi.
   - Centang opsi *Paling Sering Dipesan*.
   - Hapus jasa secara permanen.
2. **Kelola Slideshow Banner Infografis:**
   - Tambah banner baru dengan judul, subtitle, badge promosi, dan foto.
   - Hapus banner yang tidak aktif.
3. **Pengaturan Kredensial:**
   - Ganti username dan password admin secara mandiri.

---

## 🌐 Panduan Deployment cPanel Satelitweb (Node.js Selector)

Aplikasi ini sudah dirancang **100% cPanel Ready** dengan entry point `app.js`.

### Langkah-Langkah Deploy di cPanel:

1. **Build Aplikasi Terlebih Dahulu (Lokal atau di Server):**
   ```bash
   npm run build
   ```
   Folder `dist/` akan dihasilkan berisi bundle React yang optimal.

2. **Upload Berkas ke cPanel:**
   Buka **File Manager** cPanel, buat folder aplikasi (misal: `/home/username/serviceku`) dan upload file berikut:
   - `dist/` (hasil build)
   - `data/` (folder database JSON)
   - `package.json`
   - `app.js` (Startup file cPanel)
   - `appConfig.js`
   - `.env`

3. **Buka Menu "Setup Node.js App" di cPanel:**
   - Klik **Create Application**.
   - **Node.js Version:** Pilih versi `18.x`, `20.x`, atau `22.x`.
   - **Application Mode:** Pilih `Production`.
   - **Application Root:** Masukkan path folder aplikasi (contoh: `serviceku`).
   - **Application Startup File:** Ketik `app.js`.
   - **Application URL:** Pilih domain atau subdomain Anda.
   - Klik tombol **Create**.

4. **Konfigurasi Environment Variable di cPanel:**
   Pada bagian **Environment Variables** di cPanel:
   - `GEMINI_API_KEY` : Masukkan API key Google AI Studio Anda.
   - `PORT` : Dibiarkan default (cPanel akan mengatur port internal secara otomatis).

5. **Install Dependensi di cPanel:**
   - Klik tombol **Run NPM Install** pada antarmuka cPanel Node.js.
   - Atau masuk via Terminal SSH cPanel:
     ```bash
     cd /home/username/serviceku
     npm install --production
     ```

6. **Restart Aplikasi:**
   - Klik tombol **Restart** di antarmuka cPanel Node.js Selector.
   - Buka domain Anda di browser. Website Serviceku siap menerima pelanggan!

---

## 📞 Kontak & Informasi Bisnis

- **Brand:** Serviceku (Jasa Service Elektronik Profesional)
- **WhatsApp Resmi:** `+62 878-7441-7978`
- **Email:** `serviceku31@gmail.com`
- **Alamat:** Jl. By Pass Binaria - Bondan, Kertasmaya, Indramayu
- **Jangkauan Panggilan:** Indramayu, Cirebon, & Majalengka
- **Jam Operasional:** Setiap Hari, 07:30 - 20:00 WIB
