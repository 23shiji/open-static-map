<template lang="jade">
div.container#status-lanel
  div#status-view
    p {{position_text}}
    p {{$store.state.zoom.toFixed(5)}} X
</template>
<script>
import {MapPos} from '../helpers/map_pos'
export default {
  data(){
    return {
    }
  },
  computed: {
    position_text(){
      if(!this.$store.state.map_info) return '';
      let mp = new MapPos(this.$store.state.map_info)
      let {x, y} = this.$store.state
      let {lat, lng} = mp.rect2sphe([x, y])
      let nlng = Math.abs(lng).toFixed(3)
      let nlat = Math.abs(lat).toFixed(3)
      let lat_sn = this.lat_sphe_name(lat)
      let lng_sn = this.lng_sphe_name(lng)
      return `${nlat}°${lat_sn} ${nlng}°${lng_sn}`
    }
  },
  methods: {
    lat_sphe_name(lat){
      if(lat > 0) return 'S';
      else if(lat < 0) return 'N';
      else return '';
    },
    lng_sphe_name(lng){
      if(lng > 0) return 'E';
      else if(lng < 0) return 'W';
      else return '';
    }
  }
}
</script>
<style>
#status-lanel{
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  font-size: 1.5rem;
}
#setting-btn{
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}
#status-view{
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}
#status-view>p{
  margin: 0;
  padding: 0;
}
</style>