import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations/index'
import actions from './actions/index'

export default new Vuex.Store({
  state: {
    data_loaded: false,
    locations: [],
    current_location: null,
    location_desc: '',
    search_text: '',
    query_locations: null,
    layers: [],
    map_width: 0,
    map_height: 0,
    x: 0,
    y: 0,
    zoom: 1,
    zoom_limit: 0,
    map_info: null,
    icons: null,
    search_query: null
  },
  mutations,
  actions
})