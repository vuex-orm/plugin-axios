import { AxiosResponse } from 'axios'
import { Model, Record, Collections } from '@vuex-orm/core'
import Config, { PersistOption } from '../contracts/Config'

export default class Response {
  /**
   * The model that called the request.
   */
  model: typeof Model

  /**
   * The request configuration.
   */
  config: Config

  /**
   * The axios response instance.
   */
  response: AxiosResponse

  /**
   * Entities created by Vuex ORM.
   */
  entities: Collections | null = null

  /**
   * Whether if response data is saved to the store or not.
   */
  isSaved: boolean = false

  /**
   * Create a new response instance.
   */
  constructor(model: typeof Model, config: Config, response: AxiosResponse) {
    this.model = model
    this.config = config
    this.response = response
  }

  /**
   * Save response data to the store.
   */
  async save(): Promise<void> {
    const data = this.getDataFromResponse()

    if (!this.validateData(data)) {
      console.warn(
        '[Vuex ORM Axios] The response data could not be saved to the store because it is not an object or an array. You might want to use `dataTransformer` option to handle non-array/object response before saving it to the store.'
      )

      return
    }

    let persistMethod: PersistOption = 'insertOrUpdate'

    if (typeof this.config.save === 'string') {
      if (!this.validatePersistOption(this.config.save)) {
        console.warn(
          '[Vuex ORM Axios] The "save" option provided is not a recognized value. Must be either "create", "insert" or "insertOrUpdate".'
        )

        return
      }

      persistMethod = this.config.save
    }

    this.entities = await this.model[persistMethod]({ data })

    this.isSaved = true
  }

  /**
   * Delete store record depending on `delete` option.
   */
  async delete(): Promise<void> {
    if (this.config.delete === undefined) {
      throw new Error(
        '[Vuex ORM Axios] Could not delete records because the `delete` option is not set.'
      )
    }

    await this.model.delete(this.config.delete as any)
  }

  /**
   * Get data from the given response object. If the `dataTransformer` config is
   * provided, it tries to execute the method with the response as param. If the
   * `dataKey` config is provided, it tries to fetch the data at that key.
   */
  getDataFromResponse(): Record | Record[] {
    if (this.config.dataTransformer) {
      return this.config.dataTransformer(this.response)
    }

    if (this.config.dataKey) {
      return this.response.data[this.config.dataKey]
    }

    return this.response.data
  }

  /**
   * Validate if Vuex ORM can insert the given data.
   */
  private validateData(data: any): data is Record | Record[] {
    return data !== null && typeof data === 'object'
  }

  /**
   * Validate the given string as to ensure it correlates with the available
   * Vuex ORM persist methods.
   */
  private validatePersistOption(method: string): method is PersistOption {
    return ['create', 'insert', 'insertOrUpdate'].includes(method)
  }
}
