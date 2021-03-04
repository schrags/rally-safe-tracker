<template>
  <div class="eventsPage">
    <ejs-grid :dataSource="events" :recordClick="eventSelected" allowTextWrap="true">
        <e-columns>
          <e-column field="FeatureImageUrl" width="200" :disableHtmlEncode="false" :valueAccessor="imageColumn"></e-column>
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
   }
 },
 computed: {
   events() {
     return this.$store.state.events;
  }
},
 methods: {
   eventSelected(evt) {
     var event = evt.rowData;
     this.$store.commit("selectedEvent", event);
     this.$router.push({name: "entries", params: {eventId: event.EventId}});
   },
   imageColumn(field, event) {
     return "<img class='eventImage' src='" + event[field] + "'/>";
   },
   titleColumn(field, event) {
     return "<h3>" + event.Name + "</h3>" + event.Description;
   },
   getEvents() {
     this.$store.dispatch("getEvents");
   }
 },
 mounted() {
   this.getEvents();
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
