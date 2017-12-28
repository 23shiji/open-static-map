<template lang="jade">
div#locDesc.z-depth-4.white
  template(v-if="$store.state.location_desc")
    h1 {{$store.state.current_location.name}}
    div
      template(v-for="(t, index) in $store.state.current_location.tags")
        .chip(@click="view_tag(t)") {{t}}
      
    div(v-html="$store.state.location_desc")
  .preloader-wrapper.big.active(v-else)
    .spinner-layer.spinner-blue-only
      .circle-clipper.left
        .circle
      .gap-patch
        .circle
      .circle-clipper.right
        .circle
  div#desc_close_btn(@click="close")
    i.material-icons.medium close
</template>
<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    close(){
      this.$store.commit('reset_current_location')
    },
    view_tag(t){
      this.$store.dispatch('visiable_search', `tag:^${t}$`)
      this.close()
    }
  }
}
</script>
<style>
#locDesc{
  position: fixed;
  left: 1rem;
  top: 1rem;
  max-width: calc(100% - 2rem);
  max-height: calc(100% - 2rem);
  width: 40rem;
  height: 40rem;
  z-index: 105;
  padding: 2rem;
  overflow: auto;
}
#desc_close_btn{
  position: absolute;
  right: 0;
  top: 0;
}
</style>