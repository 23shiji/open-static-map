import axios  from 'axios'
export function show_location({commit, state}, loc){
  commit('set_current_location', loc)
  axios
    .get(loc.desc)
    .then(res => res.data)
    .then(desc => {
      commit('set_location_desc', desc)
    })
}