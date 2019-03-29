import merge from 'lodash/merge';
import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'

export default class Update extends Action {
  /**
   * Call $update method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    if(!params.data || typeof params !== 'object') {
      throw new TypeError("You must include a data object in the params to send a POST request", params)
    }

    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$update', model, params);
    const axios =  new Axios(model.methodConf.http);
    const method = Action.getMethod('$update', model, 'put');
    const request = axios[method](endpoint, params.data);

    await this.onRequest(model, params);
    try {
      await this.onSuccess(model, params, await request);
    } catch(error) {
      await this.onError(model, params, error);
    }

    return request;
  }

  /**
   * On Request Method
   * @param {object} model
   * @param {object} params
   */
  static onRequest(model, params) {
    return model.update({
      where: params.params.id,
      data: {
        $isUpdating: true,
        $updateErrors: []
      }
    })
  }

  /**
   * On Successful Request Method
   * @param {object} model
   * @param {object} params
   * @param {object} data
   */
  static onSuccess(model, params, data) {
    return model.update({
      where: params.params.id || data.id,
      data: merge({}, data, {
        $isUpdating: false,
        $updateErrors: []
      })
    })
  }

  /**
   * On Failed Request Method
   * @param {object} model
   * @param {object} params
   * @param {object} error
   */
  static onError(model, params, error) {
    return model.update({
      where: params.params.id,
      data: {
        $isUpdating: false,
        $updateErrors: error
      }
    })
  }
}
