import { AxiosInstance, AxiosResponse } from 'axios'
import { Model } from '@vuex-orm/core'
import GlobalConfig from '../contracts/GlobalConfig'
import Config from '../contracts/Config'
import Response from './Response'

export default class Request {
  /**
   * The model class.
   */
  model: typeof Model

  /**
   * Create a new api instance.
   */
  constructor (model: typeof Model) {
    this.model = model
  }

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

    const entities = await this.model.insertOrUpdate({
      data: this.getDataFromResponse(response, requestConfig)
    })

    return new Response(response, entities)
  }

  /**
   * Create a new config by merging the global config, the model config,
   * and the given config.
   */
  private createConfig (config: Config): Config {
    const globalConfig: GlobalConfig = this.model.globalApiConfig
    const modelConfig: Config = this.model.apiConfig || {}

    return { ...globalConfig, ...modelConfig, ...config }
  }

  /**
   * Get data from the given response object. If the `dataKey` config is
   * provided, it tries to fetch the data at that key.
   */
  private getDataFromResponse (response: AxiosResponse, config: Config): any {
    if (!config.dataKey) {
      return response.data
    }

    return response.data[config.dataKey]
  }
}
