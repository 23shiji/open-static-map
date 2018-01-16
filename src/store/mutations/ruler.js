import {MapPos} from '../../helpers/map_pos'

export function ruler_mode_start(state){
  state.ruler_points = []
  state.ruler_distance = 0
}

export function ruler_add_point(state, [x, y]){
  if(state.ruler_points.length > 0){
    let mp = new MapPos(state.map_info)
    let {radius} = state.map_info
    let [lx, ly] = state.ruler_points[state.ruler_points.length-1]
    let {lat: flat, lng: flng} = mp.rect2sphe([lx, ly])
    let {lat: tlat, lng: tlng} = mp.rect2sphe([x, y])
    flat = flat / 180 * Math.PI
    flng = flng / 180 * Math.PI
    tlat = tlat / 180 * Math.PI
    tlng = tlng / 180 * Math.PI
    let angD = Math.acos(
      Math.sin(flng) * Math.sin(tlng)
      + Math.cos(flng) * Math.cos(tlng) * 
        Math.cos(Math.abs(flat - tlat))
    )
    state.ruler_distance += radius * angD
  }
  state.ruler_points.push([x, y])
}

export function ruler_mode_stop(state){
  state.ruler_points = null
}