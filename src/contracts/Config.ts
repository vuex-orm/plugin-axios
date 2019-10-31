import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Model } from '@vuex-orm/core'

export interface Config extends AxiosRequestConfig {
  dataKey?: string,
  dataTransformer?: ((response: AxiosResponse) => object),
  save?: boolean
  delete?: string | number | ((model: Model) => boolean)
  actions?: {
    [name: string]: any
  }
}

export default Config
