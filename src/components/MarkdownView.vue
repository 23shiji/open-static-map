<template lang="jade">
div.markdown-view
  template(v-if="markdown")
    div(v-html="html_content")
  .preloader-wrapper.big.active(v-else)
    .spinner-layer.spinner-blue-only
      .circle-clipper.left
        .circle
      .gap-patch
        .circle
      .circle-clipper.right
        .circle
</template>
<script>
import marked from 'marked'
export default {
  props: ['markdown'],
  computed: {
    html_content(){
      if(!this.markdown) return '';
      return marked(this.markdown)
    }
  }
}
</script>
<style>
.markdown-view{
  overflow-x: auto;
  overflow-y: scroll;
}
</style>