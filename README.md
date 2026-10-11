# 🎾 Tennis Court Booking System

Aplikasi pemesanan lapangan tenis berbasis web full-stack modern dengan sistem manajemen jadwal *real-time*, dashboard analitik untuk admin, serta notifikasi otomatis WhatsApp untuk pengingat jadwal dan konfirmasi pemesanan.

---

## 📌 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Setup Backend](#2-setup-backend)
  - [3. Setup Database & Seeder](#3-setup-database--seeder)
  - [4. Setup Frontend](#4-setup-frontend)
- [Akun Demo Default](#-akun-demo-default)
- [Daftar Endpoint API](#-daftar-endpoint-api)
- [Integrasi Notifikasi WhatsApp](#-integrasi-notifikasi-whatsapp)

---

## ✨ Fitur Utama

### 👤 Pengguna / Penyewa (User)
- **Katalog Lapangan**: Informasi lengkap fasilitas, jenis lapangan (Indoor/Outdoor), harga per jam, dan foto lapangan.
- **Pemesanan Interaktif**: Pemilihan tanggal, jam main, serta pengecekan ketersediaan slot secara *real-time*.
- **Riwayat & Status Booking**: Pelacakan status pemesanan (*Menunggu Konfirmasi*, *Dikonfirmasi*, *Dibatalkan*).
- **Dashboard Pengguna**: Ringkasan jadwal booking yang akan datang dan histori pemesanan.

### 🛡️ Pengelola Lapangan (Admin)
- **Dashboard Analitik**: Grafik statistik pendapatan, tren booking per bulan, dan status pemesanan (didukung Chart Recharts).
- **Manajemen Pemesanan**: Menyetujui atau membatalkan pesanan masuk dengan pencatatan alasan pembatalan.
- **Manajemen Lapangan**: Tambah, ubah data lapangan, atur jam operasional, harga, dan fasilitas.
- **Pengaturan Jadwal & Slot Blokir**: Blokir jam atau tanggal tertentu untuk perawatan (*maintenance*) lapangan.
- **Manajemen Pengguna**: Monitoring daftar member dan penyewa yang terdaftar.
- **Laporan & Rekapitulasi**: Filter transaksi berdasarkan rentang tanggal serta cetak/ekspor laporan pendapatan.

### 📲 Otomatisasi & Notifikasi
- **WhatsApp Notifications**: Notifikasi instan saat booking berhasil diajukan, dikonfirmasi, maupun dibatalkan melalui WhatsApp Gateway (Fonnte).
- **Pengingat Otomatis (Cron Job H-1)**: Penjadwalan otomatis setiap pukul 08:00 WIB untuk mengingatkan pengguna mengenai jadwal bermain esok hari.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi |
| --- | --- |
| **Frontend** | React 19, Vite, React Router v7, Zustand (State Management), Lucide React (Icons), Recharts, React Toastify, React Calendar |
| **Backend** | Node.js, Express.js, Sequelize ORM |
| **Database** | MySQL (didukung MariaDB / XAMPP) & SQLite |
| **Keamanan** | JSON Web Token (JWT), Bcrypt.js |
| **Notifikasi** | Fonnte WhatsApp API Gateway |
| **Automation** | Node-Cron (Background Scheduled Tasks) |

---

## 📂 Struktur Folder

```text
Booking/
├── backend/
│   ├── config/             # Konfigurasi koneksi Sequelize & MySQL
│   ├── controllers/        # Logika bisnis API
│   ├── middlewares/        # Middleware autentikasi JWT & upload
│   ├── models/             # Definisi model database (User, Lapangan, Booking, SlotBlokir)
│   ├── routes/             # Rute endpoint Express
│   ├── seeders/            # Data awal/demo database
│   ├── services/           # Integrasi WhatsApp Fonnte Service
│   ├── uploads/            # Direktori file gambar yang diunggah
│   ├── .env.example        # Contoh konfigurasi environment backend
│   ├── package.json
│   └── server.js           # Entry point backend server
│
├── frontend/
│   ├── public/             # Asset statis
│   ├── src/
│   │   ├── api/            # Konfigurasi Axios & interaksi API
│   │   ├── components/     # Komponen UI modular (Navbar, Sidebar, Modal, dll.)
│   │   ├── pages/
│   │   │   ├── admin/      # Halaman khusus Admin (Dashboard, Kelola, Laporan)
│   │   │   ├── auth/       # Login & Register
│   │   │   ├── public/     # Informasi publik & landing page
│   │   │   └── user/       # Halaman Penyewa (Dashboard, Booking, Riwayat)
│   │   ├── store/          # Global store Zustand (authStore, dll.)
│   │   ├── App.jsx         # Routing & Layout aplikasi
│   │   ├── index.css       # Styling & Design Tokens
│   │   └── main.jsx        # Entry point React
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 📋 Prasyarat Sistem

Sebelum memulai instalasi, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18.x atau lebih baru)
- [npm](https://www.npmjs.com/) (Bawaan Node.js)
- Server MySQL (Bisa menggunakan [XAMPP](https://www.apachefriends.org/), Laragon, atau MySQL Server mandiri)

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Clone Repository
```bash
git clone https://github.com/iiiikimii/Booking_tenis.git
cd Booking_tenis
```

---

### 2. Setup Backend

1. Masuk ke direktori `backend`:
   ```bash
   cd backend
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Buat file `.env` dengan menyalin template:
   ```bash
   cp .env.example .env
   ```
   *(Pada Windows Command Prompt: `copy .env.example .env`)*

4. Sesuaikan konfigurasi pada file `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=rahasia_jwt_booking_tenis_2024
   FRONTEND_URL=http://localhost:5173

   # Konfigurasi Database MySQL
   DB_NAME=booking_tenis
   DB_USER=root
   DB_PASS=
   DB_HOST=127.0.0.1

   # WhatsApp Fonnte (Opsional untuk simulasi)
   WHATSAPP_API_KEY=your_fonnte_api_key_here
   WHATSAPP_SENDER=081234567890
   ```

---

### 3. Setup Database & Seeder

1. Buka MySQL / phpMyAdmin dan buat database baru bernama:
   ```sql
   CREATE DATABASE booking_tenis;
   ```

2. Jalankan seeder untuk mengisi data awal akun admin, user demo, dan data lapangan:
   ```bash
   npm run seed
   ```

3. Jalankan server backend:
   ```bash
   # Mode pengembangan dengan auto-reload
   npm run dev

   # Atau mode production
   npm start
   ```
   Server backend akan aktif di: `http://localhost:5000`

---

### 4. Setup Frontend

1. Buka terminal baru dan masuk ke direktori `frontend`:
   ```bash
   cd ../frontend
   # atau dari root: cd frontend
   ```

2. Pasang dependensi:
   ```bash
   npm install
   ```

3. Jalankan server development Vite:
   ```bash
   npm run dev
   ```
   Buka peramban (browser) di alamat yang muncul (biasanya `http://localhost:5173`).

---

## 🔑 Akun Demo Default

Setelah menjalankan `npm run seed`, Anda dapat login menggunakan akun berikut:

| Peran (Role) | Email | Password | Hak Akses |
| --- | --- | --- | --- |
| **Administrator** | `admin@tenis.com` | `admin123` | Dashboard analitik, kelola pesanan, manajemen lapangan, blokir jadwal, laporan |
| **User (Penyewa)** | `user@tenis.com` | `user123` | Reservasi lapangan, cek riwayat, batalkan pemesanan |

---

## 📡 Daftar Endpoint API

### Otentikasi (`/api/auth`)
- `POST /api/auth/register` - Pendaftaran akun baru
- `POST /api/auth/login` - Masuk & mendapatkan token JWT
- `GET /api/auth/me` - Mendapatkan profil pengguna saat ini

### Lapangan (`/api/lapangan`)
- `GET /api/lapangan` - Mendapatkan seluruh daftar lapangan
- `GET /api/lapangan/:id` - Mendapatkan detail satu lapangan
- `POST /api/lapangan` *(Admin)* - Menambahkan lapangan baru
- `PUT /api/lapangan/:id` *(Admin)* - Memperbarui informasi lapangan
- `DELETE /api/lapangan/:id` *(Admin)* - Menghapus lapangan

### Booking (`/api/booking`)
- `GET /api/booking` - Mendapatkan daftar booking (User: miliknya sendiri, Admin: semua)
- `POST /api/booking` - Membuat reservasi lapangan baru
- `GET /api/booking/:id` - Mengambil detail satu booking
- `PUT /api/booking/:id/status` *(Admin)* - Mengubah status (dikonfirmasi / dibatalkan)
- `DELETE /api/booking/:id` - Membatalkan pesanan

### Jadwal & Blokir Slot (`/api/jadwal`)
- `GET /api/jadwal/ketersediaan` - Memeriksa ketersediaan jam pada tanggal & lapangan tertentu
- `POST /api/jadwal/blokir` *(Admin)* - Memblokir jam tertentu untuk jadwal perawatan

### Laporan & Pengguna (`/api/report` & `/api/users`)
- `GET /api/report/ringkasan` *(Admin)* - Statistik omset & total pemesanan
- `GET /api/users` *(Admin)* - Mengambil seluruh data pengguna terdaftar

---

## 💬 Integrasi Notifikasi WhatsApp

Aplikasi ini menggunakan **Fonnte API Gateway** untuk pengiriman pesan WhatsApp otomatis.

- **Mode Simulasi**: Jika nilai `WHATSAPP_API_KEY` tidak diisi atau bernilai *default*, sistem otomatis beralih ke mode simulasi dan mencetak format pesan WhatsApp langsung di terminal console backend.
- **Mode Nyata (Production)**:
  1. Buat akun di [Fonnte.com](https://fonnte.com).
  2. Hubungkan perangkat WhatsApp Anda pada dashboard Fonnte.
  3. Salin API Token ke parameter `WHATSAPP_API_KEY` pada file `backend/.env`.
- **Pengingat H-1 Otomatis**: Layanan terjadwal (`node-cron`) aktif di file `server.js` dan berjalan setiap hari jam `08:00 AM` untuk mengirimkan pengingat kepada pemain yang memiliki jadwal keesokan harinya.

---

## 📄 Lisensi
Proyek ini dibuat untuk keperluan portofolio dan manajemen penyewaan lapangan tenis. Silakan gunakan dan modifikasi sesuai kebutuhan.
