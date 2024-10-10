function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
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
