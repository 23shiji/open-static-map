<template lang="jade">
#app
  template(v-if="meta_loaded")
    template(v-for="dx in [-1, 0, 1]")
      template(v-for="dy in [-1, 0, 1]")
        img#map_img(
          @dblclick="dblclick_aim($event)",
          @wheel="wheel_zoom($event)",
          @mousedown="on_mouse_down($event)",
          @mouseup="on_mouse_up($event)",
          @mousemove="on_mouse_move($event)",
          @touchstart.stop="on_touch_start",
          @touchmove.stop="on_touch_move",
          @touchend.stop="on_touch_end",
          v-show="image_loaded",
          src="map/0/0.svg",
          :style="image_style(dx, dy)",
          :width="img_w",
          :height="img_h",
          @load="image_loaded = true",
          ondragstart="return false;"
          )
        h1(v-if="!image_loaded") Loading
    controller
    img#cross(src="dist/cross.svg")

  template(v-else)
    h1 Loading
</template>

<script>
import axios from 'axios'
import bus from './bus'
import input_events from './helpers/input_events'
import Controller from './components/Controller'
import './assets/cross.svg'
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
      meta_loaded: false,
      image_loaded: false,
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
    ...input_events,
    dmove([dx, dy]){
      let nx = this.x + dx
      let ny = this.y + dy
      this.x = (nx + this.origin_width) % this.origin_width
      this.y = (ny + this.origin_height) % this.origin_height
    },
    dzoom(scale, center = null){
      let z1 = this.zoom
      let z2 = this.zoom * scale
      if(z2 < this.zoom_limit) return;
      let x = this.x
      let y = this.y
      if(center){
        let [cx, cy] = center
        let nx = ( (z2-z1) * cx + z1 * x ) / z2
        let ny = ( (z2-z1) * cy + z1 * y ) / z2
        this.x = nx
        this.y = ny
      }
      this.zoom = z2
    },
    load_meta(){
      this.meta_loaded = false
      axios
        .get('map/0/meta.json')
        .then(res => res.data)
        .then(data => {
          let meta = data[0]
          this.img_meta = meta
          let width = meta.x.to - meta.x.from
          let height = meta.y.to - meta.y.from
          this.zoom_limit = Math.max(
            window.innerWidth / width,
            window.innerHeight / height
          )
          this.zoom = this.zoom_limit
          this.origin_width   = width
          this.origin_height  = height
          this.x = width / 2
          this.y = height / 2
          this.meta_loaded = true
        })
    }
  },
  created(){
    this.init_key_events()
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
  touch-action: none;
}

#map_img{
  position: fixed;
  touch-action: manipulation;
}

#cross{
  position: fixed;
  width:  2rem;
  height: 2rem;
  left: calc(50vw - 1rem);
  top: calc(50vh - 1rem);
  opacity: 0.5;
}

</style>
