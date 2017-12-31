<template lang="jade">
div
  div#search_panel.z-depth-3.white(v-if="$store.state.display_search_panel")
    .container
      .row
        .input-field.col.s12.m12.l12
          input.validate#searchQuery(
            v-model="$store.state.search_text",
            @input="search($store.state.search_text)", 
            type="text"
          )
          label(for="searchQuery") Search
      template(v-if="$store.state.query_locations")
        .row
          #results-list.collection.col.s12.m12.l12
            template(v-if="$store.state.query_locations.length")
              template(v-for="loc in $store.state.query_locations")
                .collection-item.avatar(@click="view(loc)")
                  template(v-if="loc.pin.icon")
                    img.circle.loc-icon-collection(:src="loc.pin.icon.path")
                  i.material-icons.circle(v-else) location_off
                  span.title {{loc.name}}
                  p {{loc.tags.join(", ")}}
            .collection-item(v-else)
              span.title 没有相符的结果
        .row
          button.btn.col.s3.m3.l3(@click="$store.dispatch('visiable_search_reset')")
            | CLEAR
    span#hide-btn(@click="$store.dispatch('hide_search_panel')")
      i.material-icons.small call_made
  a.btn-floating.btn-large.waves-effect.waves-light#search-btn(v-else, @click="$store.dispatch('show_search_panel')", :class="{'red': $store.state.search_text, 'white': !$store.state.search_text}")
    i.material-icons(:class="{'white-text': $store.state.search_text, 'black-text': !$store.state.search_text}") search
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
#search-btn, #search_panel{
  position: fixed;
  right:  1rem;
  top:    1rem;
}
#search-btn {
  z-index: 105;
}
#search_panel{
  padding-top: 1rem;
  width: 24rem;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  z-index: 106;
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