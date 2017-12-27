<template lang="jade">
div#search_panel.z-depth-3.white
  .container
    .row
      .input-field.col.s12.m12.l12
        input.validate#searchQuery(
          v-model="$store.state.search_text",
          @input="search($store.state.search_text)",
          placeholder="keywords, tag:default, ...", 
          type="text"
        )
        label(for="searchQuery") Search
    .row(v-if="$store.state.query_locations")
      #results-list.collection.col.s12.m12.l12
        template(v-if="$store.state.query_locations.length")
          template(v-for="loc in $store.state.query_locations")
            .collection-item.avatar(@click="view(loc)")
              img.circle.loc-icon-collection(:src="loc.icon.path")
              span.title {{loc.name}}
              p {{loc.tags.join(", ")}}
        .collection-item(v-else)
          span.title 没有相符的结果
</template>
<script>
import {MapPos} from '../helpers/map_pos'
import {move_animation} from '../helpers/animation'
export default {
  data(){
    return {
    }
  },
  methods: {
    search(s){
      this.$store.dispatch('search', s)
    },
    view(loc){
      let mp = new MapPos(this.$store.state.map_info)
      let center = mp.sphe2rect(loc.pos)
      let dz = this.$store.state.map_info.view_zoom / this.$store.state.zoom
      move_animation(center, dz, 25, 50)
      // this.$store.commit('move_to', center)
      // this.$store.commit('zoom_to', {zoom: , center})
      this.$store.dispatch('show_location', loc)
    }
  }
}
</script>
<style>
#search_panel{
  padding-top: 1rem;
  position: fixed;
  right:  1rem;
  top:    1rem;
  width: 24rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  z-index: 100;
}
.loc-icon-collection{
  width: 2rem;
  height: 2rem;
}
#results-list{
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: calc(50vh);
}
</style>