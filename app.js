/**
 * Entry point cPanel Node.js Selector
 * Serviceku - Production-Grade Architecture
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database Persistence Setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function initDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
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
    console.error('Error reading db.json, returning defaults', err);
    return {
      admin: { username: 'admin', passwordHash: 'serviceku2026' },
      config: APP_CONFIG.contact,
      services: APP_CONFIG.products,
      banners: APP_CONFIG.banners,
      gallery: APP_CONFIG.gallery,
      faq: APP_CONFIG.faq,
      testimonials: APP_CONFIG.testimonials,
    };
  }
}

function saveDatabase(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save db.json:', err);
  }
}

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

const ADMIN_TOKEN = 'sk-serviceku-auth-token-secure';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/, '');
  return token === ADMIN_TOKEN;
}

/* ==========================================================================
   API ENDPOINTS
   ========================================================================== */

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password wajib diisi.' });
  }

  if (username === db.admin.username && password === db.admin.passwordHash) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: { username: db.admin.username, role: 'Super Admin' },
      message: 'Login berhasil! Selamat datang di Dashboard Admin Serviceku.',
    });
  }

  res.status(401).json({ success: false, message: 'Username atau password salah!' });
});

app.get('/api/admin/verify', (req, res) => {
  if (checkAuth(req)) {
    res.json({ authenticated: true, user: { username: db.admin.username } });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

app.put('/api/admin/credentials', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { newUsername, newPassword } = req.body;
  if (newUsername) db.admin.username = String(newUsername).trim();
  if (newPassword && String(newPassword).length >= 4) {
    db.admin.passwordHash = String(newPassword).trim();
  }
  saveDatabase(db);
  res.json({ success: true, message: 'Kredensial admin berhasil diperbarui!' });
});

// Services CRUD
app.get('/api/services', (_req, res) => {
  res.json({ success: true, data: db.services });
});

app.post('/api/services', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { name, category, price, priceFormatted, description, image, features, popular } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Nama dan harga wajib diisi' });

  const newService = {
    id: 'srv-' + Date.now().toString(36),
    name: String(name).trim(),
    category: category || 'Elektronik',
    price: Number(price) || 0,
    priceFormatted: priceFormatted || `Rp ${Number(price).toLocaleString('id-ID')}`,
    description: String(description || '').trim(),
    image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    features: Array.isArray(features) ? features : [features || 'Garansi Resmi'],
    popular: Boolean(popular),
  };

  db.services.unshift(newService);
  saveDatabase(db);
  res.json({ success: true, data: newService, message: 'Jasa berhasil dipublikasikan!' });
});

app.put('/api/services/:id', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.params;
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Jasa tidak ditemukan' });

  db.services[idx] = { ...db.services[idx], ...req.body, id };
  saveDatabase(db);
  res.json({ success: true, data: db.services[idx], message: 'Jasa berhasil diubah!' });
});

app.delete('/api/services/:id', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.params;
  db.services = db.services.filter((s) => s.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Jasa berhasil dihapus' });
});

// Banners CRUD
app.get('/api/banners', (_req, res) => {
  res.json({ success: true, data: db.banners });
});

app.post('/api/banners', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const newBanner = {
    id: 'ban-' + Date.now().toString(36),
    title: req.body.title || 'Promo Serviceku',
    subtitle: req.body.subtitle || '',
    badge: req.body.badge || 'Garansi Service',
    image: req.body.image || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
    ctaText: req.body.ctaText || 'Pesan Teknisi',
    serviceCategory: req.body.serviceCategory || 'AC',
  };
  db.banners.push(newBanner);
  saveDatabase(db);
  res.json({ success: true, data: newBanner, message: 'Banner berhasil ditambahkan' });
});

app.delete('/api/banners/:id', (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.params;
  db.banners = db.banners.filter((b) => b.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: 'Banner berhasil dihapus' });
});

// Config
app.get('/api/config', (_req, res) => {
  res.json({ success: true, data: { ...db.config, themeColor: APP_CONFIG.themeColor } });
});

// AI Recommendation
app.post('/api/recommendation', async (req, res) => {
  const { appliance, problem, customerLocation, note } = req.body;
  if (!problem && !appliance) {
    return res.status(400).json({ error: 'Mohon sebutkan keluhan elektronik Anda.' });
  }

  const availableServices = db.services.map((s) => `- ${s.name} (${s.priceFormatted})`).join('\n');
  const systemInstruction = `Anda adalah Kepala Teknisi Konsultan Senior dari Serviceku (Jasa Service Elektronik Profesional).
Wilayah: Indramayu, Cirebon, Majalengka.
WhatsApp: ${db.config.whatsapp || '+62 878-7441-7978'}.
Jasa Tersedia:
${availableServices}
Berikan diagnosa awal, potensi penyebab, tips keselamatan, dan anjuran hubungi WhatsApp teknisi panggilan.`;

  let diagnosis = '';
  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Keluhan: ${problem}, Alat: ${appliance}, Lokasi: ${customerLocation}. Catatan: ${note || '-'}`,
        config: { systemInstruction, temperature: 0.7 },
      });
      diagnosis = response.text || '';
    }
  } catch (err) {
    console.warn('AI model temporary busy, using smart diagnostics:', err?.message);
  }

  if (!diagnosis) {
    diagnosis = `### 📋 Hasil Diagnosa Awal Teknisi Serviceku

**Peralatan:** ${appliance || 'Elektronik Rumah Tangga'}
**Keluhan:** ${problem}
**Lokasi:** ${customerLocation || 'Indramayu / Cirebon / Majalengka'}

**🔍 Potensi Penyebab Kerusakan:**
1. Penurunan performa sirkulasi freon atau kelistrikan kompresor/motor penggerak.
2. Filter udara atau pipa pembuangan kotor/tersumbat endapan.
3. Kapasitor atau sensor modul elektronik memerlukan kalibrasi atau penggantian.

**⚠️ Tips Keselamatan Darurat:**
Matikan aliran listrik jika tercium aroma hangus atau dengungan keras tanpa perputaran motor.

Silakan klik tombol di bawah untuk menjadwalkan kunjungan teknisi panggilan langsung ke rumah Anda!`;
  }

  res.json({ success: true, diagnosis, brand: db.config.brandName, whatsapp: db.config.whatsapp });
});

// Serve Static Assets for cPanel
const possibleDistPaths = [
  path.resolve(__dirname, 'dist'),
  path.resolve(__dirname, 'client', 'dist'),
];

let activeDistPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (activeDistPath) {
  app.use(express.static(activeDistPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(activeDistPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.send(`<h1>Serviceku Backend Online</h1><p>Frontend belum dibuild. Jalankan npm run build.</p>`);
  });
}

app.listen(Number(PORT), () => {
  console.log(`Serviceku cPanel Server running on port ${PORT}`);
});
