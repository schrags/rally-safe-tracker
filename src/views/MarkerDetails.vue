<template>
  <div>
    <p>
      <strong>#{{vehicle.VehicleNumber}} {{vehicle.Make}}</strong><br/>
      <img :src="driverImageSrc"/> {{vehicle.Drv}}<br/>
      <img :src="coDriverImageSrc"/> {{vehicle.Nav}}<br/>
      {{vehicle.CompetitionStatus}}<br/>
      {{vehicle.RacingStatus}}<br/>
      Speed: {{vehicle.Speed}}<br/>
      Battery: {{vehicle.BatteryVoltage}} volts<br/>
      Last Updated {{vehicle.LastUpdatedTime}} minutes ago
    </p>
  </div>
</template>

<script>

import Vue from 'vue';

export default {
 name: "MarkerDetails",
 props: ["vehicle"],
 computed: {
   driverImageSrc() {
     return "https://sas-web-app-cdn.azureedge.net/cdn/CountryFlags/24/" + this.vehicle.DrvCountryCode +".png"
   },
   coDriverImageSrc() {
     return "https://sas-web-app-cdn.azureedge.net/cdn/CountryFlags/24/" + this.vehicle.NavCountryCode +".png"
   }
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>