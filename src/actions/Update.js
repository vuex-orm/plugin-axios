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
    const request = axios.put(endpoint, params.data);

    request
      .then(data => {
        model.update({
          where: data.id,
          data
        })
      })

    return request;
  }
}
