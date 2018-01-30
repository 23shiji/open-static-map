<template lang="jade">
div#custom_elements
  template(v-for="plg in $store.state.plugins")
    div(v-html="plg.html")
</template>
<script>
export default {
  data(){
    return {
      plg_ctr: 0,
      css: [],
      scripts: [],
      exit_callbacks: [],
    }
  },
  destoryed(){
    let {custom_elements} = this.$store.state.information
    if(!custom_elements) return;
    for(let f of this.exit_callbacks){
      f.call()
    }
    for(let c of this.css){
      c.remove()
    }
    for(let j of this.scripts){
      j.remove()
    }
    this.plg_ctr = 0
  },
  methods: {
    on_exit(func){
      this.exit_callbacks.push(func)
    }
  },
  created(){
    let plugins = this.$store.state.plugins
    if(!plugins) return;
    const init_callbacks = []
    window.plugin_on_exit = (func) => {
      this.on_exit(func)
    }
    window.plugin_on_event = (event, callback) => {
      this.$store.dispatch('on_event', {event, callback})
    }
    window.plugin_on_init = (callback) => {
      init_callbacks.push(callback)
    }
    for(let plg of plugins){
      if(plg.css){
        let c = document.createElement('link')
        c.setAttribute('rel', 'stylesheet')
        c.setAttribute('type', 'text/css')
        c.setAttribute('href', plg.css)
        c.id=`plg_style_${this.plg_ctr++}`
        document.head.appendChild(c)
        this.css.push(c)
      }
    }
    Promise.all(plugins.map(({javascript}) => {
      if (!javascript) return null;
      return new Promise((resolve, reject) => {
        let j = document.createElement('script')
        j.setAttribute('src', javascript)
        j.id=`plg_script_${this.plg_ctr++}`
        document.head.appendChild(j)
        this.scripts.push(j)
        j.onload = () => {
          resolve(j)
        }
      })
    })).then(() => {
      for(let f of init_callbacks){
        f({
          store: this.$store
        })
      }
      delete window.plugin_on_init
    })
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