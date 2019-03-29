import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'

export default class Get extends Action {
  /**
   * Call $get method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$get', model, params);
    const axios =  new Axios(model.methodConf.http);
    const method = Action.getMethod('$get', model, 'get');
    const request = axios[method](endpoint);

    this.onRequest(commit);
    request
      .then(data => this.onSuccess(commit, model, data))
      .catch(error => this.onError(commit, error))

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
  static onSuccess(commit, model, { data }) {
    commit('onSuccess')
    model.insertOrUpdate({
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
