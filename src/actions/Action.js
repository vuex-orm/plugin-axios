import _ from 'lodash';
import Context from '../common/context';
import { ModuleConfig, ModelConfig } from '../support/interfaces';

export default class Action {
  /**
   * Transform Module to include ModuleConfig
   * @param {object} model
   */
  static transformModule(module) {
    return _.merge({}, ModuleConfig, module);
  }

  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    const context = Context.getInstance();
    ModelConfig.http = _.merge({}, ModelConfig.http, context.options.http);
    model.methodConf = _.merge({}, ModelConfig, model.methodConf);
    model.methodConf.http.url = (model.methodConf.http.url === '/') ? `/${model.entity}` : model.methodConf.http.url;
    return model;
  }

  /**
   * Transform Params and Return Endpoint
   * @param {string} type
   * @param {object} model
   * @param {object} config
   */
  static transformParams (type, model, config = {}) {
    let endpoint = `${model.methodConf.http.url}${model.methodConf.methods[type].http.url}`;
    if (config.params) _.forOwn(config.params, (value, param) => { endpoint = endpoint.replace(`:${param}`, value); });
    if (config.query) endpoint += `?${Object.keys(config.query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(config.query[k])}`).join('&')}`;
    return endpoint;
  }
}
