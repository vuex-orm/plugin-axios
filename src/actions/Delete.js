import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'

export default class Delete extends Action {
  /**
   * Call $delete method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$delete', model, params);
    const axios =  new Axios(model.methodConf.http);
    const method = Action.getMethod('$delete', model, 'delete');
    const request = axios[method](endpoint);

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
        $isDeleting: true,
        $deleteErrors: []
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
    return model.delete({
      where: params.params.id || data.id,
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
        $isDeleting: false,
        $deleteErrors: error
      }
    })
  }
}
