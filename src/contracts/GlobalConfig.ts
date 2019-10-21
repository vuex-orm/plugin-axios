import { AxiosInstance } from 'axios'
import Config from './Config'

export interface GlobalConfig extends Config {
  axios?: AxiosInstance
}

export default GlobalConfig
