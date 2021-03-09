<template>
  <div>
    <h2>{{eventName}} Entries</h2>
    <ejs-grid ref="grid" :dataSource="entries">
          <e-columns>
            <e-column field="DriverLastName" headerText="Driver" :valueAccessor="driverFormat" width="200"></e-column>
            <e-column field="NavigatorLastName" headerText="Navigator" :valueAccessor="coDriverFormat" width="200"></e-column>
            <e-column field="VehicleModel" headerText="Car" width="300"></e-column>
          </e-columns>
      </ejs-grid>   
  </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
Vue.use(GridPlugin);

export default {
 name: "Entries",
 data() {
   return{
     entries: []
   }
 },
 computed: {
   eventName() {
     return this.$store.state.selectedEvent.Name;
   }
 },
 methods: {
   driverFormat: (field, data) => {
     return data.DriverLastName + ", " + data.DriverFirstName;
   },
   coDriverFormat: (field, data) => {
     return data.NavigatorLastName + ", " + data.NavigatorFirstName;
   },
   getEntries() {
     axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v1/Events/" + this.$route.params.eventId + "/Entries").then(response => {
       this.entries = response.data;
    });
   }
 },
 mounted() {
   this.getEntries();
   //console.log(this.$route.params.eventId);
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>