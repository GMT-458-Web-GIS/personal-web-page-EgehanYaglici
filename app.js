// Tema geçiş animasyonu ve renk değişikliği
function toggleTheme() {
  const body = document.body;
  const container = document.querySelector('.container');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  // Geçerli tema bilgisini LocalStorage'da tut
  const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);

  // Tema geçişi sırasında animasyonları uygula
  container.style.transition = 'background 0.5s ease, color 0.5s ease, border-color 0.5s ease';
  header.style.transition = 'background 0.5s ease, color 0.5s ease';
  if (footer) {
    footer.style.transition = 'background 0.5s ease, color 0.5s ease';
  }
}

// Sayfa yüklendiğinde temayı uygula
function applyThemeFromLocalStorage() {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Varsayılan olarak light tema
  document.body.setAttribute('data-theme', savedTheme);

  // Checkbox işaretleme durumu
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    themeSwitch.checked = (savedTheme === 'dark');
  }
}

// Sayfa yüklendiğinde temayı uygula
document.addEventListener('DOMContentLoaded', applyThemeFromLocalStorage);

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
  // 1. Telefon Numarası Kopyalama İşlevi ve Animasyonlar
  const phoneContainer = document.querySelector('.phone-container');
  const phoneNumberElement = document.querySelector('.phone-number');
  const copyMessage = document.getElementById('copy-message');


  const phoneNumber = "+90 553 416 31 03"; // Gerçek telefon numarası
  const initialText = "Click For Copy Number!"; // Başlangıç metni

  // Başlangıçta "Click For Copy Number!" yazısını göster
  phoneNumberElement.textContent = initialText;

  // Mouse ile üzerine gelindiğinde telefon numarasını aşağıdan yukarıya animasyon ile göster
  phoneContainer.addEventListener('mouseenter', () => {
    phoneNumberElement.style.opacity = 0; // Opacity'yi önce gizle
    phoneNumberElement.style.transform = 'translateY(20px)'; // Numaranın aşağıda başlamasını sağla


    setTimeout(() => {
      phoneNumberElement.textContent = phoneNumber; // Gerçek telefon numarasını göster
      phoneContainer.classList.add('show-number'); // Animasyonu etkinleştir
    }, 100);

    // Animasyonlu geçişi tetikle
    setTimeout(() => {
      phoneNumberElement.style.opacity = 1; // Opacity'yi görünür yap
      phoneNumberElement.style.transform = 'translateY(0)'; // Yukarı kaydır
    }, 200);
  });

  // Mouse çekildiğinde tekrar "Click For Copy Number!" yazısına dön ve animasyonu aşağıdan yukarıya uygula
  phoneContainer.addEventListener('mouseleave', () => {
    phoneNumberElement.style.opacity = 0; // Önce opacity'yi gizle
    phoneNumberElement.style.transform = 'translateY(20px)'; // Numaranın aşağıya kaymasını sağla

    setTimeout(() => {
      phoneNumberElement.textContent = initialText; // Başlangıç metnine dön
      phoneContainer.classList.remove('show-number'); // Animasyonu kapat
    }, 200);

    // Metni değiştirdikten sonra animasyonlu geçişi tetikle
    setTimeout(() => {
      phoneNumberElement.style.opacity = 1; // Opacity'yi tekrar görünür yap
      phoneNumberElement.style.transform = 'translateY(0)'; // Numara yukarı kaydır
    }, 200);
  });

  // Telefon numarasını kopyalama işlevi
  phoneContainer.addEventListener('click', () => {
    // Clipboard API'nin desteklenip desteklenmediğini kontrol et
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber)
        .then(() => {
          showCopyMessage();
        })
        .catch(err => {
          console.error('Failed to copy the phone number: ', err);
        });
    } else {
      // Clipboard API desteklenmiyorsa `execCommand` yöntemini kullan
      const tempInput = document.createElement('input');
      tempInput.value = phoneNumber;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy'); // Eski yöntemle kopyalama
      document.body.removeChild(tempInput);
      showCopyMessage(); // Kopyalama mesajını göster
    }
  });

  // Kopyalama mesajını gösterme fonksiyonu
  function showCopyMessage() {
    copyMessage.classList.add('show');
    setTimeout(() => {
      copyMessage.classList.remove('show');
    }, 2000); // 2 saniye sonra mesajı gizle
  }

  // 2. Leaflet Harita ve Marker Güncellemesi
  const map = L.map('map').setView([39.86564155076201, 32.733861597060915], 17); // Hacettepe Üniversitesi Harita Mühendisliği Koordinatları

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
});

// Zarf ve e-posta seçenekleriyle ilgili işlevler
let emailTimeout;

function toggleEmailOptions() {
  const envelope = document.querySelector('.envelope-container');
  const emailOptions = document.getElementById('email-options');

  // Zarfı aktif yap ve butonları göster
  if (envelope.classList.contains('active')) {
    // Zarf kapanıyor, animasyonla geri git
    envelope.classList.remove('active');
    envelope.classList.add('closing');

    // Zarf kapanırken seçenekleri gizle
    setTimeout(() => {
      emailOptions.style.display = 'none';
      envelope.classList.remove('closing');
    }, 500); // Animasyonun süresi kadar bekle (500ms)
  } else {
    // Zarf açılıyor, butonlar görünsün ve animasyon başlasın
    envelope.classList.add('active');
    emailOptions.style.display = 'flex';

    // 5 saniye sonra seçenekler kapanacak
    emailTimeout = setTimeout(() => {
      closeEmailOptions();
    }, 5000);
  }
}

function closeEmailOptions() {
  const envelope = document.querySelector('.envelope-container');
  const emailOptions = document.getElementById('email-options');

  envelope.classList.remove('active');
  envelope.classList.add('closing');

  // 500ms sonra butonları tamamen gizle
  setTimeout(() => {
    emailOptions.style.display = 'none';
    envelope.classList.remove('closing');
  }, 500);

  // Eğer zarf kapanırsa zamanlayıcıyı temizle
  if (emailTimeout) {
    clearTimeout(emailTimeout);
  }
}

// Butonların tamamını tıklanabilir hale getirmek için işlev
function makeButtonsClickable() {
  const buttons = document.querySelectorAll('.email-option');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const link = button.querySelector('a');
      if (link) {
        window.location.href = link.href; // Butona tıklanınca bağlantıya yönlendir
      }
    });
  });
}

// E-posta seçeneklerinden birini seçince zarf kapanmasın
const emailOptionsContainer = document.getElementById('email-options');

emailOptionsContainer.addEventListener('mouseenter', () => {
  // Fare butonların üzerindeyse zarf kapanmasın
  clearTimeout(emailTimeout);
});

emailOptionsContainer.addEventListener('mouseleave', () => {
  // Fare butonlardan ayrıldığında tekrar zamanlayıcı başlat
  emailTimeout = setTimeout(() => {
    closeEmailOptions();
  }, 5000);
});

// Sayfa yüklendiğinde butonları tıklanabilir yap
document.addEventListener('DOMContentLoaded', () => {
  makeButtonsClickable(); // Butonları tıklanabilir yap
});
