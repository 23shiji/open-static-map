<template lang="jade">
div
  table.table
    tr(v-for="row in BUTTON_TABLE")
      template(v-for="col in row")
        td(v-if="col")
          button.btn(@click="press(col)") {{BUTTON_TEXT[col]}}
        td(v-else)
</template>
<script>
import bus from '../bus'
import {
  BUTTON_TEXT,
  BUTTON_TABLE
} from '../helpers/buttons'
export default {
  name: 'controller',
  data(){
    return {
      BUTTON_TEXT,
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

</style>