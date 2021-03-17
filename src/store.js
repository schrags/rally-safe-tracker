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
    axios.get("http://spatialinnovations.art/rs/rsapi.php?csurl=http://api.rallysafe.com.au/api/v2/Events/GetEventsForApp").then((response) => {
        response.data.unshift({
            Description: "<p>Sno*Drift</p>",
            EventId: 3224,
            FeatureImageUrl: "//static1.squarespace.com/static/5f90072f236ed961beea9ead/t/5f900b1b11b1b11dacf80c35/1613914930689/?format=1500w",
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