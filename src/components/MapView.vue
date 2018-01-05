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
    template(v-for="group in $store.state.groups")
      template(v-if="group.display")
        template(v-for="layer in group.layers")
          template(v-if="display_layer(layer)")
            template(v-for="img_info in layer.images")
              map-image(
                v-if="image_visiable(img_info)",
                :image_info  = "img_info"
              )
    template(v-if="$store.state.display_pins")
      template(v-if="$store.state.query_locations && $store.state.query_locations.length")
        template(v-for="loc in $store.state.query_locations")
          template(v-if="display_loc(loc, true)")
            loc-pin(
              :loc  = "loc"
            )
      template(v-else)
        template(v-for="loc in $store.state.locations")
          template(v-if="display_loc(loc, false)")
            loc-pin(
              :loc  = "loc"
            )
  img#cross(src="dist/cross.svg")
</template>
<script>
import bus    from '../bus'
import pos_patch from '../helpers/pos_patch'
import * as input_events from '../helpers/input_events'
import * as displayed_range from '../helpers/displayed_range'
import MapImage from './MapImage'
import LocPin from './LocPin'
import '../assets/cross.svg'
export default {
  name: 'map-view',
  data () {
    return {
    }
  },
  components: {
    MapImage,
    LocPin
  },
  computed: {
    ...pos_patch,
  },
  methods: {
    ...input_events,
    ...displayed_range,
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
    },
    display_loc(loc, qloc){
      let {zoom} = this.$store.state
      return ((!loc.zoom || qloc ||
        ( (!loc.zoom.gte || loc.zoom.gte <= zoom) && (!loc.zoom.lte || zoom <= loc.zoom.lte))) &&
        this.location_visiable(loc))
    },
    display_layer(layer){
      let {zoom} = this.$store.state
      return (!layer.zoom || ((!layer.zoom.gte || layer.zoom.gte <= zoom) && (!layer.zoom.lte || zoom <= layer.zoom.lte)))
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
  width:  1rem;
  height: 1rem;
  left: calc(50% - 0.5rem);
  top: calc(50% - 0.5rem);
  opacity: 0.3;
}
</style>