<template lang="jade">
#app
  #map-container
    template(v-show="$store.state.data_loaded")
      map-view
      custom-elements(v-if="$store.state.information")
      status-panel
      search-panel
      measure-distance
      layer-panel(v-if="$store.state.groups")
      controller
      drawer(v-if="$store.state.information && $store.state.information.menu")
      loc-desc(v-if="$store.state.current_location")
    template(v-if="!$store.state.data_loaded")
      h1 Loading
</template>

<script>
import axios from 'axios'
import MapView from './components/MapView'
import Controller from './components/Controller'
import LocDesc from './components/LocDesc'
import SearchPanel from './components/SearchPanel'
import LayerPanel from './components/LayerPanel'
import StatusPanel from './components/StatusPanel'
import Drawer from './components/Drawer'
import CustomElements from './components/CustomElements'
import MeasureDistance from './components/MeasureDistance'

export default {
  name: 'app',
  data(){
    return {
      logo_focused: false
    }
  },
  components: {
    MapView,
    Controller,
    LocDesc,
    SearchPanel,
    StatusPanel,
    Drawer,
    CustomElements,
    LayerPanel,
    MeasureDistance
  },
  computed: {
    logo_style(){
      let {out, focused} = this.$store.state.information.logo.opacity
      let {width, height} = this.$store.state.information.logo.size
      let opacity = this.logo_focused ? focused : out
      return `opacity: ${opacity}; width: ${width}; height: ${height}`
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  touch-action: none;
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
nav{
  z-index: 1000;
  position: fixed;
}
</style>
