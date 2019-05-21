import forEach from 'lodash/forEach';
import has from 'lodash/has';
import map from 'lodash/map';
import merge from 'lodash/merge';
import QS from 'query-string';
import Axios from '../orm/axios';
import Context from '../common/context';
import { ModuleConfig, ModelConfig } from '../support/interfaces';

export default class Action {
  /**
   * Transform Module to include ModuleConfig
   * @param {object} module
   */
  static transformModule(module) {
    return merge({}, ModuleConfig, module);
  }

  /**
   * Transform Model to include ModelConfig
   * @param {object} model
   */
  static transformModel(model) {
    const context = Context.getInstance();
    ModelConfig.http = merge({}, context.options.http, ModelConfig.http);
    Object.assign(model.methodConf, merge({}, ModelConfig, model.methodConf))
    Object.assign(model.methodConf.http, {
      url: (model.methodConf.http.url === '/') ? `/${model.entity}` : model.methodConf.http.url,
    });

    /**
     * Add Model Interface to each model
     */
    Object.assign(model, {
      getFields: () => {
        if (!model.cachedFields) {
          Object.assign(model, {
            cachedFields: merge({}, {
              $id: model.attr(undefined),
              $isUpdating: model.boolean(false),
              $updateErrors: model.attr([]),
              $isDeleting: model.boolean(false),
              $deleteErrors: model.attr([]),
            }, model.fields()),
          });
        }
        return model.cachedFields;
      },
    });

    return model;
  }

  /**
   * Transform Params and Return Endpoint
   * @param {string} type
   * @param {object} model
   * @param {object} config
   */
  static transformParams(type, model, config = {}) {
    let endpoint = `${model.methodConf.http.url}${model.methodConf.methods[type].http.url}`;
    const params = map(endpoint.match(/(\/?)(:)([A-z]*)/gm), param => param.replace('/', ''));

    forEach(params, (param) => {
      const paramValue = has(config.params, param.replace(':', '')) ? config.params[param.replace(':', '')] : '';
      endpoint = endpoint.replace(param, paramValue).replace('//', '/');
    });
    if (config.query) endpoint += `?${this.createQueryString(config.query, config.arrayFormat || 'bracket')}`;
    return endpoint;
  }

  /**
   * Get appropriate methods
   * @param {string} type
   * @param {object} model
   * @param {string} defaultMethod
   */
  static getMethod(type, model, defaultMethod) {
    const customMethod = model.methodConf.methods[type].http.method;
    return (customMethod) || defaultMethod;
  }

  static createAxiosInstanceForMethod(type, model) {
    return new Axios(
      merge(
        {},
        model.methodConf.http,
        has(model.methodConf, `methods.${type}.http`)
          ? model.methodConf.methods[type].http
          : {},
      ),
    );
  }

  static createQueryString(params, arrayFormat = 'bracket') {
    return QS.stringify(params, { arrayFormat });
  }
}
