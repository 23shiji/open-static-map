export function set_query_locations(state, ql){
  state.query_locations = ql
}

export function move_to(state, [nx, ny]){
  let mh = window.innerHeight/state.zoom / 2
  if(ny - mh < 0 || ny + mh > state.map_height)
    return;
  state.x = (nx + state.map_width) %  state.map_width
  state.y = (ny + state.map_height) % state.map_height
}

export function zoom_to(state, {zoom: tz, center = null}){
  let vw = window.innerWidth
  let vh = window.innerHeight
  let mw = vw / tz
  let mh = vh / tz
  if(mh > state.map_height){
    return;
  }else if(state.y - mh / 2 < 0){
    center = [state.x, 0]
  }else if(state.y + mh / 2 > state.map_height){
    center = [state.x, state.map_height]
  }
  let z1 = state.zoom
  let z2 = tz
  if(z2 < state.zoom_limit) return;
  let x = state.x
  let y = state.y
  if(center){
    let [cx, cy] = center
    let nx = ( (z2-z1) * cx + z1 * x ) / z2
    let ny = ( (z2-z1) * cy + z1 * y ) / z2
    state.x = nx
    state.y = ny
  }
  state.zoom = z2
}

export function set_search_text(state, t){
  state.search_text=t
}

export function set_display_search_panel(state, b){
  state.display_search_panel=b
}