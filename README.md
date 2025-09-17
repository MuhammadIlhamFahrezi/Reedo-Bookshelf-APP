# Reedo - Aplikasi Pengelola Koleksi Buku

## Deskripsi

Aplikasi web sederhana bernama Reedo untuk mengelola koleksi buku pribadi. Pengguna dapat menambah, mengedit, menghapus, dan mencari buku dalam rak virtual. Aplikasi ini memiliki dua kategori utama: buku yang belum selesai dibaca dan buku yang sudah selesai dibaca.

## Fitur

- Tambah buku baru dengan informasi judul, penulis, dan tahun terbit
- Tandai buku sebagai sudah selesai atau belum selesai dibaca
- Edit informasi buku yang sudah ada
- Hapus buku dari koleksi
- Cari buku berdasarkan judul
- Statistik koleksi buku (total, selesai, belum selesai)
- Penyimpanan data menggunakan localStorage
- Desain responsive untuk desktop dan mobile

## Teknologi

- HTML5
- CSS3 (responsive design)
- JavaScript (Vanilla JS)
- Font Awesome untuk ikon
- Google Fonts (Poppins)
- localStorage untuk penyimpanan data

## Cara Menjalankan

1. Download atau clone semua file
2. Pastikan struktur file seperti berikut:
   ```
   ├── index.html
   ├── scripts/
   │   └── main.js
   └── styles/
       └── styles.css
   ```
3. Buka file `index.html` di browser
4. Aplikasi siap digunakan

**Demo Live:**
Aplikasi dapat diakses secara online di: https://muhammadilhamfahrezi.github.io/Reedo-Bookshelf-APP/

## Cara Menggunakan

### Menambah Buku
1. Klik tombol "Tambah Buku" atau scroll ke bagian "Tambah Buku Baru"
2. Isi formulir dengan judul, penulis, dan tahun terbit
3. Centang checkbox jika buku sudah selesai dibaca
4. Klik tombol submit

### Mencari Buku
1. Klik tombol "Cari Buku" atau scroll ke bagian "Cari Buku"
2. Ketik judul buku yang ingin dicari
3. Klik tombol "Cari"

### Mengelola Buku
- **Edit**: Klik tombol "Edit Buku" pada item buku
- **Hapus**: Klik tombol "Hapus Buku" (akan muncul konfirmasi)
- **Ubah Status**: Klik tombol "Selesai dibaca" atau "Belum selesai dibaca"

## Struktur File

```
├── index.html              # Struktur HTML utama
├── scripts/
│   └── main.js            # Logika JavaScript aplikasi
└── styles/
    └── styles.css         # Styling dan responsive design
```

## Fitur JavaScript

### Penyimpanan Data
- Data disimpan di localStorage browser
- Otomatis tersimpan setiap ada perubahan
- Data tetap ada meskipun browser ditutup

### Fungsi Utama
- `tambahBuku()` - Menambah buku baru
- `editBuku()` - Mengedit buku yang ada
- `hapusBuku()` - Menghapus buku
- `cariBuku()` - Mencari buku berdasarkan judul
- `ubahStatusBuku()` - Mengubah status baca buku
- `perbaruiStatistik()` - Update statistik koleksi

## Desain

- Layout menggunakan flexbox
- Sidebar navigasi dengan branding "Reedo"
- Gradient background untuk section utama
- Hover effects pada tombol dan card buku
- Responsive design untuk perangkat mobile

## Browser Support

Aplikasi ini kompatibel dengan browser modern yang mendukung:
- localStorage
- ES6 JavaScript
- Flexbox CSS
- CSS Grid (untuk responsive)

## Catatan

- Data hanya tersimpan di browser lokal
- Jika localStorage dibersihkan, data akan hilang
- Tidak ada validasi kompleks, hanya validasi dasar form
- Aplikasi tidak memerlukan koneksi internet setelah dimuat
- Nama aplikasi "Reedo" merupakan kombinasi dari "Read" dan "Do"