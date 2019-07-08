import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'

export default class Create extends Action {
  /**
   * Call $create method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    if(!params.data || typeof params !== 'object') {
      throw new TypeError("You must include a data object in the params to send a POST request", params)
    }

    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$create', model, params);
    const axios =  new Axios(model.methodConf.http);
    const method = Action.getMethod('$create', model, 'post');
    const request = axios[method](endpoint, params.data);

    this.onRequest(commit);
    try {
      await this.onSuccess(commit, model, await request);
    } catch(error) {
      this.onError(commit, error);
    }

    return request;
  }

  /**
   * On Request Method
   * @param {object} commit
   */
  static onRequest(commit) {
    commit('onRequest');
  }

  /**
   * On Successful Request Method
   * @param {object} commit
   * @param {object} model
   * @param {object} data
   */
  static onSuccess(commit, model, data) {
    commit('onSuccess')
    return model.insertOrUpdate({
      data,
    });
  }

  /**
   * On Failed Request Method
   * @param {object} commit
   * @param {object} error
   */
  static onError(commit, error) {
    commit('onError', error)
  }
}
