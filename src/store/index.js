import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations/index'
import actions from './actions/index'
import {MapPos} from '../helpers/map_pos'

export default new Vuex.Store({
  state: {
    data_loaded: false,
    locations: [],
    current_location: null,
    location_desc: '',
    search_text: '',
    query_locations: null,
    groups: [],
    map_width: 0,
    map_height: 0,
    init_zoom: 0,
    x: 0,
    y: 0,
    zoom: 1,
    zoom_limit: 0,
    map_info: null,
    search_query: null,
    information: null,
    display_search_panel: false,
    display_layer_panel: false,
    display_pins: true,
    ruler_points: null,
    ruler_distance: 0,
    plugins: [],
    event_callbacks: {},
    display_location_labels: true,
  },
  getters: {
    displayed_map_width(state){
      let vw = window.innerWidth
      return vw / state.zoom
    },
    displayed_map_height(state){
      let vh = window.innerHeight
      return vh / state.zoom
    },
    map_pos(state){
      return new MapPos(state.map_info)
    }
  },
  mutations,
  actions
})