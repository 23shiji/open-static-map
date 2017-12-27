export class MapPos{
  constructor(map_info){
    this.map_info
    this.width = map_info.width
    this.height = map_info.height
    this.lat_range = map_info.loc.lat
    this.lng_range = map_info.loc.lng
  }
  
}