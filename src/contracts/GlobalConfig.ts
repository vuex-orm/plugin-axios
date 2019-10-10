import { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface GlobalConfig extends AxiosRequestConfig {
  axios?: AxiosInstance
  dataKey?: string
}

export default GlobalConfig
