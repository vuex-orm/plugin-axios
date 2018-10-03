import axios from 'axios';

export default class Axios {
  constructor(http) {
    this.instance = axios.create(http);

    if(http.access_token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${http.access_token}`;
    }

    this.instance.interceptors.response.use(
      response => http.onResponse(response),
      error => http.onError(error),
    );

    return this.instance;
  }

  /**
   * Head Request
   * @param {string} url
   * @param {object} config
   */
  async head(url, config = {}) {
    return this.instance.head(url, config);
  }

  /**
   * GET Request
   * @param {string} url
   * @param {object} config
   */
  async get(url, config = {}) {
    return this.instance.get(url, config);
  }

  /**
   * POST Request
   * @param {string} url
   * @param {object} config
   */
  async post(url, data = {}, config = {}) {
    return this.instance.post(url, data, config);
  }

  /**
   * PATCH Request
   * @param {string} url
   * @param {object} config
   */
  async patch(url, data = {}, config = {}) {
    return this.instance.patch(url, data, config);
  }

  /**
   * PUT Request
   * @param {string} url
   * @param {object} config
   */
  async put(url, data = {}, config = {}) {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE Request
   * @param {string} url
   * @param {object} config
   */
  async delete(url, config = {}) {
    return this.instance.delete(url, config);
  }
}
