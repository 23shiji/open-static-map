<template lang="jade">
div
  template(v-for="dx in [-1, 0, 1]")
      template(v-for="dy in [-1, 0, 1]")
        img#map_img(
          v-show= "image_loaded",
          :src=   "image_info.path",
          :style= "image_style(dx, dy)",
          :width= "img_w",
          :height="img_h",
          @load=  "image_loaded = true",
          ondragstart="return false;"
        )
  div(v-if="!image_loaded", :style="image_style(0, 0)") Loading Image
</template>
<script>
import pos_patch from '../helpers/pos_patch'
export default {
  data(){
    return {
      image_loaded: false
    }
  },
  props: {
    image_info: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...pos_patch,
    map_info(){
      return this.$store.state.map_info
    },
    img_x(){
      let ww = window.innerWidth
      return Math.floor(ww/2 - (this.x + this.offset_x) * this.zoom)
    },
    img_y(){
      let wh = window.innerHeight
      return Math.floor(wh/2 - (this.y + this.offset_y) * this.zoom)
    },
    img_w(){
      return Math.floor(this.image_info.width * this.zoom)
    },
    img_h(){
      return Math.floor(this.image_info.height * this.zoom)
    },
    width(){
      return this.image_info.width
    },
    height(){
      return this.image_info.height
    },
    offset_x(){
      return this.image_info.offset.x
    },
    offset_y(){
      return this.image_info.offset.y
    }
  },
  methods: {
    image_style(dx, dy){
      return `
        left: ${this.img_x + this.map_info.width *  this.zoom  * dx}px;
        top:  ${this.img_y + this.map_info.height * this.zoom * dy}px;
      `;
    }
  }
}
</script>
<style>

#map_img{
  position: absolute;
  touch-action: manipulation;
}

</style>