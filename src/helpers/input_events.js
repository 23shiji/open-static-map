import bus from '../bus'

const mouse_move_stat = {
  x: null,
  y: null,
  moving: false
}

const touch_zoom_stat = {
  moving: false,
  center: null,
  dist: 0
}

const animation_stat = {
  timer: null,
  counter: 0
}

function disabled_in_animation(func){
  if(animation_stat.timer) return;
  return function(...args){
    func.call(this, ...args)
  }
}

function move_animation([tx, ty], dz, n_times, time){
  if(animation_stat.timer){
    clearInterval(animation_stat.timer)
    animation_stat.timer = null
  }
  const dx = (tx - this.x) / n_times
  const dy = (ty - this.y) / n_times
  const cent = [this.x ,this.y]
  const sz = Math.exp( Math.log(dz) / n_times)
  animation_stat.counter = 0
  animation_stat.timer = setInterval(()=>{
    this.dzoom(sz)
    // this.x += dx
    // this.y += dy
    this.dmove([dx, dy])
    animation_stat.counter++
    if(animation_stat.counter > n_times){
      clearInterval(animation_stat.timer)
      animation_stat.timer = null
    }
  }, time/n_times)
}

function page2map(p, s, v, z){
  return p + (s - v / 2) / z
}

export default {
  @disabled_in_animation
  dblclick_aim(evt){
    let sx = evt.pageX
    let sy = evt.pageY
    let vw = window.innerWidth
    let vh = window.innerHeight
    let cx = page2map(this.x, sx, vw, this.zoom)
    let cy = page2map(this.y, sy, vh, this.zoom)
    move_animation.call(this, [cx, cy], 2, 25, 50)
  },
  @disabled_in_animation
  wheel_zoom(evt){
    let sx = evt.pageX
    let sy = evt.pageY
    let vw = window.innerWidth
    let vh = window.innerHeight
    let cx = page2map(this.x, sx, vw, this.zoom)
    let cy = page2map(this.y, sy, vh, this.zoom)
    this.dzoom(Math.pow(1.001, -evt.deltaY), [cx, cy])
  },
  on_mouse_down(evt){
    this.start_moving([evt.pageX, evt.pageY])
  },
  on_mouse_move(evt){
    this.moving([evt.pageX, evt.pageY])
  },
  on_mouse_up(evt){
    this.stop_moving([evt.pageX, evt.pageY])
  },
  on_touch_start(evt){
    if(evt.touches.length == 1){
      let t = evt.touches[0]
      this.start_moving([t.pageX, t.pageY])
    }else{
      let t1 = evt.touches[0]
      let t2 = evt.touches[1]
      let vw = window.innerWidth
      let vh = window.innerHeight
      let cx = page2map(this.x, (t1.pageX + t2.pageX) / 2, vw, this.zoom)
      let cy = page2map(this.y, (t1.pageY + t2.pageY) / 2, vh, this.zoom)
      touch_zoom_stat.center = [cx, cy]
      touch_zoom_stat.dist = Math.sqrt(
        Math.pow(t1.pageX - t2.pageX, 2) +
        Math.pow(t1.pageY - t2.pageY, 2)
      )
      touch_zoom_stat.moving = true
    }
  },
  on_touch_move(evt){
    if(evt.touches.length == 1){
      let t = evt.touches[0]
      this.moving([t.pageX, t.pageY])
      return false
    }else{
      if(!touch_zoom_stat.moving) return;
      let t1 = evt.touches[0]
      let t2 = evt.touches[1]
      let vw = window.innerWidth
      let vh = window.innerHeight
      let [cx, cy] = touch_zoom_stat.center
      let od = touch_zoom_stat.dist
      let d  = Math.sqrt(
        Math.pow(t1.pageX - t2.pageX, 2) +
        Math.pow(t1.pageY - t2.pageY, 2)
      )
      this.dzoom(d / od, [cx, cy])
      touch_zoom_stat.dist = d
    }
  },
  on_touch_end(evt){
    if(evt.touches.length == 1){
      let t = evt.touches[0]
      this.stop_moving([t.pageX, t.pageY])
    }else{
      touch_zoom_stat.moving = false
    }
  },
  @disabled_in_animation
  start_moving([x, y]){
    mouse_move_stat.x = x
    mouse_move_stat.y = y
    mouse_move_stat.moving = true
  },
  @disabled_in_animation
  moving([x, y]){
    if(!mouse_move_stat.moving) return;
    this.dmove([ -(x - mouse_move_stat.x) / this.zoom, 0 ])
    this.dmove([ 0, -(y - mouse_move_stat.y) / this.zoom ])
    mouse_move_stat.x = x
    mouse_move_stat.y = y
  },
  stop_moving(){
    mouse_move_stat.moving = false
  },
  @disabled_in_animation
  key_dmove(dx, dy){
    move_animation.call(this, [this.x+dx, this.y+dy], 1, 10, 10)
  },
  @disabled_in_animation
  init_key_events(){
    const MOVE_DIST = 100
    bus.$on('navi_key', evt => {
      let mvd = MOVE_DIST / this.zoom
      switch(evt){
      case 'ZOOM_IN':
        move_animation.call(this, [this.x, this.y], 1.5, 10, 10)
      break
      case 'ZOOM_OUT':
        move_animation.call(this, [this.x, this.y], 0.667, 10, 10)
      break
      case 'LEFT':
        this.key_dmove(-mvd, 0)
      break
      case 'RIGHT':
        this.key_dmove(+mvd, 0)
      break
      case 'UP':
        this.key_dmove(0, -mvd)
      break
      case 'DOWN':
        this.key_dmove(0, +mvd)
      break
      }
    })
  }
}