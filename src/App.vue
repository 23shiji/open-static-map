<template lang="jade">
#app
  template(v-if="loading")
    h1 Loading
  template(v-else)
    template(v-for="dx in [-1, 0, 1]")
      template(v-for="dy in [-1, 0, 1]")
        img#map_img(
          src="map/0/0.svg",
          :style="image_style(dx, dy)",
          :width="img_w",
          :height="img_h"
          )
    controller#controller
</template>

<script>
import axios from 'axios'
import bus from './bus'
import Controller from './components/Controller.vue'
import {
  lng2x,
  lat2y,
  spher2rect,
  rect2spher
} from './helpers/position'
export default {
  name: 'app',
  data () {
    return {
      loading: true,
      x: 0,
      y: 0,
      z: 100,
      zoom: 0,
      zoom_limit: 0,
      img_meta: null,
      origin_width: 0,
      origin_height: 0 
    }
  },
  components: {
    Controller
  },
  computed: {
    img_x(){
      let ww = window.innerWidth
      return Math.floor(ww/2 - this.x * this.zoom)
    },
    img_y(){
      let wh = window.innerHeight
      return Math.floor(wh/2 - this.y * this.zoom)
    },
    img_w(){
      return Math.floor(this.origin_width * this.zoom)
    },
    img_h(){
      return Math.floor(this.origin_height * this.zoom)
    },
  },
  methods: {
    image_style(dx, dy){
      return `top: ${this.img_y - this.img_h * dy}px; left: ${this.img_x - this.img_w * dx}px;`;
    },
    load_meta(){
      axios
        .get('map/0/meta.json')
        .then(res => res.data)
        .then(data => {
          let meta = data[0]
          this.img_meta = meta
          let width = meta.x.to - meta.x.from
          let height = meta.y.to - meta.y.from
          this.zoom_limit = Math.min(
            window.innerWidth / width,
            window.innerHeight / height
          )
          this.zoom = this.zoom_limit
          this.origin_width   = width
          this.origin_height  = height
          this.loading = false
          this.x = width / 2
          this.y = height / 2
        })
    },
    init_events(){
      const MOVE_DIST = 100
      bus.$on('navi_key', evt => {
        switch(evt){
        case 'ZOOM_IN':
          this.zoom *= 2
        break
        case 'ZOOM_OUT':
          if(this.zoom > this.zoom_limit)
            this.zoom /= 2
        break
        case 'LEFT':
          this.x -= MOVE_DIST / this.zoom
        break
        case 'RIGHT':
          this.x += MOVE_DIST / this.zoom
        break
        case 'UP':
          this.y -= MOVE_DIST / this.zoom
        break
        case 'DOWN':
          this.y += MOVE_DIST / this.zoom
        break
        }
      })
    }
  },
  created(){
    this.init_events()
    this.load_meta()
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
  margin-top: 60px;
}

#map_img{
  position: fixed;
}

#controller{
  position: fixed;
  left: 0;
  top: 0;
  width: 5rem;
}
</style>
