<template lang="jade">
div#locDesc.z-depth-4.white
  h4(v-html="$store.state.current_location.name")
  div
    template(v-for="(t, index) in $store.state.current_location.tags")
      .chip(@click="view_tag(t)") {{t}}
    markdown-view#mdv(:markdown="$store.state.location_desc")
  div#desc_close_btn(@click="close")
    i.material-icons.medium close
</template>
<script>
import MarkdownView from './MarkdownView'
export default {
  data(){
    return {
    }
  },
  components: {
    MarkdownView
  },
  methods: {
    close(){
      this.$store.commit('reset_current_location')
    },
    view_tag(t){
      this.$store.dispatch('show_search_panel')
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
  z-index: 105;
  padding: 2rem;
}
#desc_close_btn{
  position: absolute;
  right: 0;
  top: 0;
}
#mdv{
  max-height:   60vh;
  overflow-x:   auto;
  overflow-y:   auto;
}
</style>