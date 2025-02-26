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

```plaintext
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

### 3.2 Veritabanı Yapısı

Projede PostgreSQL veritabanı kullanılmaktadır. Veritabanı tabloları Prisma ORM aracılığıyla yönetilmektedir. Aşağıda her tablonun kullanım amacı ve içerdiği alanlar detaylı olarak açıklanmıştır.

#### users Tablosu
Kullanıcı hesaplarının yönetimi için kullanılır. Öğrencilerin platforma kayıt olması, giriş yapması ve profil bilgilerinin tutulması için gereklidir.

- id (String): Benzersiz kullanıcı kimliği
- name (String): Kullanıcının tam adı
- email (String): Benzersiz e-posta adresi
- password (String): Şifrelenmiş parola
- role (Enum): Kullanıcı rolü (USER, ADMIN)
- image (String, Opsiyonel): Profil fotoğrafı
- createdAt (DateTime): Kayıt tarihi
- updatedAt (DateTime): Güncelleme tarihi

#### posts Tablosu
Öğrencilerin paylaştığı ders notlarının saklanması için kullanılır. Her not belirli bir fakülte ve bölümle ilişkilendirilir.

- id (String): Benzersiz not kimliği
- title (String): Not başlığı
- content (String): Not içeriği
- category (String): Not kategorisi (Ders notu, Sınav notu vb.)
- faculty (String): İlgili fakülte adı
- department (String): İlgili bölüm adı
- authorId (String): Notu paylaşan kullanıcının ID'si
- createdAt (DateTime): Oluşturulma tarihi
- updatedAt (DateTime): Son güncelleme tarihi

#### events Tablosu
Üniversite içinde düzenlenen etkinliklerin yönetimi için kullanılır. Etkinlikler admin onayından geçtikten sonra yayınlanır.

- id (String): Benzersiz etkinlik kimliği
- title (String): Etkinlik başlığı
- description (String): Etkinlik açıklaması
- date (DateTime): Etkinlik tarihi ve saati
- location (String): Etkinlik konumu
- category (String): Etkinlik türü
- faculty (String, Opsiyonel): İlgili fakülte
- status (Enum): Etkinlik durumu (PENDING, APPROVED, REJECTED)
- authorId (String): Etkinliği oluşturan kullanıcı ID'si
- createdAt (DateTime): Oluşturulma tarihi
- updatedAt (DateTime): Son güncelleme tarihi

#### comments Tablosu
Not paylaşımlarına yapılan yorumların saklanması için kullanılır. Her yorum bir not ve bir kullanıcıyla ilişkilidir.

- id (String): Benzersiz yorum kimliği
- content (String): Yorum metni
- authorId (String): Yorumu yapan kullanıcı ID'si
- postId (String): Yorumun yapıldığı not ID'si
- createdAt (DateTime): Oluşturulma tarihi
- updatedAt (DateTime): Son güncelleme tarihi

#### files Tablosu
Not paylaşımlarına eklenen dosyaların bilgilerinin tutulması için kullanılır. Dosyaların kendisi harici bir depolama hizmetinde saklanır.

- id (String): Benzersiz dosya kimliği
- name (String): Dosyanın orijinal adı
- url (String): Dosyanın erişim adresi
- size (Int): Dosya boyutu (byte)
- type (String): Dosya türü (PDF, DOC vb.)
- postId (String): Dosyanın eklendiği not ID'si
- createdAt (DateTime): Yüklenme tarihi
- updatedAt (DateTime): Son güncelleme tarihi

#### bookmarks Tablosu
Kullanıcıların daha sonra tekrar bakmak için kaydettiği notların takibi için kullanılır.

- id (String): Benzersiz yer işareti kimliği
- userId (String): Kaydeden kullanıcı ID'si
- postId (String): Kaydedilen not ID'si
- createdAt (DateTime): Oluşturulma tarihi
- updatedAt (DateTime): Son güncelleme tarihi

#### Enum Tipleri

**Role (Kullanıcı Rolleri)**
- USER: Normal kullanıcı hesabı
- ADMIN: Yönetici hesabı, ek yetkiler içerir

**EventStatus (Etkinlik Durumları)**
- PENDING: Onay bekleyen etkinlik
- APPROVED: Onaylanmış ve yayında olan etkinlik
- REJECTED: Reddedilmiş etkinlik

### 3.3 Backend API Yapısı

#### 3.3.1 API Endpoint'leri

##### Kullanıcı İşlemleri
| Endpoint | Metod | Açıklama |
|----------|-------|-----------|
| `/api/auth/register` | POST | Kullanıcı kaydı |
| `/api/auth/login` | POST | Kullanıcı girişi |

##### Not Paylaşımı
| Endpoint | Metod | Açıklama |
|----------|-------|-----------|
| `/api/posts` | GET | Notları listele |
| `/api/posts` | POST | Not paylaş |
| `/api/posts/:id` | GET | Not detayı |
| `/api/posts/:id` | DELETE | Not sil |
| `/api/posts/:id/files` | POST | Dosya yükle |

##### Yorumlar
| Endpoint | Metod | Açıklama |
|----------|-------|-----------|
| `/api/posts/:id/comments` | GET | Yorumları listele |
| `/api/posts/:id/comments` | POST | Yorum yap |
| `/api/comments/:id` | DELETE | Yorum sil |

##### Etkinlikler
| Endpoint | Metod | Açıklama |
|----------|-------|-----------|
| `/api/events` | GET | Etkinlikleri listele |
| `/api/events` | POST | Etkinlik oluştur |
| `/api/events/:id` | GET | Etkinlik detayı |
| `/api/events/:id` | PUT | Etkinlik güncelle |
| `/api/events/:id/status` | PUT | Etkinlik durumu güncelle |

##### Yer İşaretleri
| Endpoint | Metod | Açıklama |
|----------|-------|-----------|
| `/api/bookmarks` | GET | Yer işaretlerini listele |
| `/api/bookmarks` | POST | Yer işareti ekle |
| `/api/bookmarks/:id` | DELETE | Yer işareti kaldır |

#### 3.3.2 Middleware'ler

- **Auth Middleware**: Kimlik doğrulama ve yetkilendirme
- **Upload Middleware**: Dosya yükleme ve validasyon
- **Rate Limiting**: API isteklerini sınırlama
- **Error Handling**: Hata yönetimi
- **Logging**: İstek ve hata logları

#### 3.3.3 Güvenlik Önlemleri

| Önlem | Açıklama |
|-------|-----------|
| JWT Authentication | Token tabanlı kimlik doğrulama |
| Role-Based Access Control | Rol tabanlı yetkilendirme |
| Input Validation | Zod ile girdi doğrulama |
| File Validation | Dosya tipi ve boyut kontrolü |
| Rate Limiting | DDoS koruması |
| CORS Policies | Cross-origin kaynak paylaşımı |
| XSS Protection | Cross-site scripting koruması |
| SQL Injection Protection | Prisma ORM ile SQL enjeksiyon koruması |

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