<template lang="jade">
#app
  #map-container
    template(v-show="$store.state.data_loaded")
      map-view
    template(v-if="!$store.state.data_loaded")
      h1 Loading
  nav.blue-grey.lighten-2
    .nav-wrapper
      span.brand-logo {{title}}
</template>

<script>
import axios from 'axios'
import MapView from './components/MapView'

export default {
  name: 'app',
  components: {
    MapView
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
  text-align: center;
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
