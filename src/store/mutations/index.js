import * as load from './load'
import * as map from './map'
import * as ruler from './ruler'
import * as events from './events'

export default {
  ...load,
  ...map,
  ...ruler,
  ...events
}