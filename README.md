# Vuex ORM Plugin: Axios

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/npm/l/@vuex-orm/plugin-axios.svg)](https://github.com/vuex-orm/plugin-axios/blob/master/LICENSE.md)

# Installation
``` js
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import database from './database'
..

VuexORM.use(VuexORMAxios, {
  database,
  http: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    url: '/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
})
..

export default () => new Vuex.Store({
  namespaced: true,
  plugins: [VuexORM.install(database)]
})

```

# Axios Request Config

``` js
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
```


# Model Methods
``` js
import User from '../models/User';

/**
 * @uri `/users`
 */
User.$fetch();

/**
 * @uri `/users/:id`
 */
User.$get({
  params: {
    id: 1
  }
}); 

/**
 * @uri `/users`
 */
User.$create({
  data: {}
});

/**
 * @uri `/users/:id`
 */
User.$update({
  params: {
    id: 1
  },
  data: {}
});

/**
 * @uri `/users/:id`
 */
User.$delete({
  params: {
    id: 1
  }
});
```

# Model Config

> Default Model

``` js
import { Model } from '@vuex-orm/core'

export default class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.increment(),
      title: this.string('')
    }
  }
}
```

> Edited Model

``` js
import { Model } from '@vuex-orm/core'

export default class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.increment(),
      title: this.string('')
    }
  }

  static methodConf = {
    http: {
      url: '/post'
    },
    methods: {
      $fetch: {
        name: 'fetch',
        http: {
          url: '',
          method: 'get',
        },
      },
      $get: {
        name: 'get',
        http: {
          url: '/:id',
          method: 'get',
        },
      },
      $create: {
        name: 'create',
        http: {
          url: '',
          method: 'post',
        },
      },
      $update: {
        name: 'update',
        http: {
          url: '/:id',
          method: 'put',
        },
      },
      $delete: {
        name: 'delete',
        http: {
          url: '/:id',
          method: 'delete',
        },
      },
    },
  }
}
```
