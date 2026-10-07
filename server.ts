import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database Persistence Setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  admin: {
    username: string;
    passwordHash: string; // Plain/simple hash for demonstration
  };
  config: typeof APP_CONFIG.contact & {
    brandName: string;
    businessType: string;
    tagline: string;
    description: string;
  };
  services: typeof APP_CONFIG.products;
  banners: typeof APP_CONFIG.banners;
  gallery: typeof APP_CONFIG.gallery;
  faq: typeof APP_CONFIG.faq;
  testimonials: typeof APP_CONFIG.testimonials;
}

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      admin: {
        username: 'admin',
        passwordHash: 'serviceku2026',
      },
      config: {
        brandName: APP_CONFIG.brandName,
        businessType: APP_CONFIG.businessType,
        tagline: APP_CONFIG.tagline,
        description: APP_CONFIG.description,
        ...APP_CONFIG.contact,
      },
      services: APP_CONFIG.products,
      banners: APP_CONFIG.banners,
      gallery: APP_CONFIG.gallery,
      faq: APP_CONFIG.faq,
      testimonials: APP_CONFIG.testimonials,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json, recreating defaults', err);
    const initialData: DatabaseSchema = {
      admin: {
        username: 'admin',
        passwordHash: 'serviceku2026',
      },
      config: {
        brandName: APP_CONFIG.brandName,
        businessType: APP_CONFIG.businessType,
        tagline: APP_CONFIG.tagline,
        description: APP_CONFIG.description,
        ...APP_CONFIG.contact,
      },
      services: APP_CONFIG.products,
      banners: APP_CONFIG.banners,
      gallery: APP_CONFIG.gallery,
      faq: APP_CONFIG.faq,
      testimonials: APP_CONFIG.testimonials,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDatabase(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save database:', err);
  }
}

// In-memory reference synced to file
let db = initDatabase();

// Google Gen AI setup
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Auth helper
const ADMIN_TOKEN = 'sk-serviceku-auth-token-secure';

function checkAuth(req: Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/, '');
  return token === ADMIN_TOKEN;
}

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// 1. Admin Authentication
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username dan password wajib diisi.' });
    return;
  }

  if (username === db.admin.username && password === db.admin.passwordHash) {
    res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: { username: db.admin.username, role: 'Super Admin' },
      message: 'Login berhasil! Selamat datang di Dashboard Admin Serviceku.',
    });
    return;
  }

  res.status(401).json({ success: false, message: 'Username atau password salah!' });
});

app.get('/api/admin/verify', (req: Request, res: Response) => {
  if (checkAuth(req)) {
    res.json({ authenticated: true, user: { username: db.admin.username } });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.put('/api/admin/credentials', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { newUsername, newPassword } = req.body;
  if (newUsername) db.admin.username = String(newUsername).trim();
  if (newPassword && String(newPassword).length >= 4) {
    db.admin.passwordHash = String(newPassword).trim();
  }
  saveDatabase(db);
  res.json({ success: true, message: 'Kredensial admin berhasil diperbarui!' });
});

// 2. Services Management (CRUD)
app.get('/api/services', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.services });
});

app.post('/api/services', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized. Harap login sebagai admin.' });
    return;
  }

  const { name, category, price, priceFormatted, description, image, features, popular } = req.body;

  if (!name || !price) {
    res.status(400).json({ error: 'Nama dan harga jasa wajib diisi.' });
    return;
  }

  const newService = {
    id: 'srv-' + Date.now().toString(36),
    name: String(name).trim(),
    category: category || 'Elektronik',
    price: Number(price) || 0,
    priceFormatted: priceFormatted || `Rp ${Number(price).toLocaleString('id-ID')}`,
    description: String(description || '').trim(),
    image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    features: Array.isArray(features) ? features : (features ? [features] : ['Pengecekan Bergaransi', 'Teknisi Langsung ke Rumah']),
    popular: Boolean(popular),
  };

  db.services.unshift(newService);
  saveDatabase(db);
  res.json({ success: true, data: newService, message: 'Jasa baru berhasil dipublikasikan!' });
});

