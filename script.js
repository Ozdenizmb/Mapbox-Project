mapboxgl.accessToken = 'pk.eyJ1Ijoib3pkZW5pei1tYiIsImEiOiJjbHRjeHI1OGswMGl3MnBwYmN6anhpY2tqIn0.M9KfX3qsRKD3Dtogc8K_tQ'; // Mapbox için gerekli anahtar

let markers = [];
let map = null;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([29.03667, 40.98750])
}

function setupMap(kordinat) {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: kordinat,
    zoom: 14
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  });

  map.addControl(directions, "top-left");

  map.on('click', function (e) {
    const newMarker = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
    markers.push(newMarker);
    console.log(markers);

    const yeniSayfaButonu = document.getElementById("yeniSayfaButonu");

    if (markers.length > 0) {
      yeniSayfaButonu.classList.add("aktif");
    } else {
      yeniSayfaButonu.classList.remove("aktif");
    }

    yeniSayfaButonu.addEventListener("click", function () {
      const koordinatlar = JSON.stringify(markers.map(marker => marker.getLngLat()));
      window.location.href = "cardPage.html?koordinatlar=" + koordinatlar;
    });
  });
}