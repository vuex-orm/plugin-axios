import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'

export default class Fetch extends Action {
  /**
   * Call $fetch method
   * @param {object} store
   * @param {object} params
   */
  static async call ({ state, commit }, params = {}) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$fetch', model, params);
    const axios =  new Axios(model.methodConf.http);
    const request = axios.get(endpoint);

    commit('onRequest');
    request
      .then(data => {
        commit('onSuccess')
        model.insertOrUpdate({
          data,
        });
      })
      .catch(error => {
        commit('onError', error)
      })

    return request;
  }
}
