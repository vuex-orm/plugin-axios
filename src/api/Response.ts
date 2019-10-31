import { AxiosResponse } from 'axios'
import { Model, Collections } from '@vuex-orm/core'
import Config from '../contracts/Config'

export default class Response {
  /**
   * The model that called the request.
   */
  model: typeof Model

  /**
   * The request configuration.
   */
  config: Config

  /**
   * The axios response instance.
   */
  response: AxiosResponse

  /**
   * Entities created by Vuex ORM.
   */
  entities: Collections | null

  /**
   * Create a new response instance.
   */
  constructor (model: typeof Model, config: Config, response: AxiosResponse, entities: Collections | null) {
    this.model = model
    this.config = config
    this.response = response
    this.entities = entities
  }
}
