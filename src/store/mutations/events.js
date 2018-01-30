export function on_event(state, {event, callback}){
  if(state[event]){
    state.event_callbacks[event].push(callback)
  }else{
    state.event_callbacks[event] = [callback]
  }
}