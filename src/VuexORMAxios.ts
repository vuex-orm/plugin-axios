import { Model } from '@vuex-orm/core'
import Components from './contracts/Components'
import GlobalConfig from './contracts/GlobalConfig'
import ModelMixin from './mixins/Model'

export default class VuexORMAxios {
  /**
   * The model class.
   */
  model: typeof Model

  /**
   * The global configuration object.
   */
  config: GlobalConfig

  /**
   * Create a new Vuex ORM Axios instance.
   */
  constructor (components: Components, config: GlobalConfig) {
    this.model = components.Model
    this.config = config
  }

  /**
   * Plug in features.
   */
  plugin (): void {
    ModelMixin(this.model, this.config)
  }
}
