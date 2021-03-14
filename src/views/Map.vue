<template>
  <div>
    <ejs-dropdownlist :dataSource='carSelection' v-model="selectedCar" :fields="{ text: 'name', value: 'id' }" width="200"></ejs-dropdownlist>
    <div id="mapContainer"></div>
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
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(DropDownListPlugin);

export default {
 name: "Map",
 data() {
   return{
     eventId: 0,
     map: null,
     selectedCar: -1,
     cars: {},
     carSelection: [{id: "-1", name: ""}],
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
  watch: {
   selectedCar: function() {
     var car = this.cars[this.selectedCar];
     if (car)
     {
       this.map.flyTo(car.marker.getLatLng(), 18);
     }
     this.selectedCar = "-1";
   }
 },
 methods: {
   setupLeafletMap: function () {
    this.map = L.map("mapContainer").fitWorld();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
   },
   popoulateFinder: function() {
     for(var carId in this.cars)
     {
       var car = this.cars[carId];
       this.carSelection.push({
         id: car.info.Identifier,
         name: car.info.Identifier
       });
     }
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

            var customIcon = L.divIcon({iconSize: [50, 50], html: vehicle.Identifier, className: 'mapCarIcon'});
            var carMarker = L.marker([vehicle.Lat, vehicle.Lng],
            {
              icon: customIcon,
              rotationAngle: vehicle.Bearing - 90
            });
            carMarker.addTo(this.map);
            this.cars[vehicle.Identifier] = {
              info: vehicle,
              marker: carMarker
            };

          }
             
        });

        this.popoulateFinder();

      });
   },
    getStages() {
      axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v1/Events/" + this.eventId + "/stages").then(response => {
        
        //handle the stage polyline
        var extentPoints = [];
        response.data.forEach(stage => {
            if (stage.PolyLine == null || stage.Name == "Shakedown")
              return;

            var allPoints = [];
            stage.PolyLine.PolyPoints.forEach(point => {
              allPoints.push([point.Lat, point.Lng]);
            });
            extentPoints.push(allPoints);
            L.polyline(allPoints).addTo(this.map); 

            //handle start finishes
            stage.LocationPoints.forEach(point => {
                if (point.LocationPointTypeCode == "SS" || point.LocationPointTypeCode == "SF")
                {
                  var mark = L.marker([point.Lat, point.Lng], {
                    icon: point.LocationPointTypeCode == "SS" ? this.startIcon : this.finishIcon
                  }).addTo(this.map).bindTooltip(stage.Name);
                }
                
            });
        });
        this.map.flyToBounds(L.latLngBounds(extentPoints));

      });
   },
 },
 mounted() {
    this.eventId = this.$route.params.eventId;
    this.setupLeafletMap();
    this.getStages();
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
  height: calc(100vh - 150px);
}

</style>
