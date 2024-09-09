<script>
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
//npm i leaflet
export default {
  name:'LeafletMap',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map('map').setView([10.856106, 106.631407], 20); // TMA
      // Thêm lớp bản đồ từ OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      // Đánh dấu vị trí
      const marker = L.marker([10.856106, 106.631407]).addTo(map);
      marker.bindPopup('<b>TMA Solution Lab 6</b>').openPopup();
    }
  }
}
</script>

<template>
  <div id="map"/>
</template>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>