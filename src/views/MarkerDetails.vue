<template>
  <div>
    <p>
      <strong>#{{vehicle.VehicleNumber}} {{vehicle.Make}}</strong><br/>
      {{vehicle.Drv}}<br/>
      {{vehicle.Nav}}<br/>
      {{vehicle.CompetitionStatus}}<br/>
      {{vehicle.RacingStatus}}<br/>
      Battery: {{vehicle.BatteryVoltage}}<br/>
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
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>