<template lang="jade">
#app
  #map-container
    template(v-show="$store.state.data_loaded")
      map-view
      status-panel
      search-panel
      controller
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
import StatusPanel from './components/StatusPanel'

export default {
  name: 'app',
  components: {
    MapView,
    Controller,
    LocDesc,
    SearchPanel,
    StatusPanel
  },
  computed: {
    title: {
      get(){
        return document.title
      },
      set(t){
        document.title = t
        this.map_name  = t
      }
    }
  },
  data(){
    return {
      data_loaded: false
    }
  },
  methods: {
  },
  created(){
    this.title = 'Yining'
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
