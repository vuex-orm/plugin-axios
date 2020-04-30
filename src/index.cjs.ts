import './types/vuex-orm'

import { Components } from './contracts/Components'
import { GlobalConfig } from './contracts/Config'
import VuexORMAxios from './VuexORMAxios'

export default {
  install(components: Components, config: GlobalConfig): void {
    new VuexORMAxios(components, config).plugin()
  }
}
