import store from '../store/index'

const animation_stat = {
  timer: null,
  counter: 0
}

export function disabled_in_animation(func){
  if(animation_stat.timer) return;
  return function(...args){
    func.call(this, ...args)
  }
}

export function move_animation([tx, ty], dz, n_times, time){
  if(animation_stat.timer){
    clearInterval(animation_stat.timer)
    animation_stat.timer = null
  }
  let zoom = store.state.zoom
  let x = store.state.x
  let y = store.state.y
  const dx = (tx - x) / n_times
  const dy = (ty - y) / n_times
  const sz = Math.exp( Math.log(dz) / n_times)
  animation_stat.counter = 0
  animation_stat.timer = setInterval(()=>{
    x += dx
    y += dy
    zoom *= sz
    let center = [x ,y]
    store.commit('zoom_to', {zoom, center})
    store.commit('move_to', [x, y])
    animation_stat.counter++
    if(animation_stat.counter > n_times){
      clearInterval(animation_stat.timer)
      animation_stat.timer = null
    }
  }, time/n_times)
}