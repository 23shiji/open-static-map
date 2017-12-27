import axios  from 'axios'
import YAML from 'js-yaml'
import runtime_config_path from '../../runtime_config_path.yaml'

export function load_config_files({commit, state}){
  console.log(state)
  let map_prom = axios
  .get(runtime_config_path.layers_index)
  .then(res => YAML.safeLoad(res.data) )
  
  let loc_prom = axios
    .get(runtime_config_path.locations_index)
    .then(res => YAML.safeLoad(res.data) )
    .then(({locations, templates}) => {
      for(let loc of locations){
        let temps = []
        if(!loc.template){
          continue
        }else if(typeof loc.template === "string"){
          temps.push(loc.template)
        }else{
          temps = temps.concat(loc.template)
        }
        for(let template of temps){
          let tags = loc.tags || []
          let temp = templates[template]
          let update = {}
          Object.assign(update, loc)
          Object.assign(update, temp)
          update.tags = temp.tags ? tags.concat(temp.tags) : tags
          Object.assign(loc, update)
        }
      }
      return locations
    })
  let ico_prom = axios
    .get(runtime_config_path.icons_index)
    .then(res => YAML.safeLoad(res.data) )
    
  Promise.all([map_prom, loc_prom, ico_prom]).then(([{map, layers}, locations, icons]) => {
    for(let loc of locations){
      loc.icon = icons[loc.icon]
    }
    commit('set_map_info', map)
    commit('set_layers', layers)
    commit('set_locations', locations)
    commit('set_icons', icons)
    commit('data_loaded')
  })
}