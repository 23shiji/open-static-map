export interface RawMapMetaObject {
  width: number,
  height: number,
  layers: {
    [index: number]: {
      zIndex: number
      type: string,
      data: any,
      rect_pos: {
        x: number,
        y: number
      },
      rect_range: {
        width: number,
        height: number
      },
      sphere_pos: {
        lng: number,
        lat: number
      },
      sphere_range: {
        lng_angle: number,
        lat_angle: number 
      }
    }
  }
}