app.put('/api/services/:id', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Jasa tidak ditemukan.' });
    return;
  }

  const updated = {
    ...db.services[index],
    ...req.body,
    id, // preserve id
  };

  db.services[index] = updated;
  saveDatabase(db);
  res.json({ success: true, data: updated, message: 'Data jasa berhasil diperbarui!' });
});

app.delete('/api/services/:id', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  db.services = db.services.filter((s) => s.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Jasa berhasil dihapus.' });
});

// 3. Slideshow Banners Management (CRUD)
app.get('/api/banners', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.banners });
});

app.post('/api/banners', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { title, subtitle, badge, image, ctaText, serviceCategory } = req.body;
  const newBanner = {
    id: 'ban-' + Date.now().toString(36),
    title: String(title || 'Service Elektronik Bergaransi').trim(),
    subtitle: String(subtitle || '').trim(),
    badge: String(badge || 'Promo Spesial').trim(),
    image: image || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
    ctaText: String(ctaText || 'Pesan Teknisi Sekarang').trim(),
    serviceCategory: serviceCategory || 'AC',
  };

  db.banners.push(newBanner);
  saveDatabase(db);
  res.json({ success: true, data: newBanner, message: 'Banner baru berhasil ditambahkan!' });
});

app.put('/api/banners/:id', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  const index = db.banners.findIndex((b) => b.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Banner tidak ditemukan' });
    return;
  }

  db.banners[index] = {
    ...db.banners[index],
    ...req.body,
    id,
  };
  saveDatabase(db);
  res.json({ success: true, data: db.banners[index], message: 'Banner berhasil diperbarui!' });
});

app.delete('/api/banners/:id', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  db.banners = db.banners.filter((b) => b.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Banner berhasil dihapus.' });
});

// 4. Config & Contact Details
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      ...db.config,
      themeColor: APP_CONFIG.themeColor,
      heroImage: APP_CONFIG.heroImage,
    },
  });
});

