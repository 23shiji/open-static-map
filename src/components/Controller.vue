<template lang="jade">
div#controller
  table
    tr(v-for="row in BUTTON_TABLE")
      template(v-for="col in row")
        td(v-if="col")
          button.btn-floating.btn-large.red(@click="press(col)") 
            i.large.material-icons {{BUTTON_ICON[col]}}
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
#controller{
  position: fixed;
  left: 1rem;
  top: 1rem;
  width: 5rem;
}
.navi-btn{
  background-color: white;
}
</style>