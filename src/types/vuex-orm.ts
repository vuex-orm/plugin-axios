import { AxiosInstance } from 'axios'
import GlobalConfig from '../contracts/GlobalConfig'
import Config from '../contracts/Config'
import Request from '../api/Request'

declare module '@vuex-orm/core' {
  namespace Model {
    /**
     * The api client.
     */
    export var axios: AxiosInstance | null

    /**
     * The global api configuration for all models.
     */
    export var globalApiConfig: GlobalConfig

    /**
     * The api configuration for the model.
     */
    export var apiConfig: Config | null

    /**
     * Set the given axios instance.
     */
    export function setAxios (axios: AxiosInstance): void

    /**
     * Get the api instance.
     */
    export function api (): Request
  }
}
