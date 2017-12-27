import axios  from 'axios'
import marked from 'marked'
export function show_location({commit, state}, loc){
  commit('set_current_location', loc)
  axios
    .get(loc.desc)
    .then(res => marked(res.data))
    .then(desc_html => {
      commit('set_location_desc', desc_html)
    })
}