import { Database } from '@vuex-orm/core';

export const AxiosRequestConfig = {
  /**
   * Default Base URL
   */
  baseURL: 'http://localhost:3000',

  /**
   * Default URL
   */
  url: '/',

  /**
   * Default Method
   */
  method: 'get',

  /**
   * Access Token Variable
   */
  access_token: '',

  /**
   * Default Headers
   */
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  /**
   * Default Data
   */
  data: {},

  /**
   * Default Timout
   */
  timeout: 0,

  /**
   * Default With Credentials Flag
   */
  withCredentials: false,

  /**
   * Default Response Type
   */
  responseType: 'json',

  /**
   * Default Response Encoding
   */
  responseEncoding: 'utf8',

  /**
   * Default Validate Status Method
   * @param {number} status
   */
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },

  /**
   * Default Max Redirects
   */
  maxRedirects: 5,

  /**
   * Default Socket Path
   */
  socketPath: null,

  /**
   * Default Proxy
   */
  proxy: {},

  /**
   * Default on Response
   * @param {object} response
   */
  onResponse(response) {
    return response.data;
  },

  /**
   * On 401 Unauthorised
   * @param {object} error
   */
  onUnauthorised(error) {
    //
  },

  /**
   * On 404 Not Found
   * @param {object} error
   */
  onNotFound(error) {
    //
  },

  /**
   * On 500 Server Error
   * @param {object} error
   */
  onServerError(error) {
    //
  },

  /**
   * On Generic Error
   * @param {object} error
   */
  onGenericError(error) {
    //
  },

  /**
   * On Laravel Validation Error (Or 422 Error).
   * @param {object} error
   */
  onValidationError(error) {
    //
  },

  /**
   * Default on Error
   * @param {object} error
   */
  onError(error) {
    switch (error.response.status) {
      case 401:
        this.onUnauthorised(error);
        break;
      case 404:
        this.onNotFound(error);
        break;
      case 422:
        this.onValidationError(error);
        break;
      case 500:
        this.onServerError(error);
        break;
      default:
        this.onGenericError(error);
        break;
    }

    return Promise.reject(error);
  },
};

export const VuexOrmPluginConfig = {
  /**
   * Default VuexORM Database
   */
  database: new Database(),

  /**
   * Default Axios Config
   */
  http: AxiosRequestConfig
};
