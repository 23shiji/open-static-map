import {MapPos} from './map_pos'

export function visiable_range(){
  let {
    displayed_map_width: dw,
    displayed_map_height: dh
  } = this.$store.getters
  let {x, y} = this.$store.state
  return [
    x - dw/2,
    y - dh/2,
    x + dw/2,
    y + dh/2
  ]
}

export function location_visiable(loc){
  let [fx, fy, tx, ty] = this.visiable_range()
  let mp = new MapPos(this.$store.state.map_info)
  let [x, y] = mp.sphe2rect(loc.pos)
  return x >= fx && x <= tx && y >= fy && y <= ty
}

export function image_visiable(image_info){
  let [fx, fy, tx, ty] = this.visiable_range()
  let {
    width, height,
    offset: {x, y}
  } = image_info
  return !(
    x + width < fx || x > tx ||
    y + height < fy || y > ty
  )
}