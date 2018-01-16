<template lang="jade">
div

  div#layer_panel.z-depth-3.white.collection(v-if="$store.state.display_layer_panel")
    .collection-item
      span.title Layers
      span#hide-btn(@click="$store.dispatch('hide_layer_panel')")
        i.material-icons.small call_made
    .collection-item(@click="$store.commit('set_display_pins', !$store.state.display_pins)")
        span.title
          input#displayPinCheckbox(type="checkbox", v-model="$store.state.display_pins")
          label(for="displayPinCheckbox`") Pins
    template(v-for="(group, index) in $store.state.groups")
      .collection-item(@click="$store.commit('set_group_display', {index, display: !group.display})")
        span.title
          input(type="checkbox", :id="`layer_item_${index}`", v-model="group.display",@click="$store.commit('set_group_display', {index, display: !group.display})")
          label(:for="`layer_item_${index}`") {{group.name}}
  a.btn-floating.btn-large.waves-effect.waves-light.white#layer-btn(v-else, @click="$store.dispatch('show_layer_panel')")
    i.material-icons.black-text layers
</template>
<script>
import {MapPos} from '../helpers/map_pos'
import {move_animation} from '../helpers/animation'
export default {
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