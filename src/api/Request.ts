import { AxiosInstance, AxiosResponse } from 'axios'
import { Model } from '@vuex-orm/core'
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

    const response = await this.axios.request(requestConfig)

    const entities = await this.persistResponseData(response, requestConfig)

    return new Response(this.model, requestConfig, response, entities)
  }

  /**
   * Create a new config by merging the global config, the model config,
   * and the given config.
   */
  private createConfig (config: Config): Config {
    return {
      ...this.config,
      ...this.model.globalApiConfig,
      ...this.model.apiConfig,
      ...config
    }
  }

  /**
   * Persist the response data to the vuex store.
   */
  private async persistResponseData (response: AxiosResponse, config: Config): Promise<any> {
    if (!config.save) {
      return null
    }

    if (config.delete !== undefined) {
      return this.model.delete(config.delete as any)
    }

    return this.model.insertOrUpdate({
      data: this.getDataFromResponse(response, config)
    })
  }

  /**
   * Get data from the given response object. If the `dataTransformer` config is
   * provided, it tries to execute the method with the response as param.
   * If the `dataKey` config is provided, it tries to fetch the data at that key.
   */
  private getDataFromResponse (response: AxiosResponse, config: Config): any {
    if (config.dataTransformer) {
      return config.dataTransformer(response)
    }

    if (config.dataKey) {
      return response.data[config.dataKey]
    }

    return response.data
  }
}
