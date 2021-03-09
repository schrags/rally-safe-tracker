<template>
  <div>
    <h2>{{eventName}} Results</h2>
    <div class="d-flex justify-content-center">
      <ejs-dropdownlist ref="stageDropdown" v-model="selectedStage" :dataSource='stages' :fields="stageFields" width="200"></ejs-dropdownlist>
    </div>    
    <ejs-grid ref="grid" :dataSource="results">
          <e-columns>
            <e-column field="id" headerText="" width="50"></e-column>
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
import { DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(GridPlugin);
Vue.use(DropDownListPlugin);

export default {
 name: "Results",
 data() {
   return{
     results: [],
     stages: [],
     stageFields: { text: 'name', value: 'id' },
     selectedStage: null
   }
 },
 watch: {
   selectedStage: function() {
     this.getEntries();
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
  getStages() {
    axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v2/Events/" + this.$route.params.eventId + "/Stages").then(response => {
      let stages = [];
      response.data.forEach(s => {
        let stage = {
          id: s.StageId,
          name: s.Name
        };
        if (s.Number > 0)
          stages.push(stage);
      });

      this.stages = stages;
      this.selectedStage = stages[0].id;
    });
   },
   getEntries() {
     axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=https://app.rallysafe.com.au/LiveData/StageTimes/?StageId=" + this.selectedStage).then(response => {
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
   this.getStages();
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>