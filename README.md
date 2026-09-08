# Invoice Tritunggal Lancar

Aplikasi web sederhana untuk membuat invoice Tritunggal Lancar Advertising. Dibangun menggunakan HTML, CSS, dan JavaScript tanpa framework, backend, atau database. Data invoice dapat diedit langsung di halaman browser.

## Fitur

- Membuat awalan nomor invoice otomatis dengan format `TTL-YYMMDD-`, dengan nomor order bulanan yang dapat diedit.
- Mengisi tanggal otomatis saat halaman dibuka dan menyediakan kalender untuk memilih tanggal lain.
- Mengedit nama klien, jabatan, instansi, dan alamat. Contoh isian tampil abu-abu, sedangkan teks yang diisi tampil hitam.
- Menyembunyikan contoh isian klien yang kosong saat dicetak atau diekspor ke PDF.
- Mengisi deskripsi barang, harga, dan kuantitas langsung pada tabel.
- Menambahkan baris otomatis saat deskripsi atau harga baris terakhir mulai diisi, atau melalui tombol **Tambah Item**.
- Menghitung subtotal dan total tagihan saat halaman dibuka serta saat data item atau DP diedit.
- Menampilkan informasi pembayaran, logo, serta tanda tangan Ardian Kustomo dengan nama dan garis di bawahnya.
- Mencetak invoice melalui tombol **Print**.
- Mengunduh invoice menggunakan tombol **Download PDF**, dengan nama berkas `Invoice-Tritunggal-Lancar.pdf`.

## Struktur file

```text
inv-ttl-main/
├── index.html      # Struktur invoice dan informasi perusahaan
├── style.css       # Tampilan, posisi tanda tangan, dan aturan cetak
├── script.js       # Pengelolaan item, perhitungan, dan ekspor PDF
├── TTL logo.png    # Logo perusahaan
├── ttd dian.png    # Gambar tanda tangan
└── README.md       # Dokumentasi proyek
```

## Menjalankan aplikasi

Tidak diperlukan proses build atau instalasi paket untuk membuka halaman. Buka `index.html` melalui browser untuk melihat dan mengedit invoice. Untuk ekspor PDF, gunakan server lokal agar pemuatan gambar lebih konsisten.

