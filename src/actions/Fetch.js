import Axios from '../orm/axios';
import Action from './Action'
import Context from '../common/context'
import isPlainObject from 'lodash/isPlainObject';

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
    const method = Action.getMethod('$fetch', model, 'get');
    const request = axios[method](endpoint);

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
    let insertData
    if(isPlainObject(data)) {
      const rootKey = model.rootKey || 'data'
      insertData = data[rootKey]
    }else {
      insertData = data
    }
    return model.insertOrUpdate({
      data: insertData,
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
