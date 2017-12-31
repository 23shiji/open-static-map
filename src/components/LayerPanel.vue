<template lang="jade">
div
  div#layer_panel.z-depth-3.white.collection(v-if="$store.state.display_layer_panel")
    .collection-item
      span.title Layers
      span#hide-btn(@click="$store.dispatch('hide_layer_panel')")
        i.material-icons.small call_made
    template(v-for="(layer, index) in $store.state.layers")
      .collection-item(@click="layer.display = !layer.display")
        span.title
          input(type="checkbox", :id="`layer_item_${index}`", v-model="layer.display")
          label(for="`layer_item_${index}`") {{layer.name}}
  a.btn-floating.btn-large.waves-effect.waves-light.white#layer-btn(v-else, @click="$store.dispatch('show_layer_panel')")
    i.material-icons.black-text layers
</template>
<script>
import {MapPos} from '../helpers/map_pos'
import {move_animation} from '../helpers/animation'
export default {
  methods: {
    search(s){
      this.$store.dispatch('search', s)
    },
    view(loc){
      let mp = new MapPos(this.$store.state.map_info)
      let center = mp.sphe2rect(loc.pos)
      let zoom = loc.zoom ? 
        Math.max(this.$store.state.map_info.view_zoom, loc.zoom.gte) : 
        this.$store.state.map_info.view_zoom
      zoom = Math.max(zoom, this.$store.state.zoom)
      let dz = zoom / this.$store.state.zoom
      move_animation(center, dz, 25, 50)
      // this.$store.commit('move_to', center)
      // this.$store.commit('zoom_to', {zoom: , center})
      this.$store.dispatch('show_location', loc)
    }
  }
}
</script>
<style>
#layer-btn, #layer_panel{
  position: fixed;
  right:  1rem;
}
#layer-btn{
  top:    6rem;
  z-index: 105;
}
#layer_panel{
  top:    1rem;
  width: 24rem;
  z-index: 106;
  max-width:  calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
}

/*
@media (max-width: 500px) {
  #results-list{
    max-height: calc(25vh);
  }
}

@media (min-width: 500px) {
  #results-list{
    max-height: calc(50vh);
  }
}
*/
#hide-btn{
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.5rem;
}

#searchQuery{
  position: inline;
}
</style>