Jika Python tersedia, jalankan perintah berikut dari folder proyek:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Buka [http://127.0.0.1:8080](http://127.0.0.1:8080) di browser. Biarkan terminal berjalan selama aplikasi digunakan; tekan `Ctrl+C` untuk menghentikan server. Jika port 8080 sudah digunakan, ganti dengan port lain, misalnya 8081, dan sesuaikan alamat browser.

Koneksi internet diperlukan untuk memuat Font Awesome 6.5.0 dan html2pdf.js 0.10.1 dari CDN yang tercantum di `index.html`. Python hanya diperlukan jika memilih cara menjalankan server di atas.

## Cara penggunaan

1. Periksa nomor invoice yang otomatis menggunakan format `TTL-YYMMDD-001` berdasarkan tanggal lokal perangkat. Contoh: 8 Oktober 2026 menghasilkan `TTL-261008-001`. Klik bagian `001` untuk mengisi nomor urut order bulan tersebut. Awalan dan kode tanggal tidak dapat diedit langsung; nomor order belum dihitung atau disimpan otomatis.
2. Kolom **Tanggal** otomatis terisi tanggal saat halaman dibuka. Klik kolom atau ikon kalender untuk memilih tanggal lain. Tampilan tanggal mengikuti pengaturan browser, sedangkan hasil cetak dan PDF menggunakan `YYYY-MM-DD`. Mengubah tanggal pilihan tidak mengubah kode tanggal pada nomor invoice.
3. Isi **Kepada**, **Jabatan**, **Instansi**, dan **Alamat** dengan mengklik contoh isian abu-abu. Teks yang diketik akan tampil hitam. Jika isian dihapus, contoh abu-abu muncul kembali. Kolom yang dibiarkan kosong tidak mencetak contoh isian; labelnya tetap tampil.
4. Ganti item contoh **Desain & Produksi** dengan pekerjaan atau barang yang ditagihkan.
5. Masukkan harga dalam rupiah, misalnya `1500000`, dan kuantitas berupa bilangan bulat positif.
6. Isi baris berikutnya atau klik **Tambah Item** bila diperlukan. Tombol ini menambahkan baris dan memindahkan kursor ke deskripsi baru.
7. Klik nilai **DP** dan masukkan uang muka, misalnya `500000`.
8. Periksa perhitungan sebelum mencetak atau mengunduh PDF. Saat ekspor berlangsung, tombol menampilkan **Memproses PDF…** dan tidak dapat diklik ulang hingga proses selesai.

Contoh isian klien yang tersedia:

| Kolom | Contoh isian abu-abu |
| --- | --- |
| Kepada | Nama Klien |
| Jabatan | Jabatan Klien |
| Instansi | Nama Instansi |
| Alamat | Jl. Contoh Alamat No. 123 |

Rumus perhitungan:

```text
Subtotal item = Harga × Qty
Subtotal invoice = Jumlah seluruh subtotal item
Total Tagihan = maksimum(0, Subtotal invoice − DP)
```

Harga dan DP diproses sebagai rupiah bulat. Sebaiknya masukkan angka tanpa pecahan desimal karena karakter selain angka dihapus oleh parser.

## Mengubah tampilan dan informasi

- Edit `index.html` untuk mengubah identitas perusahaan, rekening pembayaran, nilai awal metadata, atau nama penanda tangan.
- Ganti `TTL logo.png` dan `ttd dian.png` untuk mengganti aset gambar. Jika nama file berubah, sesuaikan atribut `src` di `index.html`.
- Edit variabel warna pada `:root` di `style.css` untuk menyesuaikan warna.
- Atur `.signature` untuk mengubah jarak keseluruhan tanda tangan, nama, dan garis dari bagian total.
- Atur `.signature .sig-pad img` untuk mengubah ukuran dan posisi gambar tanda tangan. Nilai `translateY` positif menggeser gambar ke bawah.
- Edit `script.js` untuk mengubah item contoh dan nama file PDF.
- Edit atribut `data-placeholder` pada `.client-field` di `index.html` untuk mengubah contoh isian klien. Biarkan isi elemen kosong agar contoh tidak menjadi data invoice.

## Keterbatasan saat ini

- Data hanya berada di halaman yang sedang dibuka. Memuat ulang atau menutup halaman menghapus perubahan; belum ada penyimpanan maupun riwayat invoice.
- Setiap halaman dimuat ulang, tanggal kembali mengikuti tanggal perangkat dan nomor order kembali ke `001`.
- Belum tersedia tombol hapus baris. Isi baris dapat dikosongkan, tetapi barisnya tetap tampil.
- Validasi angka belum lengkap. Kuantitas desimal dipotong menjadi bilangan bulat dan nilai negatif belum ditolak.
- Tata letak menggunakan ukuran tetap dengan padding tambahan sehingga ukuran luarnya melebihi A4. Konten panjang dapat terpotong pada tampilan halaman, dan hasil cetak atau PDF perlu diperiksa.
- Tampilan belum dioptimalkan untuk layar ponsel.
- Ekspor PDF bergantung pada CDN. Tombol dinonaktifkan selama pemrosesan dan pesan ditampilkan bila pustaka tidak tersedia atau proses gagal. Jika unduhan gagal, coba tombol **Print** lalu pilih **Save as PDF** pada browser yang mendukungnya. Dukungan unduhan dan dialog cetak dapat berbeda pada browser yang tertanam dalam aplikasi.

## Pemeriksaan manual

Belum ada pengujian otomatis. Setelah mengubah kode, periksa alur berikut:

1. Pastikan logo dan tanda tangan tampil.
2. Ubah harga item menjadi `100000` dan Qty menjadi `2`; subtotal harus menjadi Rp200.000 jika tidak ada item lain yang bernilai.
3. Isi DP `50000`; total tagihan harus menjadi Rp150.000.
4. Isi deskripsi pada baris terakhir dan pastikan baris kosong baru muncul.
5. Periksa pratinjau cetak dan PDF, termasuk posisi tanda tangan, nama, garis, dan pemisahan halaman.
6. Pastikan nomor invoice dan tanggal awal sesuai tanggal perangkat. Ubah nomor order dan pastikan awalan tetap sama.
7. Klik tanggal, pilih hari lain dari kalender, dan pastikan pilihan tampil tanpa mengubah nomor invoice.
8. Isi lalu hapus nama klien dan jabatan. Pastikan contoh abu-abu berganti menjadi teks hitam saat diisi dan muncul kembali saat kosong.
9. Cetak atau ekspor dengan sebagian kolom klien kosong. Pastikan contoh abu-abu dan kontrol kalender tidak ikut tercetak, sementara isian pengguna dan tanggal pilihan tetap tampil.

Pengujian browser yang sudah dilakukan mencakup tambah item, baris otomatis, subtotal dan DP, tanggal otomatis, pemilihan tanggal melalui kalender, serta pengisian dan penghapusan nama klien. Dialog cetak dan penerimaan file PDF belum terverifikasi penuh pada browser dalam aplikasi; periksa hasil akhir melalui browser yang mendukung fitur tersebut.

