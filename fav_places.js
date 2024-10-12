// Cesium Ion API anahtarını başkalarının da kullanabilmesi için açık hale getirdim bu key ile 3D animasyonlu kontrol edilebilir bir dünya haritasını sietnize koyabilirsiniz!
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0Y2U2MjVmOS00M2Y4LTRlOTItOWVmNy1iYWJlYzFmNzExMWYiLCJpZCI6MjQ3NjE1LCJpYXQiOjE3Mjg3NDIyNjl9.jdyVwQTRZu228WPpDzHHLCG3yVtXbeCyKU_VxqDuQXo';


// Cesium 3D Dünya Haritasını Başlatma
const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: Cesium.createWorldImagery(),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  animation: false,
  timeline: false
});

// Görsel galerisi için mevcut indeksleri
let currentIndex = 0;
let currentPlaceImages = [];

// Varşova resimlerini tutan dizi
const warsawImages = [
  'fav_places_images/warsaw1.png',
  'fav_places_images/warsaw2.png',
  'fav_places_images/warsaw3.png'
];

// İşaretlenecek yerler (Varşova, Gdansk, Ankara)
const favoritePlaces = [
  { coords: [52.2297, 21.0122], images: warsawImages, desc: 'Warsaw, Poland' },
  { coords: [54.3520, 18.6466], images: ['fav_places_images/gdansk.png'], desc: 'Gdansk, Poland' },
  { coords: [39.9334, 32.8597], images: ['fav_places_images/ankara.png'], desc: 'Ankara, Turkey' }
];

// Benzersiz kimlik atama ve tıklama işlevi
favoritePlaces.forEach((place, index) => {
  const pinBuilder = new Cesium.PinBuilder();
  const billboard = viewer.entities.add({
    name: place.desc,
    position: Cesium.Cartesian3.fromDegrees(place.coords[1], place.coords[0]),
    billboard: {
      image: pinBuilder.fromColor(Cesium.Color.RED, 48).toDataURL(),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }
  });

  // İşaretçiye tıklama olayını doğrudan tanımlıyoruz
  billboard.placeIndex = index; // Her birine placeIndex atıyoruz
});

// Tıklama olayı
viewer.screenSpaceEventHandler.setInputAction(function(click) {
  const pickedObject = viewer.scene.pick(click.position);

  // Eğer bir entity seçildiyse ve bu entity bir billboard ise popup açılır
  if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && pickedObject.id.placeIndex !== undefined) {
    openPopup(pickedObject.id.placeIndex);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// Görsel galerisi popup'ını açma
function openPopup(placeIndex) {
  currentPlaceImages = favoritePlaces[placeIndex].images;
  currentIndex = 0;
  showImage(currentPlaceImages[currentIndex]);
  const popup = document.getElementById('largePopup');
  popup.style.display = 'flex'; // Popup görünür hale gelir
}

// Görüntüleri gösterme
function showImage(imageUrl) {
  document.getElementById('largeImage').src = imageUrl;
}

// Önceki resme gitme
function prevImage() {
  currentIndex = (currentIndex - 1 + currentPlaceImages.length) % currentPlaceImages.length;
  showImage(currentPlaceImages[currentIndex]);
}

// Sonraki resme gitme
function nextImage() {
  currentIndex = (currentIndex + 1) % currentPlaceImages.length;
  showImage(currentPlaceImages[currentIndex]);
}

// Popup'ı kapatma
function closePopup() {
  const popup = document.getElementById('largePopup');
  popup.style.display = 'none'; // Popup gizlenir
}

// Harita görünümünü ayarla
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(32.8597, 45.9334, 7000000)
});
