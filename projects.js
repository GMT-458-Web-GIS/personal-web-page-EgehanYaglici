// Görseller ve Açıklamalar
const galleryImages = [
  { src: 'project_page_images/anasayfa.png', description: 'Homepage of the GNSS Monitoring Application, left part includes all active mountpoints list and it takes the data from internet every program opening. Mountpoint meta-datas appears when user select the mounpoint on the list. Other settings includes in this tab' },
  { src: 'project_page_images/ground_track1.png', description: 'Ground Track Analysis: 3 satellite systems can be displayed in real time and user set the update time. This feature shows orbits too.' },
  { src: 'project_page_images/ground_track2.png', description: 'Ground Track Analysis: GPS satellite orbits ' },
  { src: 'project_page_images/ground_track3.png', description: 'Ground Track Analysis: Beidou satellite orbits ' },
  { src: 'project_page_images/spp.png', description: 'SPP Algorithm Implementation: Skyplot, SPP, visibilty and north-east-up error on graphics all these are create in real time due to update times' },  // Yeni eklenen görseller
  { src: 'project_page_images/iono.png', description: 'Ionospheric VTEC Map: This part uses a harmonic-coefficents for calculations. All data can be seen in the this tab with calculation times' },
  { src: 'project_page_images/settings.png', description: 'Settings and Configurations' },
  { src: 'project_page_images/account.png', description: 'User Account Management' },
  { src: 'project_page_images/save.png', description: 'Save and Backup Options' }
];

// Değişkenler
let currentImageIndex = 0; // İlk resim
const circleContainer = document.querySelector('.circle-container'); // Daireyi seçme
const popup = document.querySelector('.popup');
const popupImage = document.querySelector('.popup-image');
const imageDescription = document.querySelector('.popup-description');
const closePopup = document.querySelector('.close-button');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');

// Daireye tıklanınca popup açma
circleContainer.addEventListener('click', () => {
  popup.style.display = 'flex'; // Popup'ı görünür yap
  showImage(currentImageIndex); // İlk resimle başla
});

// Popup'ı kapatma
closePopup.addEventListener('click', () => {
  popup.style.display = 'none'; // Popup'ı gizle
});

// İleri ve geri butonları
nextButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length; // Sonraki resme geç
  showImage(currentImageIndex);
});

prevButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length; // Önceki resme geç
  showImage(currentImageIndex);
});

// Görsel gösterme fonksiyonu
function showImage(index) {
  popupImage.src = galleryImages[index].src; // Seçili görseli göster
  imageDescription.textContent = galleryImages[index].description; // Açıklamayı göster
}

// Tema geçiş fonksiyonu
function toggleThemeWithSlider() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme); // Tema durumunu localStorage'da saklıyoruz
}

// Sayfa yüklendiğinde localStorage'dan tema bilgisini yükleyip slider'ı ayarla
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Varsayılan olarak 'light'
  document.body.setAttribute('data-theme', savedTheme);

  // Slider durumunu tema ile eşleştir
  const themeSlider = document.getElementById('themeSlider');
  if (savedTheme === 'dark') {
    themeSlider.checked = true;
  } else {
    themeSlider.checked = false;
  }
});
