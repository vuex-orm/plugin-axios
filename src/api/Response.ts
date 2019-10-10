import { AxiosResponse } from 'axios'

export default class Response {
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
  constructor (response: AxiosResponse, entities: any) {
    this.response = response
    this.entities = entities
  }
}
