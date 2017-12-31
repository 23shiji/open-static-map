export function search({commit, state}, s){
  if(s == ''){
    commit('reset_query_locations')
    return
  }
  let query = {
    keywords: [],
    tags: []
  }
  for(let t of s.split(' ')){
    let tag_re = t.match(/^tag:(.+)$/)
    if(tag_re){
      query.tags.push(new RegExp(tag_re[1], "i"))
    }else{
      query.keywords.push(new RegExp(t, "i"))
    }
  }
  let locs = state.locations.filter(loc => {
    let tags_c = false, kws_c = false
    for(let r of query.tags){
      if(loc.tags.some(t => t.match(r))){
        tags_c = true
      }else{
        return false
      }
    }
    for(let r of query.keywords){
      if(loc.name.match(r)){
        kws_c = true
        break
      }
      for(let t of loc.tags){
        if(t.match(r)){
          kws_c = true
          break
        }
      }
    }
    return (query.tags == 0 || tags_c) && (query.keywords == 0 || kws_c);
  })
  commit('set_query_locations', locs)
}

export function visiable_search({commit, dispatch}, s = null){
  if(s){
    commit('set_search_text', s)
    dispatch('search', s)
  }else{
    commit('set_search_text', '')
  }
}

export function visiable_search_reset({commit, dispatch}){
  commit('set_search_text', '')
  dispatch('search', '')
}

export function show_search_panel({commit}){
  commit('set_display_search_panel', true)
}

export function hide_search_panel({commit}){
  commit('set_display_search_panel', false)
}

export function show_layer_panel({commit}){
  commit('set_display_layer_panel', true)
}

export function hide_layer_panel({commit}){
  commit('set_display_layer_panel', false)
}

export function default_view_point({commit, state}){
  let {x, y} = state.map_info.center
  commit('move_to', [x, y])
  commit('zoom_to', {
    zoom: state.init_zoom,
    center: [x, y]
  })
}