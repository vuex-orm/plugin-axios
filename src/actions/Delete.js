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
    const request = axios.delete(endpoint);

    request
      .then(data => {
        model.delete({
          where: (params.params.id) ? params.params.id : data.id,
        })
      })

    return request;
  }
}
