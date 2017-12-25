export function lng2x(lng, meta){
  return (lng - meta.lng.offset) * (meta.x.to - meta.x.from) + meta.x.offset
}

export function lat2y(lat, meta){
  return (lat - meta.lat.offset) * (meta.y.to - meta.y.from) + meta.y.offset
}

export function spher2rect([lng, lat], meta){
  return [lng2x(lng, meta), lat2y(lat, meta)]
}

export function rect2spher([x, y], meta){
  let lng = ( x - meta.x.offset ) * (meta.lng.to - meta.lng.from) + meta.lng.offset
  let lat = ( y - meta.y.offset ) * (meta.lat.to - meta.lat.from) + meta.lat.offset
  return [lng, lat]
}