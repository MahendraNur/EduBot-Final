# EduBot AI RESTful API 🚀

EduBot AI adalah aplikasi RESTful API berbasis **Node.js** dan **Express.js** yang terintegrasi dengan **Google Gemini AI** untuk memproses berbagai jenis input multimodal seperti teks, gambar, dokumen, dan audio.

Project ini dirancang sebagai middleware antara client application (Frontend Web, Mobile App, atau Postman) dengan layanan Generative AI dari Google Gemini untuk menghasilkan respons cerdas berbasis AI secara real-time.

---

# 🌟 Tentang Project

EduBot AI dibuat untuk menunjukkan implementasi nyata dari teknologi **Generative AI API Integration** menggunakan arsitektur backend modern.

Aplikasi ini mampu menerima berbagai tipe data input dan memprosesnya menggunakan model AI Gemini sehingga pengguna dapat:

- Berinteraksi menggunakan prompt teks
- Mengunggah gambar untuk dianalisis
- Merangkum dokumen PDF/TXT
- Melakukan transkripsi audio

Project ini cocok digunakan sebagai dasar pengembangan:

- AI Assistant
- Smart Education Bot
- AI Document Analyzer
- AI OCR System
- AI Audio Transcriber
- Multimodal AI Platform

---

# ✨ Fitur Utama

## 📝 Text Generation
Menghasilkan jawaban AI berdasarkan prompt teks biasa menggunakan Google Gemini.

## 🖼️ Image Understanding
Menganalisis gambar yang diunggah dan memberikan deskripsi atau jawaban berdasarkan isi gambar.

## 📄 Document Analysis
Membaca serta merangkum dokumen PDF atau TXT menggunakan AI.

## 🎵 Audio Processing
Melakukan transkripsi atau analisis file audio seperti MP3 dan WAV.

## ⚡ RESTful API Architecture
Menggunakan arsitektur REST API sehingga mudah diintegrasikan dengan frontend maupun aplikasi mobile.

## ☁️ Ready for Deployment
Project sudah siap untuk deployment ke platform cloud seperti Vercel.

---

# 🛠️ Technologies Used

| Technology | Description |
|------------|-------------|
| Node.js | JavaScript Runtime Environment |
| Express.js | Backend Web Framework |
| Google Gemini AI | Generative AI Model |
| @google/genai | Official Gemini SDK |
| Multer | File Upload Middleware |
| Dotenv | Environment Variable Manager |
| Vercel | Cloud Deployment Platform |

---

# 📂 Project Structure

```bash
EduBot-Final/
│
├── public/
│   ├── uploads/
│   └── assets/
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── vercel.json
├── index.js
└── README.md
```

---

# ⚙️ Persiapan & Instalasi Lokal

## 📋 Prerequisites

Pastikan perangkat Anda sudah memiliki:

- Node.js v18 atau lebih tinggi
- API Key dari Google AI Studio

---

# 🚀 Langkah Instalasi

## 1. Clone Repository

```bash
git clone https://github.com/MahendraNur/EduBot-Final.git
```

Masuk ke folder project:

```bash
cd EduBot-Final
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Buat file `.env` di root folder project:

```env
GOOGLE_API_KEY=masukkan_api_key_anda_disini
```

---

## 4. Jalankan Server

```bash
node index.js
```

Server akan berjalan di:

```bash
http://localhost:3000
```

---

# 📡 API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/generate-text` | POST | Memproses prompt teks biasa |
| `/generate-from-image` | POST | Memproses prompt + gambar |
| `/generate-from-document` | POST | Memproses prompt + file PDF/TXT |
| `/generate-from-audio` | POST | Memproses prompt + file audio |

---

# 🔍 Endpoint Details

---

# 1️⃣ Generate Text

Menghasilkan respons AI dari input teks biasa.

## Endpoint

```http
POST /generate-text
```

## Request Body

```json
{
  "prompt": "Jelaskan apa itu Artificial Intelligence."
}
```

---

# 2️⃣ Generate from Image

Menganalisis gambar menggunakan Gemini AI.

## Endpoint

```http
POST /generate-from-image
```

## Body Type

```bash
form-data
```

## Form Data

| Key | Type |
|-----|------|
| prompt | Text |
| image | File |

---

# 3️⃣ Generate from Document

Merangkum atau menganalisis dokumen.

## Endpoint

```http
POST /generate-from-document
```

## Body Type

```bash
form-data
```

## Form Data

| Key | Type |
|-----|------|
| prompt | Text |
| document | File |

---

# 4️⃣ Generate from Audio

Melakukan transkripsi audio menggunakan AI.

## Endpoint

```http
POST /generate-from-audio
```

## Body Type

```bash
form-data
```

## Form Data

| Key | Type |
|-----|------|
| prompt | Text |
| audio | File |

---

# 🧪 Testing API

API dapat diuji menggunakan:

- Postman
- Thunder Client
- Insomnia
- Frontend Website
- Mobile Application

---

# ☁️ Deployment ke Vercel

Project ini telah dikonfigurasi agar dapat langsung dideploy ke Vercel.

## Langkah Deployment

### 1. Hubungkan Repository GitHub ke Vercel

Import repository project Anda ke dashboard Vercel.

### 2. Tambahkan Environment Variable

Tambahkan:

```env
GOOGLE_API_KEY
```

di menu Environment Variables Vercel.

### 3. Deploy Project

Klik tombol:

```bash
Deploy
```

dan aplikasi akan otomatis online.

---

# 🔐 Security Notes

Jangan pernah mengupload file berikut ke GitHub:

```bash
.env
node_modules/
public/uploads/
```

Tambahkan ke `.gitignore`:

```gitignore
node_modules
.env
public/uploads
```

---

# 🎯 Tujuan Project

Project ini dikembangkan sebagai implementasi pembelajaran:

- RESTful API Development
- AI API Integration
- Multimodal AI Processing
- Backend Development with Express.js
- Cloud Deployment using Vercel

Sekaligus menjadi bagian dari Final Project Generative AI.

---

# 👨‍💻 Author

## Mahendra Nur Pramudiansyah

Undergraduate Student at Politeknik Manufaktur Bandung (POLMAN)

Industrial Informatics Engineering (TRIN)

Hacktiv8

GitHub:
https://github.com/MahendraNur

---

# ⭐ Support

Jika project ini membantu atau menginspirasi Anda:

```bash
⭐ Give this repository a star
```

Terima kasih telah mengunjungi project ini 🚀
