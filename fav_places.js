// Cesium Ion API anahtarınızı buraya ekleyin
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YjQxODUxZS00NDY4LTRhNzctYWM2OC1kMzhhZTE5ZTg0ZmYiLCJpZCI6MjQ3NjE1LCJpYXQiOjE3Mjg3NDE1NTh9.7PUQWz35ndu4xvBp-oLLsBhWqDGvjetfYYrIgoqXCS8';

// Cesium 3D Dünya Haritasını Başlatma
const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: Cesium.createWorldImagery(), // Dünya kaplaması ekleniyor
  baseLayerPicker: false, // Katman seçici gizli
  geocoder: false, // Geocoder gizli
  homeButton: false, // Ana sayfa butonu gizli
  sceneModePicker: false, // 2D/3D modları gizli
  navigationHelpButton: false, // Yardım butonu gizli
  animation: false, // Animasyon paneli gizli
  timeline: false // Zaman çizelgesi gizli
});

// İşaretlenecek koordinatlar ve resimler
const favoritePlaces = [
  { coords: [48.8566, 2.3522], img: 'paris.jpg', desc: 'Paris, France' },
  { coords: [40.7128, -74.0060], img: 'newyork.jpg', desc: 'New York, USA' },
  { coords: [35.6895, 139.6917], img: 'tokyo.jpg', desc: 'Tokyo, Japan' },
  { coords: [51.5074, -0.1278], img: 'london.jpg', desc: 'London, UK' },
  { coords: [34.0522, -118.2437], img: 'la.jpg', desc: 'Los Angeles, USA' }
];

// Her bir koordinata işaret ekleme
favoritePlaces.forEach(place => {
  const pinBuilder = new Cesium.PinBuilder();
  const billboard = viewer.entities.add({
    name: place.desc,
    position: Cesium.Cartesian3.fromDegrees(place.coords[1], place.coords[0]),
    billboard: {
      image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }
  });

  // İşarete tıklanınca popup açılması
  billboard.description = `
    <div style="text-align:center;">
      <h3>${place.desc}</h3>
      <img src="images/${place.img}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;">
    </div>
  `;
});

// Harita görünümü genişletme
viewer.camera.flyHome(0);
