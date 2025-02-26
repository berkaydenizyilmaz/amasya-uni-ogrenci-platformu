# Amasya Üniversitesi Öğrenci Platformu - Proje Raporu

## 1. Proje Özeti
Amasya Üniversitesi öğrencileri için geliştirilmiş, modern ve kullanıcı dostu bir web platformudur. Platform, öğrencilerin akademik ve sosyal hayatlarını kolaylaştırmak amacıyla çeşitli modüller içermektedir. Öğrencilerin ders notlarını paylaşabildiği, etkinliklere katılabildiği, kampüs ve şehir hakkında bilgi edinebileceği kapsamlı bir dijital ekosistem sunmaktadır.

## 2. Kullanılan Teknolojiler

### 2.1 Frontend Teknolojileri
- **Next.js 15**: Server-side rendering, route optimizasyonu ve SEO avantajları için tercih edildi
- **Tailwind CSS**: Hızlı geliştirme ve tutarlı tasarım için kullanıldı
- **shadcn/ui**: Modern ve özelleştirilebilir UI komponentleri sağladı
- **Lucide Icons**: Yüksek kaliteli ve özelleştirilebilir ikonlar için kullanıldı
- **next-auth**: Güvenli kimlik doğrulama sistemi entegrasyonu sağladı
- **next-intl**: Türkçe ve İngilizce dil desteği için implementte edildi
- **Swiper**: Ana sayfa ve galeri görüntülemeleri için slider komponenti olarak kullanıldı

### 2.2 Backend Teknolojiler
- **Prisma ORM**: Veritabanı işlemleri için type-safe sorgular sağladı
- **PostgreSQL**: Ana veritabanı olarak Neon üzerinde barındırıldı
- **NextAuth.js**: Oturum yönetimi ve yetkilendirme için kullanıldı
- **API Routes**: REST API endpointleri için Next.js route handlers kullanıldı
- **Zod**: Form validasyonları ve veri doğrulama için tercih edildi

### 2.3 Geliştirme Araçları
- **ESLint**: Kod kalitesi ve standartları için kullanıldı
- **PostCSS**: CSS optimizasyonu ve işleme için kullanıldı
- **Git**: Versiyon kontrolü için kullanıldı
- **Prettier**: Kod formatlaması için kullanıldı

## 3. Proje Yapısı

### 3.1 Dizin Yapısı
```
/src
  /app             # Sayfa bileşenleri ve route'lar
    /api          # API route handlers
    /amasya       # Şehir rehberi sayfaları
    /etkinlikler  # Etkinlik sayfaları
    /not-paylasimi # Not paylaşım sistemi
    /universite   # Üniversite bilgileri
    /yurt-ulasim  # Yurt ve ulaşım bilgileri
  /components     # Yeniden kullanılabilir UI bileşenleri
    /ui          # Temel UI komponentleri
  /lib           # Yardımcı fonksiyonlar ve hooks
  /locales       # Dil dosyaları (tr.js, en.js)
  /styles        # Global stil tanımlamaları
  /types         # TypeScript tip tanımlamaları
  /utils         # Yardımcı fonksiyonlar
```

### 3.2 Ana Modüller
1. **Üniversite Bilgileri**
   - Genel tanıtım ve tarihçe
   - Akademik takvim ve önemli tarihler

2. **Not Paylaşımı**
   - Ders notları ve kaynaklar
   - Fakülte ve bölüm bazlı filtreleme
   - Dosya yükleme ve indirme sistemi
   - Yorum ve değerlendirme sistemi
   - Yer işaretleme özelliği

3. **Etkinlikler**
   - Etkinlik oluşturma ve düzenleme
   - Kategori bazlı filtreleme
   - Takvim görünümü
   - Katılım yönetimi
   - Admin onay sistemi

4. **Yurt ve Ulaşım**
   - Yurt bilgileri ve konumları
   - Otobüs güzergahları ve saatleri
   - İnteraktif harita entegrasyonu
   - Durak ve güzergah detayları

5. **Amasya Rehberi**
   - Tarihi yerler ve müzeler
   - Yöresel lezzetler
   - Gezi rotaları
   - Fotoğraf galerisi

## 4. Geliştirme Süreci

### 4.1 Mimari Kararlar
- **Server-Side Rendering**: SEO optimizasyonu ve hızlı sayfa yüklemeleri için
- **API Route Handlers**: Güvenli ve hızlı backend işlemleri için
- **Responsive Tasarım**: Tüm cihaz boyutlarına uyumlu arayüz
- **Theme Sistemi**: Kolay özelleştirilebilir renk ve stil tanımlamaları
- **Modüler Yapı**: Kolay bakım ve genişletilebilirlik
- **Component Mimarisi**: Yeniden kullanılabilir ve test edilebilir bileşenler

### 4.2 Karşılaşılan Zorluklar ve Çözümler
1. **Çoklu Dil Desteği**
   - Sorun: Dinamik içeriklerin çevirisi ve dil değişiminde sayfa yenileme
   - Çözüm: next-intl ile client ve server tarafında çeviri desteği
   - Sonuç: Kesintisiz dil değişimi ve SEO dostu URL yapısı

2. **Performans Optimizasyonu**
   - Sorun: Büyük veri setlerinin yönetimi ve sayfa yüklenme süreleri
   - Çözüm: Sayfalama, lazy loading ve image optimizasyonu
   - Sonuç: 3 saniyeden kısa sayfa yüklenme süreleri

3. **Harita Entegrasyonu**
   - Sorun: SSR ile harita komponentinin uyumsuzluğu
   - Çözüm: Dynamic import ve client-side rendering
   - Sonuç: Sorunsuz harita görüntüleme ve performans

4. **Dosya Yönetimi**
   - Sorun: Büyük dosyaların yüklenmesi ve depolanması
   - Çözüm: Chunk upload ve dosya boyutu kontrolü
   - Sonuç: Güvenli ve hızlı dosya paylaşımı

### 4.3 Güvenlik Önlemleri
- JWT tabanlı kimlik doğrulama
- Zod ile input validasyonu
- Rate limiting ile DDoS koruması
- CORS politikaları
- XSS koruması
- Dosya tipi ve boyut kontrolü
- Rol tabanlı yetkilendirme

## 5. Test ve Kalite Kontrol
- ESLint ile kod kalitesi kontrolü
- TypeScript ile tip güvenliği
- Responsive tasarım testleri
- Cross-browser uyumluluk
- Performans optimizasyonu
- Güvenlik testleri

## 6. Gelebilecek Geliştirmeler
1. PWA desteği ile offline kullanım
2. Real-time bildirim sistemi
3. Gelişmiş arama özellikleri
4. Sosyal etkileşim özellikleri
5. AI destekli içerik önerileri
6. Mobil uygulama
7. Canlı sohbet desteği
8. Akademik takvim entegrasyonu

## 7. Sonuç
Proje, modern web teknolojilerini kullanarak öğrencilerin ihtiyaçlarına yönelik kapsamlı bir çözüm sunmaktadır. Modüler yapısı ve genişletilebilir mimarisi sayesinde gelecekteki ihtiyaçlara göre kolayca güncellenebilir ve geliştirilebilir durumdadır. Kullanıcı deneyimi, performans ve güvenlik önceliklendirilerek geliştirilen platform, öğrencilerin akademik ve sosyal hayatlarını kolaylaştırmayı başarıyla hedeflemektedir.