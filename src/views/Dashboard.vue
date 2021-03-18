<template>
  <div class="eventsPage">
    <ejs-grid :dataSource="events" :recordClick="eventSelected" allowTextWrap="true">
        <e-columns>
          <e-column field="FeatureImageUrl" width="165" :disableHtmlEncode="false" :valueAccessor="imageColumn"></e-column>
          <e-column field="Name" :disableHtmlEncode="false" :valueAccessor="titleColumn"></e-column>
        </e-columns>
    </ejs-grid>
  </div>
</template>

<script>

import Vue from 'vue';
import { GridPlugin } from '@syncfusion/ej2-vue-grids';
Vue.use(GridPlugin);

export default {
 name: "Dashboard",
 data() {
   return{
     events: [
        {
          Description: "<p>Sno*Drift</p>",
          EventId: 3224,
          FeatureImageUrl: "//static1.squarespace.com/static/5f90072f236ed961beea9ead/t/5f900b1b11b1b11dacf80c35/1613914930689/?format=1500w",
          Name: "Sno*Drift"
        },
        {
          Description: "<p>Founded in 1977, the Rally in the 100 Acre Wood has been a driver favourite since its inception. Sweeping turns and fast straights make this one of the fastest rallies on the calendar. Commitment and confidence are key. One of the most important places to commit? The Rally&#39;s famous cattle guard jump that sees cars fly over 100 feet.</p>,<p>2021 marks the 26th running of this historic event, and the events second as a part of the American Rally Association National Championship Series.</p>",
          EventId: 3225,
          FeatureImageUrl: "https://sas.blob.core.windows.net/cdn/EventFeatureImage/6508d6c4-b610-4c52-a77d-4e2853b06250.jpg",
          IsTest: false,
          Name: "100 Acre Wood Rally",
          PricingTier: 0,
          UniqueIdentifier: "100 Acre Wood Rally 2021"
          },
       ]
   }
 },
 computed: {
},
 methods: {
   eventSelected(evt) {
     var event = evt.rowData;
     if (event.EventId !== 3224)
     {
       alert("Not enabled yet");
       return;
     }
     this.$store.commit("selectedEvent", event);
     this.$router.push({name: "entries", params: {eventId: event.EventId}});
   },
   imageColumn(field, event) {
     return "<img class='eventImage' src='" + event[field] + "'/>";
   },
   titleColumn(field, event) {
     return "<h3>" + event.Name + "</h3>";// + event.Description;
   },
   getEvents() {
     this.$store.dispatch("getEvents");
   }
 },
 mounted() {
  // this.getEvents();
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* can't use scoped for syncfusion dynamic crap */
.eventsPage .eventImage {
  width: 100%;
  max-width:100px;
}
.eventsPage .e-columnheader {
  display:none;
}
</style>
