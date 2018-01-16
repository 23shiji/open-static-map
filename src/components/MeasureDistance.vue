<template lang="jade">
div#distance_measure
  button#measdist_btn.btn-floating.btn-large.waves-effect.waves-light(
    :class="{'red': adding_point, 'white': !adding_point}",
    @click="on_click"
  )
    i.material-icons(
      :class="{'white-text': adding_point, 'black-text': !adding_point}"
    ) {{adding_point ? 'close' : 'trending_flat'}}
  template(v-if="adding_point")
    svg#points_svg
      polyline(
        :points="polyline_points",
        fill="none",
        stroke="#2196f3",
        stroke-width="5px",
        stroke-opacity="0.5"
      )
    div#dist_label.blue-text.darken-3.white.z-depth-1 {{show_distance($store.state.ruler_distance)}}
    button#addmdpoint_btn.btn-floating.btn-small.waves-effect.waves-light.blue(
        @click="add_point"
    )
      i.material-icons.tiny add_location
</template>
<script>
import pos_patch from '../helpers/pos_patch'
export default {
  computed: {
    adding_point(){
      return !!this.$store.state.ruler_points
    },
    svg_style(){
      return `left: ${this.svg_x}px; top: ${this.svg_y}px; width: ${this.svg_w}px; height: ${this.svg_h}px`
    },
    ...pos_patch,
    polyline_points(){
      const ww = window.innerWidth
      const wh = window.innerHeight
      let s = ''
      for(let [x, y] of this.$store.state.ruler_points){
        let sx = ww/2 - (this.x - x) * this.zoom
        let sy = wh/2 - (this.y - y) * this.zoom
        s += ` ${sx},${sy}`
      }
      return s
    }
  },
  methods: {
    on_click(){
      if(this.adding_point){
        this.$store.commit('ruler_mode_stop')
      }else{
        this.$store.commit('ruler_mode_start')
      }
    },
    add_point(){
      this.$store.commit('ruler_add_point', [this.x, this.y])
    },
    show_distance(dist){
      if(dist > 1000){
        return `${(dist/1000).toFixed(2)} KM`
      }else{
        return `${dist.toFixed(2)} M`
      }
    }
  }
}
</script>
<style>
#measdist_btn{
  position: fixed;
  right: 1rem;
  top: 11rem;
}
#addmdpoint_btn{
  position: fixed;
  top: calc(50% - 1.5rem);
  left: calc(50% + 2.5rem);
}
#points_svg{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
#dist_label{
  position: fixed;
  right: 6rem;
  top: 11rem;
  font-size: 2rem;
  height: 4rem;
  padding: 1rem;
  text-align: center;
  line-height: 2rem;
}
</style>