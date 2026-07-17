# FEEmployeeManagementAngular

Proyek ini dibangun menggunakan **Angular CLI** versi 18.2.21 untuk mengelola data data karyawan (*Employee Management*).

---

## 🛠️ Daftar Teknologi & Dependensi Utama

Untuk mendukung performa dan antarmuka aplikasi, proyek ini menggunakan beberapa pustaka utama berikut:

* **Angular Material (`^18.2.14`)**: Pustaka ini digunakan secara **spesifik dan terbatas hanya untuk komponen Datepicker** guna memastikan pemilihan tanggal lahir karyawan berjalan dengan mulus.
* **ngx-toastr (`^19.1.0`)**: Digunakan untuk mengelola pop-up notifikasi (seperti pesan sukses, error, atau peringatan) secara reaktif.
* **Vanilla SASS / SCSS**: Selain komponen *Datepicker* di atas, seluruh komponen antarmuka, tata letak (*layout*), dan elemen visual lainnya **didisain secara manual dari awal menggunakan SASS murni** (tanpa bantuan framework CSS seperti Bootstrap atau Tailwind) untuk menghasilkan performa yang ringan dan struktur kode CSS yang bersih.


---

## 🚀 Cara Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

### 1. Prasyarat (Prerequisites)

Pastikan Anda sudah menginstal **Node.js** (Disarankan versi LTS sesuai dengan Angular 18) dan **npm** di komputer Anda.

### 2. Instalasi Dependensi

Buka terminal di dalam folder proyek ini, lalu jalankan perintah berikut untuk mengunduh semua pustaka yang dibutuhkan:

```bash
npm install
```

*(Catatan: Jika terjadi konflik versi peer-dependencies pada package tertentu seperti ngx-toastr, gunakan perintah `npm install --legacy-peer-deps`)*

### 3. Menjalankan Development Server

Untuk mengaktifkan server lokal, jalankan perintah:

```bash
ng serve
```

Buka browser Anda dan akses tautan **`http://localhost:4200/`**. Aplikasi akan otomatis memuat ulang (*reload*) setiap kali Anda melakukan perubahan pada file kode sumber.

---

## 🔐 Akun Uji Coba (Dummy User Login)

Aplikasi ini dilengkapi dengan fitur autentikasi. Untuk masuk ke dalam sistem dashboard manajemen, gunakan akun *dummy* berikut:

* **Username / Email :** `superadmin`
* **Password :** `super_admin`

---