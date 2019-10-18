import { AxiosResponse } from 'axios'
import { Model } from '@vuex-orm/core'
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
  entities: any

  /**
   * Create a new response instance.
   */
  constructor (model: typeof Model, config: Config, response: AxiosResponse, entities: any) {
    this.model = model
    this.config = config
    this.response = response
    this.entities = entities
  }
}
