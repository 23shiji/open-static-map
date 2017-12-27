<template lang="jade">
div#navi-bar
  table
    tr(v-for="row in BUTTON_TABLE")
      template(v-for="col in row")
        td.navi-btn-container(v-if="col")
          button.btn-floating.white.text-black.btn-medium(@click="press(col)") 
            i.material-icons.black-text.medium {{BUTTON_ICON[col]}}
        td(v-else)
</template>
<script>
import bus from '../bus'
import {
  BUTTON_ICON,
  BUTTON_TABLE
} from '../helpers/buttons'
export default {
  name: 'controller',
  data(){
    return {
      BUTTON_ICON,
      BUTTON_TABLE
    }
  },
  methods: {
    press(evt){
      bus.$emit('navi_key', evt)
    }
  }
}
</script>
<style>
#navi-bar{
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.navi-btn{
  background-color: white;
}
.navi-btn-container{
  padding: 0;
}
</style>