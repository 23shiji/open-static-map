import {MapPos} from '../../helpers/map_pos'

export function on_event({commit}, {event, callback}){
  commit('on_event', {event, callback})
}
export function emit_event({state}, {event, payload}){
  if(state.event_callbacks[event]){
    for(let f of state.event_callbacks[event]){
      f(payload)
    }
  }
}
export function move_to({commit, dispatch}, payload){
  commit('move_to', payload)
  dispatch('emit_event', {
    event: 'move',
    payload
  })
}
export function zoom_to({commit, dispatch}, payload){
  commit('zoom_to', payload)
  dispatch('emit_event', {
    event: 'zoom',
    payload
  })
}

export function on_user_click({dispatch, state}, [x, y]){
  let mp = new MapPos(state.map_info)
  let {lat, lng} = mp.rect2sphe([x, y])
  dispatch('emit_event', {
    event: 'click',
    payload: {lat, lng, x, y}
  })
}