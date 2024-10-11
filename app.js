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

  // Telefon numarasını kopyalama işlevi
  phoneContainer.addEventListener('click', () => {
    // Numara metnini seç ve kopyala
    const phoneNumber = phoneNumberElement.textContent.trim();
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
const map = L.map('map').setView([39.86564155076201, 32.733861597060915], 17); // Güncellenmiş koordinatlar eklendi

// OpenStreetMap taban harita katmanı ekleme
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Hacettepe Üniversitesi Harita Mühendisliği Binası için marker ekleme
const marker = L.marker([39.86564155076201, 32.733861597060915]).addTo(map)
  .bindPopup('Department of Geomatics Engineering') // Popup mesajı güncellendi
  .openPopup();
