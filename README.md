# Amasya Üniversitesi Öğrenci Platformu

Amasya Üniversitesi öğrencileri için geliştirilmiş kapsamlı bir web platformu. Bu platform, öğrencilerin üniversite hayatını kolaylaştırmak ve Amasya şehrini daha iyi tanımalarını sağlamak amacıyla tasarlanmıştır.

## 🚀 Özellikler

- 📚 Not paylaşım sistemi
- 📅 Etkinlik takvimi ve yönetimi
- 🏛️ Üniversite bilgileri ve akademik takvim
- 🏠 Yurt bilgileri ve otobüs güzergahları
- 🏰 Amasya şehir rehberi
- 🍖 Yöresel lezzetler tanıtımı
- 🤖 AI destekli şehir rehberi chatbot
- 🌐 Çoklu dil desteği (Türkçe/İngilizce)

## 🛠️ Teknolojiler

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL (Neon)
- NextAuth.js
- Cloudinary
- Google Gemini AI
- Leaflet Maps
- shadcn/ui

## 📋 Gereksinimler

- Node.js 18.17 veya üzeri
- npm veya yarn
- PostgreSQL veritabanı
- Cloudinary hesabı
- Google Gemini API anahtarı

## ⚙️ Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/kullanici-adi/amasya-uni-ogrenci-platformu.git
cd amasya-uni-ogrenci-platformu
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. .env dosyasını oluşturun ve gerekli değişkenleri ekleyin:
```env
# Veritabanı
DATABASE_URL="postgresql://kullanici:sifre@host:port/veritabani"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gizli-anahtar"

# Cloudinary
CLOUDINARY_CLOUD_NAME="cloud-name"
CLOUDINARY_API_KEY="api-key"
CLOUDINARY_API_SECRET="api-secret"

# Google Gemini AI
GEMINI_API_KEY="gemini-api-key"
```

4. Veritabanı şemasını oluşturun:
```bash
npx prisma generate
npx prisma db push
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

6. Tarayıcınızda http://localhost:3000 adresini açın

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js app router sayfaları
├── components/            # Yeniden kullanılabilir bileşenler
├── lib/                  # Yardımcı fonksiyonlar ve hooks
├── api/                  # API route'ları
├── styles/              # Global stil dosyaları
├── types/               # TypeScript tip tanımlamaları
├── utils/              # Yardımcı fonksiyonlar
└── locales/            # Dil dosyaları
```

## 🔒 Güvenlik

- Tüm form girişleri Zod ile doğrulanır
- API rotaları NextAuth.js ile korunur
- XSS koruması için içerik sanitizasyonu uygulanır
- Dosya yüklemeleri Cloudinary üzerinden güvenli bir şekilde yapılır
