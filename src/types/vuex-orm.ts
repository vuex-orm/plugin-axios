import { AxiosInstance } from 'axios'
import { Config, GlobalConfig } from '../contracts/Config'
import { Request } from '../api/Request'

declare module '@vuex-orm/core' {
  namespace Model {
    /**
     * The api client.
     */
    export let axios: AxiosInstance | null

    /**
     * The global api configuration for all models.
     */
    export let globalApiConfig: GlobalConfig

    /**
     * The api configuration for the model.
     */
    export let apiConfig: Config

    /**
     * Set the given axios instance.
     */
    export function setAxios(axios: AxiosInstance): void

    /**
     * Get the api instance.
     */
    export function api(): Request
  }
}
