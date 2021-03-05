import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  events: [],
  stages: [],
  selectedEvent: {
      EventId: -1
  }
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  updateEvents(state, events) {
    state.events = events;
  },
  selectedEvent(state, event) {
      state.selectedEvent = event;
  }
}

const actions = {
  getEvents({commit}) {
    axios.get("http://localhost:8082/api/v2/Events/GetEventsForApp").then((response) => {
        response.data.unshift({
            Description: "<p>Sno*Drift</p>",
            EventId: 3224,
            FeatureImageUrl: "https://sas.blob.core.windows.net/cdn/EventFeatureImage/6508d6c4-b610-4c52-a77d-4e2853b06250.jpg",
            Name: "Sno*Drift"
        });
        commit('updateEvents', response.data);
    });
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})