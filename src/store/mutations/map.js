export function set_query_locations(state, ql){
  state.query_locations = ql
}

export function zoom_to(state, {zoom: tz, center = null}){
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