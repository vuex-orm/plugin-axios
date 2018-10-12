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

    /**
     * Add Model Interface to each model
     */
    model.getFields = () => {
      if (!model.cachedFields) {
        model.cachedFields = _.merge({}, {
          $id: model.attr(undefined),
          $isUpdating: model.boolean(false),
          $updateErrors: model.attr([]),
          $isDeleting: model.boolean(false),
          $deleteErrors: model.attr([]),
        }, model.fields())
      }

      return model.cachedFields;
    };

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
    let params = _.map(endpoint.match(/(\/?)(\:)([A-z]*)/gm), (param) => { return param.replace('/', '') })

    _.forEach(params, (param) => {
      const paramValue = _.has(config.params, param.replace(':', '')) ? config.params[param.replace(':', '')] : ''
      endpoint = endpoint.replace(param, paramValue).replace('//', '/')
    })
    if (config.query) endpoint += `?${Object.keys(config.query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(config.query[k])}`).join('&')}`;
    return endpoint;
  }
}
