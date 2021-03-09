<template>
  <div>
    <div id="mapContainer"></div>
    <div id="vehicles"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from 'axios';

import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
 name: "Map",
 data() {
   return{
     eventId: 0,
     map: null,
     center: [40.28, -99.23],
     startIcon: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }),
      finishIcon: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
   }
 },
 methods: {
   setupLeafletMap: function () {
    this.map = L.map("mapContainer").setView(this.center, 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
   },
   getVehicles() {
    axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v1/Events/" + this.eventId + "/LiveVehicleData").then(response => {
        var greenIcon = L.icon({
            iconUrl: 'rallyicon.png',
            iconSize:     [50, 50], // size of the icon
            iconAnchor:   [50, 50], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        response.data.forEach(vehicle => {
          if (vehicle.Lat > 0)
          {
            L.marker([vehicle.Lat, vehicle.Lng],
            {
              icon: greenIcon,
              rotationAngle: vehicle.Bearing - 90
            }).addTo(this.map);
          }
             
        });
      });
   },
   getStages() {
      axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v2/Events/" + this.eventId + "/polylines").then(response => {
        var extentPoints = [];
        response.data.forEach(stage => {
            var allPoints = [];
            stage.PolyPoints.forEach(point => {
              allPoints.push([point.Lat, point.Long]);
            });
            extentPoints.push(allPoints);
            L.polyline(allPoints).addTo(this.map); 
        });
        this.map.flyToBounds(L.latLngBounds(extentPoints));
      });
   },
    getStarts() {
      axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v2/Events/" + this.eventId + "/stagemaps").then(response => {
        response.data[0].StagePoints.forEach(stage => {
            if (stage.Code == "SS" || stage.Code == "SF")
            {
              var mark = L.marker([stage.Latitude, stage.Longitude], {
                icon: stage.Code == "SS" ? this.startIcon : this.finishIcon
              }).addTo(this.map);
            }
            
        });
      });
   }
 },
 mounted() {
    this.eventId = this.$route.params.eventId;
    this.setupLeafletMap();
    this.getStages();
    this.getStarts();
    this.getVehicles();
   
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#mapContainer {
  width:100vw;
  height: 100vh;
}
</style>
