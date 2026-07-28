Spine HR - iOS web app
======================

1. Bu klasordeki TUM dosyalari bir statik sunucuya yukleyin
   (Vercel / Netlify / GitHub Pages / kendi sunucunuz - https olmali).
2. iPhone'da Safari ile adresi acin.
3. Paylas (kare + ok) -> "Ana Ekrana Ekle".
4. Ana ekrandaki turuncu S ikonundan acin: Safari cubugu olmadan,
   tam ekran, gercek uygulama gibi calisir.

Notlar
- Masaustu tarayicida acarsaniz uygulama iPhone maketi icinde gorunur
  (inceleme modu). Telefonda veya ana ekrandan acildiginda maket, sahte
  durum cubugu ve cerceve otomatik kaybolur; ekrani tamamen kaplar.
- Yerelde denemek icin klasorde bir sunucu calistirin, ornegin:
     python3 -m http.server 8080
  ve telefondan bilgisayarin IP adresine gidin (ayni Wi-Fi).
  Dosyayi cift tiklayip file:// olarak acmak calismaz.
- Internet gerekir: React, Babel, Phosphor ikonlari ve Geist fontlari
  CDN'den yuklenir.
