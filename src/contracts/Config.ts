import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { Model, Record } from '@vuex-orm/core'

export type PersistMethods = 'create' | 'insert' | 'update' | 'insertOrUpdate'

export interface Config extends AxiosRequestConfig {
  dataKey?: string
  dataTransformer?: (response: AxiosResponse) => Record | Record[]
  save?: boolean
  persistBy?: PersistMethods
  delete?: string | number | ((model: Model) => boolean)
  actions?: {
    [name: string]: any
  }
}

export interface GlobalConfig extends Config {
  axios?: AxiosInstance
}
