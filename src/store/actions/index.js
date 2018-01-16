import * as runtime_config from './runtime_config'
import * as pins_actions from './pins'
import * as location from './location'
import * as ruler from './ruler'

export default {
  ...runtime_config,
  ...pins_actions,
  ...location,
  ...ruler
}