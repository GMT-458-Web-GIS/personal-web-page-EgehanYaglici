// Tema geçiş animasyonu ve renk değişikliği
function toggleTheme() {
  const body = document.body;
  const container = document.querySelector('.container');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  // Temayı değiştirme ve animasyon uygulama
  const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', currentTheme);
  container.style.transition = 'background 0.5s ease, color 0.5s ease, border-color 0.5s ease';
  header.style.transition = 'background 0.5s ease, color 0.5s ease';
  footer.style.transition = 'background 0.5s ease, color 0.5s ease';
}
// LinkedIn animasyonu için metin değişimi kontrolü

// LinkedIn Bağlantısını ve Yazı Elemanını Seçme
const linkedinLink = document.querySelector('.linkedin-link');
const linkedinText = document.getElementById('linkedin-text');

// Hover Durumunda 'My Profile' Yazısı Göster ve Boşluğu Koru
linkedinLink.addEventListener('mouseenter', () => {
  linkedinText.innerHTML = '<span class="space">&nbsp;</span>My Profile';
});

// Hover Durumundan Çıkıldığında Boşluklu 'LinkedIn' Yazısına Geri Dön
linkedinLink.addEventListener('mouseleave', () => {
  linkedinText.innerHTML = '<span class="space">&nbsp;</span>LinkedIn';
});

// Telefon numarasını kopyalama işlevi
document.addEventListener('DOMContentLoaded', () => {
  const phoneContainer = document.querySelector('.phone-container');
  const phoneNumberElement = document.querySelector('.phone-number');
  const copyMessage = document.getElementById('copy-message');

  // Kopyalanacak numarayı sabit bir değişken olarak tanımla
  const phoneNumber = "+90 553 416 31 03"; // Gerçek telefon numarası
  const initialText = "Click For Copy Number!";

  // Başlangıçta "Click For Copy Number!" yazısını göster
  phoneNumberElement.textContent = initialText;

  // Mouse ile üzerine gelindiğinde gerçek telefon numarasını göster
  phoneContainer.addEventListener('mouseenter', () => {
    phoneNumberElement.style.opacity = 0; // Önce opacity 0 yap
    setTimeout(() => {
      phoneNumberElement.textContent = phoneNumber; // Metni değiştir
      phoneNumberElement.style.opacity = 1; // Sonra tekrar görünür yap
      phoneContainer.classList.add('show-number'); // Animasyonu etkinleştir
    }, 300); // 0.3 saniye bekle, sonra metni değiştir ve görünür yap
  });

  // Mouse çekildiğinde tekrar "Click For Copy Number!" yazısına dön
  phoneContainer.addEventListener('mouseleave', () => {
    phoneNumberElement.style.opacity = 0; // Önce opacity 0 yap
    setTimeout(() => {
      phoneNumberElement.textContent = initialText; // Metni değiştir
      phoneNumberElement.style.opacity = 1; // Sonra tekrar görünür yap
      phoneContainer.classList.remove('show-number'); // Animasyonu kapat
    }, 300); // 0.3 saniye bekle, sonra metni değiştir ve görünür yap
  });

  // Telefon numarasını kopyalama işlevi
  phoneContainer.addEventListener('click', () => {
    // Sabit değişkende tuttuğumuz gerçek telefon numarasını kopyala
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        // Kopyalama işlemi başarılı olduğunda mesajı göster
        showCopyMessage();
      })
      .catch(err => {
        console.error('Failed to copy the phone number: ', err);
      });
  });

  // Kopyalama mesajını gösterme fonksiyonu
  function showCopyMessage() {
    copyMessage.classList.add('show');
    setTimeout(() => {
      copyMessage.classList.remove('show');
    }, 2000); // 2 saniye sonra mesajı gizle
  }
});


// Leaflet.js ile haritayı başlatma ve Hacettepe Üniversitesi Harita Mühendisliği Bölümü'nü gösterme
const map = L.map('map').setView([39.86564155076201, 32.733861597060915], 17); // Güncellenmiş koordinatlar

// OpenStreetMap taban harita katmanı ekleme
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Hacettepe Üniversitesi Harita Mühendisliği Binası için marker ekleme
const marker = L.marker([39.86564155076201, 32.733861597060915]).addTo(map);

// Popup mesajını oluştur
const popup = L.popup().setContent('Department of Geomatics Engineering');

// Marker üzerine gelince popup mesajını gösterme
marker.on('mouseover', () => {
  marker.bindPopup(popup).openPopup(); // Popup mesajını göster
});

// Marker üzerinden çıkılınca popup mesajını kapatma
marker.on('mouseout', () => {
  marker.closePopup(); // Popup mesajını gizle
});
