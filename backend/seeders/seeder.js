require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const { sequelize, User, Lapangan } = require('../models');

const seed = async () => {
  await sequelize.sync({ force: true });
  console.log('✅ Database synced');

  // Create admin
  const adminPass = await bcrypt.hash('admin123', 10);
  await User.create({
    nama: 'Administrator',
    email: 'admin@tenis.com',
    no_hp: '081234567890',
    password: adminPass,
    role: 'admin',
  });

  // Create sample user
  const userPass = await bcrypt.hash('user123', 10);
  await User.create({
    nama: 'Budi Santoso',
    email: 'user@tenis.com',
    no_hp: '081298765432',
    password: userPass,
    role: 'user',
  });

  // Create lapangan
  await Lapangan.bulkCreate([
    {
      nama: 'Lapangan A (Indoor)',
      harga_per_jam: 100000,
      foto_url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
      deskripsi: 'Lapangan tenis indoor ber-AC dengan lantai hardcourt premium. Cocok untuk semua level pemain.',
      fasilitas: JSON.stringify(['Parkir Luas', 'Toilet & Shower', 'AC', 'Loker', 'Kantin', 'WiFi']),
      status: 'aktif',
      jam_buka: '07:00',
      jam_tutup: '22:00',
    },
    {
      nama: 'Lapangan B (Indoor)',
      harga_per_jam: 100000,
      foto_url: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=800',
      deskripsi: 'Lapangan tenis indoor dengan pencahayaan LED terbaik. Nyaman untuk latihan malam hari.',
      fasilitas: JSON.stringify(['Parkir Luas', 'Toilet', 'LED Lighting', 'Loker']),
      status: 'aktif',
      jam_buka: '07:00',
      jam_tutup: '22:00',
    },
    {
      nama: 'Lapangan C (Outdoor)',
      harga_per_jam: 75000,
      foto_url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
      deskripsi: 'Lapangan tenis outdoor dengan permukaan clay terbaik. Cocok untuk latihan teknik.',
      fasilitas: JSON.stringify(['Parkir', 'Toilet', 'Tribun Penonton']),
      status: 'aktif',
      jam_buka: '06:00',
      jam_tutup: '18:00',
    },
    {
      nama: 'Lapangan D (Outdoor)',
      harga_per_jam: 75000,
      foto_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      deskripsi: 'Lapangan tenis outdoor serbaguna. Ideal untuk latihan dan turnamen kecil.',
      fasilitas: JSON.stringify(['Parkir', 'Kantin']),
      status: 'aktif',
      jam_buka: '06:00',
      jam_tutup: '18:00',
    },
  ]);

  console.log('✅ Seed data berhasil ditambahkan!');
  console.log('');
  console.log('🔐 Login Credentials:');
  console.log('Admin  → admin@tenis.com   / admin123');
  console.log('User   → user@tenis.com    / user123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
