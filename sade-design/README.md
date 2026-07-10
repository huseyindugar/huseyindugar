# Sade Design — Kurumsal Web Sitesi

İç mimarlık firması Sade Design için Next.js tabanlı, Türkçe/İngilizce kurumsal web sitesi.
Danışmanlık, tasarım, 3D görselleştirme ve anahtar teslim uygulama hizmetlerini tanıtır;
proje galerisi, referanslar ve bir "ücretsiz keşif talebi" iletişim formu içerir.

## Kurulum

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır (otomatik olarak `/tr`'ye yönlenir).

## Ortam değişkenleri

`.env.local` dosyası oluşturup aşağıdaki değerleri girin (örnek için `.env.local.example`
dosyasına bakabilirsiniz):

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Proje/portföy galerisi ve referanslar için Sanity proje ID'si. Boş bırakılırsa galeri ve referanslar bölümleri otomatik olarak "yakında" yer tutucularını gösterir, site çökmez. |
| `NEXT_PUBLIC_SANITY_DATASET` | Genellikle `production`. |
| `RESEND_API_KEY` | İletişim formunun e-posta göndermesi için [Resend](https://resend.com) API anahtarı. Ayarlanmazsa form kullanıcıya "doğrudan telefon/WhatsApp ile ulaşın" hatası gösterir. |
| `CONTACT_EMAIL_TO` | Keşif taleplerinin düşeceği e-posta adresi (varsayılan: `info@sadedesign.com`). |
| `CONTACT_EMAIL_FROM` | Resend üzerinde doğrulanmış bir domain varsa gönderen adresi (varsayılan test adresi: `onboarding@resend.dev`, gerçek kullanımda kendi domaininize geçirin). |

## Gerçek iletişim bilgilerinizi girin

`lib/site.ts` dosyasındaki telefon numarası, WhatsApp linki, e-posta, Instagram/LinkedIn ve
Google Yorumlar linki **yer tutucudur** — canlıya almadan önce bu dosyayı kendi gerçek
bilgilerinizle güncelleyin.

## Proje/portföy ve referans (testimonial) içeriği ekleme

İçerik, kod dokunmadan **Sanity Studio** üzerinden yönetilir:

1. [sanity.io](https://sanity.io) üzerinde ücretsiz bir hesap/proje oluşturun.
2. `NEXT_PUBLIC_SANITY_PROJECT_ID` değerini `.env.local`'e yazın.
3. `npm run dev` ile siteyi çalıştırıp `http://localhost:3000/studio` adresine gidin,
   Sanity hesabınızla giriş yapın.
4. **Proje** belgesi oluşturarak yeni bir render/portföy kaydı ekleyin: başlık (TR/EN),
   kategori (Salon, Yatak Odası, Mutfak, Ofis, Özel Mobilya), kapak görseli, ek görseller,
   açıklama.
5. **Referans** belgesi oluşturarak müşteri alıntılarını (isim, proje tipi, alıntı metni,
   1-5 yıldız puan) ekleyin. Bu alan ziyaretçi tarafından doldurulmaz — sadece siz
   ekleyip düzenlersiniz (bkz. aşağıdaki "Neden ziyaretçi yorum formu yok?").

Sanity yapılandırılmadığı sürece (env değişkeni boşsa) galeri ve referanslar bölümleri
sitenin marka diline uygun yer tutucu içerik gösterir; site asla hata vermez.

## Neden ziyaretçi yorum formu / iletişim verisi saklama yok?

Bu iki karar, planlama sürecinde bilinçli olarak verildi:

- **Yorumlar**: Küçük/butik iç mimarlık stüdyolarının sitelerinde standart olan, ziyaretçinin
  doğrudan siteye yorum bırakabildiği bir form değil, **Google İşletme Profili** ve **Houzz**
  gibi doğrulanmış üçüncü parti platformlardır. Bu yüzden referanslar stüdyo tarafından
  küratörlü olarak eklenir, ayrıca Google Yorumları'na yönlendiren bir buton bulunur
  (`lib/site.ts` içindeki `googleReviewsUrl` değerini kendi Google İşletme Profili linkinizle
  güncelleyin).
- **İletişim formu**: Form verileri (isim, telefon, e-posta, mesaj) hiçbir veritabanında veya
  CMS'te saklanmaz — sadece `RESEND_API_KEY` ile e-posta olarak iletilir. Bu, kişisel veri
  saklama/KVKK yükünü ortadan kaldırır.

## Sitenin dili

Türkçe (varsayılan, `/tr`) ve İngilizce (`/en`) olarak `next-intl` ile yönetilir. Metinler
`messages/tr.json` ve `messages/en.json` dosyalarında; bu dosyaları düzenleyerek site
metinlerini güncelleyebilirsiniz.

## Canlıya alma (domain & hosting)

- **Uygulama barındırma**: [Vercel](https://vercel.com) önerilir — Next.js'in kendi
  platformu, ek sunucu/veritabanı yönetimi gerektirmez. `vercel.com/new` üzerinden bu repoyu
  içe aktarıp yukarıdaki ortam değişkenlerini Vercel proje ayarlarına ekleyin.
- **İçerik (Sanity)**: Sanity projeniz zaten kendi barındırdığı (hosted) bir serviste
  çalışır, ek bir sunucu kurmanıza gerek yoktur.
- **Alan adı**: Aldığınız domaini Vercel projenize bağlarken Vercel'in verdiği DNS
  kayıtlarını (A/CNAME) alan adı sağlayıcınızda tanımlamanız yeterlidir.
- **E-posta**: Resend üzerinde kendi domaininizi doğrulayıp `CONTACT_EMAIL_FROM` değerini
  (örn. `noreply@sadedesign.com`) güncellemeniz önerilir; doğrulanmadan sadece
  `onboarding@resend.dev` test adresiyle gönderim yapılabilir.

## Proje yapısı (özet)

- `app/[locale]/` — Türkçe/İngilizce sayfalar (ana sayfa, proje detay, gizlilik politikası).
- `components/` — Her bölüm için ayrı bileşen (Hero, Services, Process, Gallery, vb.).
- `sanity/` — İçerik modelleri (`project`, `testimonial`) ve veri çekme fonksiyonları.
- `app/studio/` — Gömülü Sanity Studio (içerik yönetim paneli).
- `app/api/contact/route.ts` — İletişim formu, sadece e-posta gönderir, veri saklamaz.
- `messages/` — TR/EN çeviri dosyaları.
