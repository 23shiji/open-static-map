import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as runtime_config from './actions/runtime_config'

export default new Vuex.Store({
  state: {
    data_loaded: false,
    locations: [],
    layers: [],
    map_width: 0,
    map_height: 0,
    x: 0,
    y: 0,
    zoom: 1,
    zoom_limit: 0,
    map_info: null
  },
  mutations: {
    data_loaded(state) {
      state.data_loaded = true
    },
    move_to(state, [nx, ny]){
      state.x = (nx + state.map_width) %  state.map_width
      state.y = (ny + state.map_height) % state.map_height
    },
    zoom_to(state, {zoom: tz, center = null}){
      let z1 = state.zoom
      let z2 = tz
      if(z2 < state.zoom_limit) return;
      let x = state.x
      let y = state.y
      if(center){
        let [cx, cy] = center
        let nx = ( (z2-z1) * cx + z1 * x ) / z2
        let ny = ( (z2-z1) * cy + z1 * y ) / z2
        state.x = nx
        state.y = ny
      }
      state.zoom = z2
    },
    set_map_info(state, map){
      state.map_width = map.width
      state.map_height = map.height
      state.zoom = Math.max(
        window.innerWidth / map.width,
        window.innerHeight / map.height
      )
      state.zoom_limit = state.zoom / 2
      state.x = map.center.x
      state.y = map.center.y
      state.map_info = map
    },
    set_layers(state, layers){
      state.layers = layers
    }
  },
  actions: {
    ...runtime_config
  }
})