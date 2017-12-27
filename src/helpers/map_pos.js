export class MapPos{
  constructor(map_info){
    this.map_info
    this.width = map_info.width
    this.height = map_info.height
    this.lat_offset = map_info.loc.lat.from
    this.lat_range = map_info.loc.lat.to - map_info.loc.lat.from
    this.lng_offset = map_info.loc.lng.from
    this.lng_range = map_info.loc.lng.to - map_info.loc.lng.from
  }
  x2lng(x){
    return x * this.lng_range / this.width + this.lng_offset
  }
  lng2x(lng){
    return (lng - this.lng_offset) * this.width / this.lng_range
  }
  y2lat(y){
    return y * this.lat_range / this.height + this.lat_offset
  }
  lat2y(lat){
    return (lat - this.lat_offset) * this.height / this.lat_range
  }
  rect2sphe([x, y]){
    return {
      lng: this.x2lng(x),
      lat: this.y2lat(y)
    }
  }
  sphe2rect({lat, lng}){
    return [
      this.lng2x(lng),
      this.lat2y(lat)
    ]
  }
}