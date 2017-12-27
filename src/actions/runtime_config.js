import axios  from 'axios'
import YAML from 'js-yaml'
import runtime_config_path from '../runtime_config_path.yaml'

export function load_config_files({commit}){
  let map_prom = axios
  .get(runtime_config_path.layers_index)
  .then(res => YAML.safeLoad(res.data) )
  .then(({map, layers}) => {
    commit('set_map_info', map)
    commit('set_layers', layers)
  })
  let loc_prom = axios
    .get(runtime_config_path.locations_index)
    .then(res => YAML.safeLoad(res.data) )
    .then((locations) => {
      console.log(locations)
    })
  Promise.all([map_prom, loc_prom]).then(() => {
    commit('data_loaded')
  })
}