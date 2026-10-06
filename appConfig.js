/**
 * Configuration-Driven Whitelabel System
 * Serviceku - Premium Jasa Service Elektronik
 */

export const APP_CONFIG = {
  brandName: "Serviceku",
  businessType: "Premium Jasa Service Elektronik",
  tagline: "Jasa Service Elektronik Profesional Panggilan",
  description: "Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda di Indramayu, Cirebon, & Majalengka.",
  logo: "/serviceku-logo.svg",
  
  themeColor: {
    primary: "#1A1615",  // Dark Executive Accent
    accent: "#D4AF37",   // Gold Luxury Accent
    bgLight: "#FAF8F5"   // Warm Neutral Ivory
  },

  contact: {
    whatsapp: "+62 878-7441-7978",
    whatsappRaw: "6287874417978",
    email: "serviceku31@gmail.com",
    address: "Jl. By Pass Binaria - Bondan, Kertasmaya, Indramayu (Melayani Panggilan Indramayu, Cirebon, & Majalengka)",
    operatingHours: "Setiap Hari: 07.30 - 20.00 WIB (Siap Tanggap Darurat)",
    serviceAreas: [
      { name: "Indramayu", desc: "Kota, Jatibarang, Karangampel, Kertasmaya, Lohbener, Losarang, Patrol, Haurgeulis" },
      { name: "Cirebon", desc: "Kota Cirebon, Kedawung, Sumber, Weru, Palimanan, Plumbon, Arjawinangun, Kanci" },
      { name: "Majalengka", desc: "Kota Majalengka, Kadipaten, Kertajati, Jatiwangi, Dawuan, Kasokandel, Sukahaji" }
    ]
  },

  heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",

  banners: [
    {
      id: "b1",
      title: "Service AC Bergaransi Dingin Maksimal",
      subtitle: "Cuci AC, Tambah Freon R32/R410/R22, Perbaikan Bocor Air & Modul PCB",
      badge: "Garansi 30 Hari",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Order Service AC Sekarang",
      serviceCategory: "AC"
    },
    {
      id: "b2",
      title: "Spesialis Kulkas, Showcase & Freezer Box",
      subtitle: "Perbaikan Kulkas Tidak Dingin, Kompresor Mati, Bocor Freon & Karet Pintu",
      badge: "Teknisi Panggilan Langsung",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Konsultasi Kulkas",
      serviceCategory: "Kulkas"
    },
    {
      id: "b3",
      title: "Reparasi Mesin Cuci 1 Tabung & 2 Tabung",
      subtitle: "Atasi Error Kode, Pengering Tidak Berputar, Bocor Air, & Penggantian Dinamo",
      badge: "Sparepart Original",
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Panggil Teknisi Mesin Cuci",
      serviceCategory: "Mesin Cuci"
    },
    {
      id: "b4",
      title: "Service Dispenser & Peralatan Pendingin",
      subtitle: "Dispenser Panas/Dingin Mati, Air Bau, Pembersihan Tangki Higienis Total",
      badge: "Cepat & Rapi",
      image: "https://images.unsplash.com/photo-1548834925-e48f8a27b874?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Chat Teknisi Dispenser",
      serviceCategory: "Dispenser"
    }
  ],

  products: [
    {
      id: "srv-ac",
      name: "Service & Cuci AC (Air Conditioner)",
      category: "AC",
      price: 65000,
      priceFormatted: "Mulai Rp 65.000",
      description: "Pembersihan total evaporator, blower fan, kondensor luar, pengecekan tekanan freon, pembersihan filter, serta perbaikan AC tidak dingin, bocor air, berisik atau mati total. Melayani AC Split 1/2 PK s/d 2.5 PK, AC Inverter, Cassette & Standing Floor.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Pencucian Higienis Menggunakan Jet Cleaner Bertekanan",
        "Pengecekan Tekanan Freon & Arus Ampere",
        "Penanganan Kebocoran Pipa & Saluran Pembuangan",
        "Perbaikan Modul Sensor & PCB Remote",
        "Garansi Pekerjaan hingga 30 Hari"
      ],
      popular: true
    },
    {
      id: "srv-kulkas",
      name: "Service Kulkas 1 Pintu & 2 Pintu Inverter",
      category: "Kulkas",
      price: 150000,
      priceFormatted: "Mulai Rp 150.000",
      description: "Penanganan kulkas tidak dingin, ruang bawah hangat, es membatu berlebihan (defrost error), kompresor mendengung, kebocoran freon, penggantian filter dryer, thermostat, timer, hingga ganti kompresor baru bergaransi.",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Deteksi Kebocoran Sirkulasi Refrigerator Akurat",
        "Penggantian Komponen Defrost & Thermostat",
        "Isi Ulang Freon R134a / R600a Ramah Lingkungan",
        "Perbaikan Modul Inverter Pintar",
        "Pengecekan Kerapatan Karet Pintu Magnetik"
      ],
      popular: true
    },
    {
      id: "srv-mesin-cuci",
      name: "Service Mesin Cuci Front Loading & Top Loading",
      category: "Mesin Cuci",
      price: 120000,
      priceFormatted: "Mulai Rp 120.000",
      description: "Perbaikan mesin cuci 2 tabung manual maupun 1 tabung otomatis (Top Load & Front Load). Mengatasi air tidak masuk/keluar, tabung pengering macet, getar hebat saat spin, eror kode E1/E2/E4, pergantian fan belt, gearbox, dan dinamo motor.",
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Diagnosa Kerusakan Modul Komputer & Sensor Water Level",
        "Perbaikan / Penggantian Dinamo Spin & Wash",
        "Penggantian Seal Karet & Bearing Tabung",
        "Pembersihan Saluran Drain Valve Anti Sumbat",
        "Uji Coba Putaran Normal di Depan Pemilik"
      ],
      popular: true
    },
    {
      id: "srv-showcase",
      name: "Service Showcase & Chiller Minuman Komersial",
      category: "Showcase",
      price: 175000,
      priceFormatted: "Mulai Rp 175.000",
      description: "Layanan prioritas untuk pemilik usaha warung, minimarket, cafe & restoran. Mengatasi showcase tidak dingin, kipas evaporator mati, lampu neon mati, kaca berembun parah, kompresor macet, dan penambahan freon berkapasitas besar.",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Respon Cepat Panggilan Darurat Bisnis / UMKM",
        "Pembersihan Kondensor & Kipas Pendingin Bawah",
        "Penggantian Fan Motor & Relay Starting",
        "Pengaturan Suhu Digital / Mechanical Thermostat",
        "Pemeriksaan Kerapatan Kaca & Insulasi Suhu"
      ],
      popular: false
    },
    {
      id: "srv-freezer",
      name: "Service Freezer Box & Ice Maker Daging/Es Krim",
      category: "Freezer Box",
      price: 180000,
      priceFormatted: "Mulai Rp 180.000",
      description: "Spesialis perbaikan freezer box penyimpanan daging, frozen food, ASI, dan es krim. Menangani pipa beku bocor tertusuk benda tajam, flushing oli kompresor, penggantian kapiler buntu, dan pengisian freon bertekanan presisi.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Las Sambungan Pipa Tembaga & Aluminium Kuat",
        "Flushing Sirkulasi Pipa Menggunakan R11 / Nitrogen",
        "Penggantian Filter Drier Baru Anti Lembab",
        "Penyetelan Suhu Beku Ekstrem hingga -25°C",
        "Jaminan Daging / Makanan Aman Tidak Rusak"
      ],
      popular: false
    },
    {
      id: "srv-dispenser",
      name: "Service Dispenser Galon Atas & Galon Bawah",
      category: "Dispenser",
      price: 90000,
      priceFormatted: "Mulai Rp 90.000",
      description: "Perbaikan dispenser mati total, air panas tidak berfungsi, air dingin tidak sejuk (kompresor / peltier pendingin mati), pompa galon bawah tidak naik air, air rembes bocor, serta sanitasi pengurasan kerak kapur tangki stainless.",
      image: "https://images.unsplash.com/photo-1548834925-e48f8a27b874?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Perbaikan Elemen Pemanas Heater & Termofuse Pengaman",
        "Penggantian Pompa Air Galon Bawah (Water Pump)",
        "Pengecekan Kompresor / Elemen Pendingin Dingin",
        "Pembersihan Tangki Higienis Bebas Bau & Bakteri",
        "Penggantian Kran Air Panas / Dingin Anti Bocor"
      ],
      popular: false
    }
  ],

  gallery: [
    {
      title: "Pembersihan Evaporator AC Split Rumah Tinggal",
      category: "Service AC",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      caption: "Cuci AC rutin di Jatibarang, Indramayu. Sirkulasi udara kembali dingin segar dan hemat listrik."
    },
    {
      title: "Pengisian Freon & Ganti Filter Kulkas 2 Pintu",
      category: "Kulkas",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
      caption: "Perbaikan kebocoran pipa suction & vakum sistem pendingin di Kesambi, Cirebon."
    },
    {
      title: "Perbaikan Modul PCB & Dinamo Mesin Cuci",
      category: "Mesin Cuci",
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
      caption: "Penggantian gearbox & sensor level air mesin cuci di Kadipaten, Majalengka."
    },
    {
      title: "Pengecekan Multimeter & Komponen Kompresor",
      category: "Diagnostik",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop",
      caption: "Peralatan lengkap dan presisi untuk memastikan deteksi kerusakan 100% akurat tanpa kira-kira."
    },
    {
      title: "Service Berkala Showcase Warung & Minimarket",
      category: "Showcase UMKM",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1200&auto=format&fit=crop",
      caption: "Showcase kembali dingin optimal untuk menjaga kesegaran minuman dingin dagangan pelanggan."
    },
    {
      title: "Teknisi Ramah & Berpengalaman Datang ke Rumah",
      category: "Pelayanan",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop",
      caption: "Komitmen kerja bersih, jujur dalam estimasi harga, dan transparan mengenai komponen rusak."
    }
  ],

  testimonials: [
    {
      name: "H. Sudirman",
      location: "Jatibarang, Indramayu",
      service: "Service AC 3 Unit & Cuci Rutin",
      quote: "Sangat puas dengan teknisi Serviceku. Datang tepat waktu, kerjanya bersih pakai plastik cover pelindung rapi. AC yang tadinya cuma keluar angin sekarang dingin menggigil. Harga sangat jujur!",
      rating: 5,
      date: "Kemarin"
    },
    {
      name: "Ibu Ratnasari",
      location: "Kedawung, Cirebon",
      service: "Perbaikan Kulkas 2 Pintu Inverter",
      quote: "Kulkas Sharp inverter saya sempat divonis harus ganti kompresor mahal di tempat lain. Sama teknisi Serviceku dicek teliti ternyata hanya relay dan kapasitornya. Hemat jutaan rupiah. Recommended!",
      rating: 5,
      date: "3 hari lalu"
    },
    {
      name: "Pak Dedi Kurniawan",
      location: "Kadipaten, Majalengka",
      service: "Mesin Cuci Front Loading Error",
      quote: "Mesin cuci bergetar keras pas pengeringan dan keluar error. Teknisi datang sore hari, langsung diganti shock breaker dan bearingnya. Suaranya halus lagi. Ada garansi resmi tertulis.",
      rating: 5,
      date: "1 minggu lalu"
    },
    {
      name: "Bpk. Hendra (Pemilik Cafe)",
      location: "Kota Cirebon",
      service: "Emergency Service Showcase & Chiller",
      quote: "Showcase cafe mati mendadak padahal stok minuman lagi penuh. Hubungi Serviceku lewat WhatsApp, 45 menit teknisi sudah sampai lokasi. Pelayanan cepat dan sangat profesional.",
      rating: 5,
      date: "2 minggu lalu"
    }
  ],

  faq: [
    {
      question: "Bagaimana cara memesan jasa service panggilan ke rumah?",
      answer: "Sangat mudah! Anda cukup klik tombol 'Pesan via WhatsApp' atau hubungi +62 878-7441-7978. Informasikan jenis barang elektronik (AC, Kulkas, Mesin Cuci, dll), keluhan yang dialami, dan alamat rumah Anda. Tim admin kami akan langsung menjadwalkan teknisi terdekat untuk datang."
    },
    {
      question: "Berapa biaya pengecekan / transportasi teknisi?",
      answer: "Biaya pengecekan sangat terjangkau mulai dari Rp 35.000 - Rp 50.000 tergantung jarak lokasi. Apabila Anda menyetujui tindakan perbaikan atau penggantian sparepart oleh teknisi kami, maka biaya pengecekan tersebut biasanya digratiskan atau dipotong langsung dari total tagihan."
    },
    {
      question: "Apakah ada garansi setelah perbaikan selesai?",
      answer: "Ya, kami memberikan Garansi Service Resmi selama 30 hingga 60 hari untuk kerusakan dan komponen yang sama. Teknisi kami akan memberikan nota atau kartu garansi resmi Serviceku."
    },
    {
      question: "Wilayah mana saja yang dijangkau oleh teknisi Serviceku?",
      answer: "Kami melayani seluruh area Indramayu (Kota, Jatibarang, Kertasmaya, Karangampel, Patrol), Cirebon (Kota & Kabupaten, Kedawung, Sumber, Weru, Palimanan), dan Majalengka (Kota, Kadipaten, Kertajati, Jatiwangi) serta sekitarnya."
    },
    {
      question: "Apakah sparepart yang digunakan asli / berkualitas?",
      answer: "Kami hanya menyediakan sparepart berkualitas tinggi (Original atau Grade A berstandar pabrikan) yang teruji awet. Kami selalu menunjukkan sparepart baru yang tersegel sebelum dipasang dan mengembalikan sparepart lama yang rusak kepada pemilik."
    }
  ]
};