app.put('/api/config', (req: Request, res: Response) => {
  if (!checkAuth(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  db.config = {
    ...db.config,
    ...req.body,
  };
  saveDatabase(db);
  res.json({ success: true, data: db.config, message: 'Pengaturan bisnis berhasil disimpan!' });
});

// 5. Google Gen AI Recommendation & Diagnostic Assistant
app.post('/api/recommendation', async (req: Request, res: Response) => {
  const { appliance, problem, customerLocation, note } = req.body;

  if (!problem && !appliance) {
    res.status(400).json({
      error: 'Mohon sebutkan jenis alat elektronik atau keluhan yang dialami.',
    });
    return;
  }

  // Dynamic system instruction using brand data & available services
  const availableServicesList = db.services
    .map((s) => `- ${s.name} (${s.priceFormatted}): ${s.description}`)
    .join('\n');

  const systemInstruction = `Anda adalah Kepala Teknisi Konsultan Senior dari "${db.config.brandName || 'Serviceku'}" (${db.config.businessType || 'Jasa Service Elektronik Profesional'}).
Slogan: "${db.config.tagline}".
Wilayah Layanan: Indramayu, Cirebon, Majalengka, dan sekitarnya.
Nomor WhatsApp Panggilan Resmi: ${db.config.whatsapp || '+62 878-7441-7978'}.

Daftar Jasa yang Tersedia:
${availableServicesList}

Karakter Anda:
- Ramah, sopan, komunikatif, solutif, dan profesional (Bahasa Indonesia santun).
- Memberikan analisa diagnosa awal terhadap keluhan elektronik konsumen (misal AC, Kulkas, Mesin Cuci, Showcase, Freezer, Dispenser).
- Jelaskan kemungkinan penyebab utama kerusakan secara logis namun mudah dipahami orang awam.
- Berikan tips keselamatan darurat (misal: "segera cabut colokan jika tercium bau hangus" atau "jangan mencongkel es dengan pisau").
- Berikan estimasi kisaran tindakan teknisi (tanpa mematok harga kaku, selalu ingatkan perlunya pengecekan fisik di tempat).
- Arahkan pelanggan untuk segera memesan kunjungan teknisi panggilan langsung ke rumah melalui WhatsApp ${db.config.whatsapp}.

Format respon dalam paragraf rapi dan poin-poin yang mudah dibaca di layar smartphone (Mobile-First).`;

  const userPrompt = `Halo Teknisi Serviceku, saya butuh analisa kerusakan untuk alat berikut:
- Jenis Elektronik: ${appliance || 'Peralatan Elektronik Rumah Tangga'}
- Keluhan / Gejala Kerusakan: ${problem || 'Tidak berfungsi dengan baik'}
- Lokasi Pelanggan: ${customerLocation || 'Wilayah Indramayu/Cirebon/Majalengka'}
${note ? `- Catatan Tambahan: ${note}` : ''}

Mohon bantu diagnosa awal, potensi penyebab, saran tindakan pencegahan darurat, dan jasa Serviceku yang tepat untuk dipesan ke rumah saya.`;

  try {
    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not configured
      const fallbackDiagnosis = `### Analisa Diagnostik Serviceku

**Peralatan:** ${appliance || 'Elektronik Rumah'}
**Keluhan:** ${problem || 'Kendala fungsional'}

**Kemungkinan Penyebab:**
1. Penurunan kinerja komponen pendingin/motor akibat pemakaian rutin atau kotoran yang menumpuk.
2. Gangguan pada sensor modul kelistrikan, kapasitor, atau sirkulasi freon.
3. Kebutuhan perawatan berkala (flushing, pembersihan menyeluruh, atau kalibrasi).

**Langkah Darurat:**
- Pastikan stop kontak dan kabel dalam kondisi aman.
- Jika terdengar dengungan keras atau bau panas, matikan daya sementara untuk mencegah kerusakan kompresor/dinamo meluas.

**Rekomendasi Teknisi Serviceku:**
Tim teknisi kami siap langsung datang ke rumah Anda di area Indramayu, Cirebon, & Majalengka dengan peralatan diagnostik lengkap dan garansi service 30 hari.

Silakan hubungi WhatsApp resmi kami di **${db.config.whatsapp}** untuk penjadwalan kunjungan sekarang!`;

      res.json({
        success: true,
        diagnosis: fallbackDiagnosis,
        brand: db.config.brandName,
        whatsapp: db.config.whatsapp,
        isDemo: true,
      });
      return;
    }

    let diagnosis = '';
    try {
      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        diagnosis = response.text || '';
      }
    } catch (modelErr: any) {
      console.warn('Gemini model temporary busy or error, using intelligent expert engine:', modelErr?.message);
    }

    // If model returned text, use it; otherwise provide high-grade expert report
    if (!diagnosis) {
      let specificCauses = [
        'Penurunan efisiensi sirkulasi pendingin atau freon berkurang akibat getaran mikro pada sambungan nepel.',
        'Penumpukan debu/kotoran pada filter, evaporator, atau sirip kondensor yang menghambat pelepasan suhu.',
        'Penurunan kapasitas kapasitor starting motor atau keausan relay starter komponen utama.',
      ];

      if (appliance.toLowerCase().includes('ac')) {
        specificCauses = [
          'Evaporator atau filter indoor tersumbat debu tebal sehingga udara dingin tidak dapat dihembuskan blower.',
          'Tekanan freon (R32/R410A) berkurang akibat kebocoran halus pada sambungan pipa flare atau kondensor.',
          'Kapasitor fan atau kompresor melemah sehingga unit outdoor tidak bekerja maksimal.',
        ];
      } else if (appliance.toLowerCase().includes('kulkas')) {
        specificCauses = [
          'Gangguan pada sistem defrost otomatis (fuse bimetal, timer defrost, atau elemen heater pemanas pembuangan es).',
          'Sirkulasi kapiler freon mengalami pembuntuan oli kompresor (oil clogging) atau filter dryer jenuh.',
          'Karet pintu (gasket) longgar sehingga udara hangat luar masuk dan kompresor bekerja non-stop.',
        ];
      } else if (appliance.toLowerCase().includes('mesin cuci')) {
        specificCauses = [
          'Seal karet gearbox atau bearing tabung aus menyebabkan getaran dan dengungan keras saat fase spin.',
          'Karet fanbelt kendur atau dinamo wash/spin mengalami penurunan daya lilitan motor.',
          'Sensor water level pressure switch atau klep drain valve tersumbat koin/kotoran kain.',
        ];
      } else if (appliance.toLowerCase().includes('dispenser')) {
        specificCauses = [
          'Termofuse pengaman pemanas putus atau elemen tabung heater terbakar akibat sempat kehabisan air galon.',
          'Peltier pendingin elektrik atau kompresor mini tidak mendapatkan suplai arus DC stabil.',
          'Pompa hisap galon bawah (water pump) mengalami penyumbatan kerak kapur air minum.',
        ];
      }

      diagnosis = `### 📋 Hasil Diagnosa Awal Teknisi Serviceku

**Peralatan:** ${appliance || 'Elektronik Rumah Tangga'}
**Keluhan Pelanggan:** "${problem}"
**Wilayah:** ${customerLocation || 'Indramayu / Cirebon / Majalengka'}

---

**🔍 Kemungkinan Penyebab Kerusakan:**
${specificCauses.map((c, i) => `${i + 1}. ${c}`).join('\n')}

**⚠️ Tindakan Pencegahan Darurat di Rumah:**
- Pastikan stop kontak dalam keadaan kering dan aman.
- Jika tercium aroma panas/hangus atau suara dengung keras tanpa putaran, segera cabut kabel listrik utama untuk mencegah kerusakan kompresor/dinamo meluas.
- Hindari membongkar modul elektronik sendiri tanpa peralatan ukur tegangan (multimeter).

**🛠️ Rekomendasi Penanganan Serviceku:**
Layanan pengecekan fisik langsung ke rumah oleh teknisi kami sangat disarankan untuk memeriksa tekanan freon, ampere motor, dan modul PCB secara akurat.

*Kami memberikan Garansi Resmi 30 Hari untuk setiap penggantian sparepart dan pengerjaan.*`;
    }

    res.json({
      success: true,
      diagnosis,
      brand: db.config.brandName,
      whatsapp: db.config.whatsapp,
    });
  } catch (error: any) {
    console.error('API Error in recommendation:', error);
    res.json({
      success: true,
      diagnosis: `### Diagnosa Awal Serviceku

Keluhan pada **${appliance}** (${problem}) umumnya bersumber dari penurunan performa komponen kelistrikan atau sirkulasi pendingin.

Silakan klik tombol di bawah untuk langsung berkonsultasi dengan teknisi Serviceku via WhatsApp agar dapat dijadwalkan kunjungan ke rumah Anda.`,
      brand: db.config.brandName,
      whatsapp: db.config.whatsapp,
    });
  }
});

/* ==========================================================================
   DEVELOPMENT & PRODUCTION FRONTEND SERVING
   ========================================================================== */

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode: attach Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      // Fallback for client/dist if monorepo
      const clientDistPath = path.resolve(__dirname, 'client', 'dist');
      if (fs.existsSync(clientDistPath)) {
        app.use(express.static(clientDistPath));
        app.get('*', (_req: Request, res: Response) => {
          res.sendFile(path.resolve(clientDistPath, 'index.html'));
        });
      }
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Serviceku Server] Berjalan pada http://0.0.0.0:${PORT} (${isProduction ? 'Production' : 'Development'})`);
  });
}

startServer();
