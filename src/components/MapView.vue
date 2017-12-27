<template lang="jade">
div#map-view(
  ref="mapRoot",
  @dblclick="dblclick_aim($event)",
  @wheel="wheel_zoom($event)",
  @mousedown="on_mouse_down($event)",
  @mouseup="on_mouse_up($event)",
  @mousemove="on_mouse_move($event)",
  @touchstart.stop="on_touch_start",
  @touchmove.stop="on_touch_move",
  @touchend.stop="on_touch_end"
)
  #img-container
    template(v-for="layer in $store.state.layers")
      template(v-if="layer.zoom.gte <= $store.state.zoom && $store.state.zoom <= layer.zoom.lte")
        template(v-for="img_info in layer.images")
          map-image(
            :image_info  = "img_info"
          )
  controller
  img#cross(src="dist/cross.svg")
</template>
<script>
import bus    from '../bus'
import pos_patch from '../helpers/pos_patch'
import input_events from '../helpers/input_events'
import Controller from '../components/Controller'
import MapImage from './MapImage'
import '../assets/cross.svg'
export default {
  name: 'map-view',
  data () {
    return {
    }
  },
  components: {
    Controller,
    MapImage
  },
  computed: {
    ...pos_patch,
  },
  methods: {
    ...input_events,
    dmove([dx, dy]){
      let nx = this.x + dx
      let ny = this.y + dy
      this.$store.commit('move_to', [nx, ny])
    },
    dzoom(scale, center = null){
      this.$store.commit('zoom_to', {
        zoom: this.zoom * scale, 
        center
      })
    }
  },
  created(){
    this.init_key_events()
    this.$store.dispatch('load_config_files')
  }
}
</script>
<style>
#map-view, #img-container{
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  left: 0;
  overflow: hidden;
}
#map-view{
  position: fixed;
}
#img-container{
  position: absolute;
}
#cross{
  position: absolute;
  width:  2rem;
  height: 2rem;
  left: calc(50% - 1rem);
  top: calc(50% - 1rem);
  opacity: 0.5;
}
</style>