<template>
  <div>
    <h2>{{eventName}} Results</h2>
    <ejs-grid ref="grid" :dataSource="results">
          <e-columns>
            <e-column field="carNumber" headerText="#" width="75"></e-column>
            <e-column field="driver"></e-column>
            <e-column field="coDriver" hideAtMedia='(min-width: 700px)'></e-column>
            <e-column field="carName" hideAtMedia='(min-width: 700px)'></e-column>
            <e-column field="class" width="100" hideAtMedia='(min-width: 700px)'></e-column>
            <e-column field="stageTime"></e-column>
            <e-column field="averageSpeed"></e-column>
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
 name: "Results",
 data() {
   return{
     results: []
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
     axios.get("http://localhost:8082/events/" + this.$route.params.eventId + "/Results").then(response => {
       let rows = [];
       response.data.aaData.forEach(r => {
         let obj = {
           id: r[0],
           carNumber: r[1],
           driver: r[2],
           coDriver: r[3],
           carName: r[4],
           class: r[5],
           stageStart: r[6],
           stageFinish: r[7],
           stageTime: r[8],
           averageSpeed: r[9]
         };
         rows.push(obj);
       });

       this.results = rows;
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