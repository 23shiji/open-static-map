import axios  from 'axios'
import YAML from 'js-yaml'
import runtime_config_path from '../../runtime_config_path.yaml'
import {MapPos} from '../../helpers/map_pos'


export function load_config_files({commit, state}){

  let map_prom = new Promise((resolve, reject) => {
    axios
    .get(runtime_config_path.layers_index)
    .then(res => YAML.safeLoad(res.data))
    .then(res => {
      let async_groups = res.groups.filter(obj => obj.async)
      if(async_groups.length == 0){
        resolve(res)
      }else{
        Promise.all(
          async_groups.map(dst => {
            return new Promise((resolve, reject) => {
              axios
                .get(dst.async)
                .then(r => YAML.safeLoad(r.data))
                .then(src => resolve({src, dst}))
                .catch(err => reject(err))
            })
          })
        ).then(async_objs => {
          for(let {dst, src} of async_objs){
            Object.assign(dst, src)
          }
          resolve(res)
        })
      }
    }).catch(err => {
      reject(err)
    })
  })

  let loc_index = axios
    .get(runtime_config_path.locations.index)
    .then(res => YAML.safeLoad(res.data) )

  let loc_template = axios
    .get(runtime_config_path.locations.templates)
    .then(res => YAML.safeLoad(res.data) )

  let loc_pin = axios
    .get(runtime_config_path.locations.pins)
    .then(res => YAML.safeLoad(res.data) )
  
  let info = axios
    .get(runtime_config_path.information)
    .then(res => YAML.safeLoad(res.data) )
    
  Promise.all([
    map_prom, 
    loc_index, 
    loc_template, 
    loc_pin,
    info]).then(([
      {map, groups}, 
      locations, 
      templates, 
      pins,
      information]) => {
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
        if(!temp){
          throw new TypeError(`Unknown template: ${template} (loc: ${loc.name})`)
        }
        Object.assign(update, loc)
        Object.assign(update, temp)
        update.tags = temp.tags ? tags.concat(temp.tags) : tags
        Object.assign(loc, update)
      }
      let pin_name = loc.pin
      loc.pin = pins[pin_name]
      if(!loc.pin){
        throw new TypeError(`Unknown pin: ${pin_name} (loc: ${loc.name})`)
      }
    }
    commit('set_map_info', map)
    commit('set_groups', groups)
    commit('set_locations', locations)
    commit('set_information', information)
    commit('data_loaded')

    if(window.location.hash[0] != '#') return;
    let [lat, lng, zoom = 1] = window.location.hash.slice(1).split(",").map(x => parseInt(x))
    if(isNaN(lat) || isNaN(lng)) return;
    let mp = new MapPos(map)
    lat = -lat // 历史遗留问题
    let [x, y] = mp.sphe2rect({lng, lat})
    commit('zoom_to', {zoom, center: [x, y]})
    commit('move_to', [x, y])
  })
}