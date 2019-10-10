import { AxiosRequestConfig } from 'axios'

export interface Config extends AxiosRequestConfig {
  dataKey?: string
}

export default Config
