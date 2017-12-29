export function data_loaded(state) {
  state.data_loaded = true
}

export function set_map_info(state, map){
  state.map_width = map.width
  state.map_height = map.height
  state.zoom = window.innerHeight / map.height * 1.1
  state.zoom_limit = state.zoom / 2
  state.x = map.center.x
  state.y = map.center.y
  state.map_info = map
}

export function set_layers(state, layers){
  state.layers = layers
}

export function set_locations(state, locations){
  state.locations = locations
}

export function set_icons(state, icons){
  state.icons = icons
}

export function set_current_location(state, loc){
  state.current_location = loc
}

export function set_location_desc(state, desc_html){
  state.location_desc = desc_html
}

export function reset_current_location(state){
  state.current_location = null
  state.location_desc = null
}

export function set_query_locations(state, ql){
  state.query_locations = ql
}

export function reset_query_locations(state){
  state.query_locations = null
}