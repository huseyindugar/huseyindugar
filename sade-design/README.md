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

## İçerik yönetim paneli (/studio) — kod yazmadan içerik güncelleme

Site içeriği, kod dokunmadan **Sanity Studio** panelinden yönetilir. Panel kurulduktan
sonra şunları kendiniz yapabilirsiniz:

- **Yeni proje eklemek** — başlık (TR/EN), kategori, kapak görseli + istediğiniz kadar ek
  görsel, açıklama. Görselleri sürükle-bırak ile yüklersiniz.
- **Yeni kategori açmak** — kategoriler artık sabit bir liste değil: proje eklerken
  kategori alanında "Create new" diyerek (ör. "Fuar Standı", "Restoran") yeni bir başlık
  açabilirsiniz; galeri filtre butonları otomatik olarak bu yeni kategoriyi gösterir.
- **Ana sayfa giriş fotoğraflarını değiştirmek** — **Site Ayarları** belgesindeki "Giriş
  Foto Şeridi" alanına 3 görsel yükleyin (1.si soldaki büyük alan, 2.si sağ üst, 3.sü sağ
  alt). Boş bırakılırsa mevcut varsayılan fotoğraflar gösterilir.
- **İstatistikleri güncellemek** — **Site Ayarları** belgesindeki "Rakamlarla Sade Design"
  listesinden değer (ör. `40+`) ve etiketleri (TR/EN) düzenleyin.
- **Referans/müşteri alıntısı eklemek** — **Referans** belgesi (isim, proje tipi, alıntı,
  1-5 yıldız). Not: Referanslar bölümü, ilk gerçek referans eklenene kadar siteden
  kaldırılmıştır; içerik hazır olduğunda tekrar açılabilir.

### Panel kurulumu (bir kere yapılır)

1. [sanity.io](https://sanity.io) üzerinde ücretsiz bir hesap ve proje oluşturun
   (kredi kartı istemez).
2. Projenin ID'sini `NEXT_PUBLIC_SANITY_PROJECT_ID` olarak `.env.local`'e (ve canlıda
   Vercel ortam değişkenlerine) yazın.
3. [sanity.io/manage](https://sanity.io/manage) → projeniz → **API → CORS origins**
   bölümüne sitenizin adreslerini ekleyin (`http://localhost:3000` ve canlı domaininiz).
4. Siteyi çalıştırıp `siteniz.com/studio` (yerelde `http://localhost:3000/studio`)
   adresine gidin, Sanity hesabınızla giriş yapın — panel budur.

Sanity yapılandırılmadığı sürece (env değişkeni boşsa) site, koda gömülü mevcut 17
projelik galeriyi ve varsayılan istatistik/fotoğrafları gösterir; site asla hata vermez.
Sanity'ye ilk proje eklendiği andan itibaren galeri **yalnızca** paneldeki içeriği
gösterir (statik seed devre dışı kalır) — bu yüzden panele geçerken mevcut projeleri de
oradan ekleyerek başlamanız önerilir.

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
