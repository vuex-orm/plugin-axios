import { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { Model, Record } from '@vuex-orm/core'

export type PersistMethods = 'create' | 'insert' | 'update' | 'insertOrUpdate'

export type PersistOptions = { [P in PersistMethods]?: string[] }

export interface Config extends AxiosRequestConfig {
  dataKey?: string
  dataTransformer?: (response: AxiosResponse) => Record | Record[]
  save?: boolean
  persistBy?: PersistMethods
  persistOptions?: PersistOptions
  delete?: string | number | ((model: Model) => boolean)
  actions?: {
    [name: string]: any
  }
}

export interface GlobalConfig extends Config {
  axios?: AxiosInstance
}
