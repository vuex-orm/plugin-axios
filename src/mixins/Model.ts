import { AxiosInstance } from 'axios'
import { Model as BaseModel } from '@vuex-orm/core'
import GlobalConfig from '../contracts/GlobalConfig'
import Request from '../api/Request'

export default function Model (model: typeof BaseModel, config: GlobalConfig): void {
  /**
   * The api client.
   */
  model.axios = config.axios || null

  /**
   * The global api configuration for all models.
   */
  model.globalApiConfig = config

  /**
   * The api configuration for the model.
   */
  model.apiConfig = null

  /**
   * Set the given api client.
   */
  model.setAxios = function (axios: AxiosInstance): void {
    this.axios = axios
  }

  /**
   * Get the api instance.
   */
  model.api = function (): Request {
    return new Request(this)
  }
}
