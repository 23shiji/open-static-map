<template lang="jade">
div.loc_pin(ref="pinDom", :style="pin_style")
  img.loc_icon(
    v-if="loc.pin.icon",
    :width="loc.pin.icon.width", 
    :height="loc.pin.icon.height", 
    :style="icon_style", 
    :src="img_path",
    @click="show",
    @touchend="show"
    )
  div.loc_name(
    v-if="loc.pin.label && display_label",
    :style="name_style", 
    @click="show",
    @touchend="show",
    v-html="loc.name"
    )
</template>
<script>
import {MapPos} from '../helpers/map_pos'
import pos_patch from '../helpers/pos_patch'
export default {
  props: {
    loc: {
      type: Object,
      required: true,
      map_pos: null,
    }
  },
  computed: {
    ...pos_patch,
    pin_pos(){
      return this.map_pos.sphe2rect(this.loc.pos)
    },
    pin_screen_pos(){
      let ww = window.innerWidth
      let wh = window.innerHeight
      let [px, py] = this.pin_pos
      let psx = Math.floor(ww/2 - (this.x - px) * this.zoom)
      let psy = Math.floor(wh/2 - (this.y - py) * this.zoom)
      return [psx, psy]
      // return [500, 500]
    },
    img_path(){
      return this.loc.pin.icon.path
    },
    icon_style(){
      let [px, py] = this.pin_screen_pos
      let {icon} = this.loc.pin
      let x = px + icon.offset.x
      let y = py + icon.offset.y
      return `left: ${x}px; top: ${y}px; ${icon.style ? icon.style : ''};`
    },
    name_style(){
      let [px, py] = this.pin_screen_pos
      let {label} = this.loc.pin
      let cw = label.width
      let x, y
      if(label.offset){
        x = px + label.offset.x
        y = py + label.offset.y
      }else{
        x = px - cw / 2
        y = py
      }
      return `left: ${x}px; top: ${y}px; width: ${cw}px; ${label.style ? label.style : ''};`
    },
    pin_style(){
      let [px, py] = this.pin_screen_pos
      let x = Math.floor(px)
      let y = Math.floor(py)
      let w = Math.floor(this.loc.pin.label.width)
      return `left: ${x}px; top: ${y}px; width: ${w}px;`
    },
    display_label(){
      let loc = this.loc
      let zoom = this.zoom
      return ((!loc.zoom || 
        ( (!loc.zoom.gte || loc.zoom.gte <= zoom) && (!loc.zoom.lte || zoom <= loc.zoom.lte))))
    }
  },
  methods: {
    show(){
      this.$store.dispatch('show_location', this.loc)
    }
  },
  created(){
    this.map_pos = new MapPos(this.$store.state.map_info)
  }
}
</script>
<style>
.loc_pin{
  position: fixed;
  width: 60px;
}
.loc_name, .loc_icon{
  position: fixed;
  overflow: hidden;
  text-align: center;
}
</style>