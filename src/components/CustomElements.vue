<template lang="jade">
div#custom_elements
  template(v-for="ce in $store.state.information.custom_elements")
    div(v-html="ce.html")
</template>
<script>
export default {
  data(){
    return {
      css_num: 0
    }
  },
  destoryed(){
    let {custom_elements} = this.$store.state.information
    if(!custom_elements) return;
    for(let i=0; i<this.css_num; i++){
      let ele = document.getElementById(`custom_ele_style_${i}`)
      ele.remove()
    }
  },
  created(){
    let {custom_elements} = this.$store.state.information
    if(!custom_elements) return;
    for(let ce of custom_elements){
      let c = document.createElement('style')
      c.textContent = ce.css
      c.id=`custom_ele_style_${this.css_num++}`
      document.head.appendChild(c)
    }
  }
} 
</script>
<style>
#custom_elements{
  width: 0;
  height: 0;
  position: fixed;
  top: 0;
  left: 0;
}
</style>