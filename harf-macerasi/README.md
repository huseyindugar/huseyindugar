# 🦉 Harf Macerası

4–5 yaş için İngilizce (Amerikan) ve Türkçe harf öğrenme oyunu. iPad için tasarlandı. İnternet, hesap ya da kurulum gerektirmez.

## Oyunlar (her harf için)
| Simge | Oyun | Ne yapılır |
|---|---|---|
| 👀 | Tanış | Harfin kelime kartlarına dokunup dinler ("B is for Bear!") |
| 🔍 | Bul | "Which one starts with B?" sorusunda 3 resimden doğrusunu seçer |
| 👂 | Dinle | Duyduğu harfi 3 harf arasından bulur |
| 🃏 | Hafıza | Harf ve resim kartlarını eşleştirir |
| ▶️🎲 | Karışık | Kreşte öğrenilen harflerden uyarlanabilir 8 soru sorar, zorlandığı harfler daha sık gelir |

## Çıkartmalar 📒
- İlk denemede bilinen her cevapta o kelimenin resmi çıkartma olur ve albüme uçar.
- Üst üste 3 doğru cevapta parlak bir **süper çıkartma** gelir (👑 💎 🦖 🚒 …).
- Her oyunun sonunda bir büyük ödül çıkartması verilir.
- Haritada sağ üstteki 📒 sayacına basınca albüm açılır. Albümde çıkartmaya basınca adı iki dilde söylenir.

## İki dil birlikte
Resme basınca kelime önce oynanan dilde, sonra diğer dilde söylenir ("B is for Bear!" … "Ayı"). Kartın altında diğer dildeki adı da yazar. Ebeveyn panelinden kapatılabilir.

## Ebeveyn paneli
Ana ekranın sağ altındaki 🔒 simgesine **1,5 saniye basılı tutun**. Panelde şunlar var:
- **Kreşte gelinen harf** (iki dil için ayrı, başlangıçta F). Kreş ilerledikçe güncelleyin.
- Ses seçimi ve konuşma hızı
- Harf bazında doğru/yanlış sayıları; zorlandığı harfler kırmızı gösterilir

## Daha doğal ses (önerilir)
iPad'de: **Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler**
- English (US): örneğin *Samantha (Gelişmiş)* ya da *Ava (Premium)*
- Türkçe: *Yelda (Gelişmiş)*

## Kelime eklemek
`js/data.js` dosyasında ilgili harfin `words` listesine `['Kelime', '🙂', 'Diğer dildeki adı']` eklemeniz yeterli.
