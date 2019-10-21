import './types/vuex-orm'

import Components from './contracts/Components'
import GlobalConfig from './contracts/GlobalConfig'
import Config from './contracts/Config'
import Request from './api/Request'
import Response from './api/Response'
import VuexORMAxios from './VuexORMAxios'

export {
  GlobalConfig,
  Config,
  Request,
  Response
}

export default {
  install (components: Components, config: GlobalConfig): void {
    (new VuexORMAxios(components, config)).plugin()
  }
}
