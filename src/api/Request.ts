import { AxiosInstance, AxiosResponse } from 'axios'
import { Model } from '@vuex-orm/core'
import _merge from 'lodash.merge'
import _omitBy from 'lodash.omitby'
import _isNil from 'lodash.isnil'
import Config from '../contracts/Config'
import Response from './Response'

export default class Request {
  /**
   * The model class.
   */
  model: typeof Model

  /**
   * The default config.
   */
  config: Config = {
    save: true
  }

  /**
   * Create a new api instance.
   */
  constructor (model: typeof Model) {
    this.model = model

    this.registerActions()
  }

  /**
   * Index key for the user defined actions.
   */
  [action: string]: any

  /**
   * Get the axios client.
   */
  get axios (): AxiosInstance {
    if (!this.model.axios) {
      throw new Error('[Vuex ORM Axios] The axios instance is not registered. Please register the axios instance to the model.')
    }

    return this.model.axios
  }

  /**
   * Register actions from the model config.
   */
  private registerActions (): void {
    const actions = this.model.apiConfig.actions

    if (!actions) {
      return
    }

    for (const name in actions) {
      const action = actions[name]

      typeof action === 'function'
        ? this.registerFunctionAction(name, action)
        : this.registerObjectAction(name, action)
    }
  }

  /**
   * Register the given object action.
   */
  private registerObjectAction (name: string, action: any): void {
    this[name] = (config: Config) => {
      return this.request({ ...action, ...config })
    }
  }

  /**
   * Register the given function action.
   */
  private registerFunctionAction (name: string, action: any): void {
    this[name] = action.bind(this)
  }

  /**
   * Perform a get request.
   */
  get (url: string, config: Config = {}): Promise<Response> {
    return this.request({ method: 'get', url, ...config })
  }

  /**
   * Perform a post request.
   */
  post (url: string, data: any = {}, config: Config = {}): Promise<Response> {
    return this.request({ method: 'post', url, data, ...config })
  }

  /**
   * Perform a put request.
   */
  put (url: string, data: any = {}, config: Config = {}): Promise<Response> {
    return this.request({ method: 'put', url, data, ...config })
  }

  /**
   * Perform a patch request.
   */
  patch (url: string, data: any = {}, config: Config = {}): Promise<Response> {
    return this.request({ method: 'patch', url, data, ...config })
  }

  /**
   * Perform a delete request.
   */
  delete (url: string, config: Config = {}): Promise<Response> {
    return this.request({ method: 'delete', url, ...config })
  }

  /**
   * Perform an api request.
   */
  async request (config: Config): Promise<Response> {
    const requestConfig = this.createConfig(config)

    const axiosResponse = await this.axios.request(requestConfig)

    return this.createResponse(axiosResponse, requestConfig)
  }

  /**
   * Create a new config by merging the global config, the model config,
   * and the given config. Any value that is null after the merge will
   * have the entire entry removed.
   */
  private createConfig (config: Config): Config {
    return _omitBy(_merge({},
      this.config,
      this.model.globalApiConfig,
      this.model.apiConfig,
      config
    ), _isNil)
  }

  /**
   * Create a new response instance by applying a few initialization processes.
   * For example, it saves response data if `save` option id set to `true`.
   */
  private async createResponse (axiosResponse: AxiosResponse, config: Config): Promise<Response> {
    const response = new Response(this.model, config, axiosResponse)

    if (config.delete !== undefined) {
      await response.delete()

      return response
    }

    config.save && await response.save()

    return response
  }
}
