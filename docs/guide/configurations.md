# Configurations

You may configure many options in Vuex ORM Axios and its underlining Axios instance. There are 3 places to set options.

- Global Configuration
- Model Configuration
- Request Configuration

Global Configuration can be defined at the installation process by passing the option as the second argument of `VuexORM.use` method.

```js
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios, {
  axios,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: 'https://example.com/api/'
})
```

You may define configuration at the Model level too. To do so, define `static apiConfig` property to the Model.

```js
import { Model } from '@vuex-orm/core'

class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr('')
    }
  }

  static apiConfig = {
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    baseURL: 'https://example.com/api/'
  }
}
```

Finally, you can pass configuration when making the api call.

```js
User.api().get('/api/users', {
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: 'https://example.com/api/'
})
```

The lower level configuration will overwrite a higher level of configs. Which means that the Request Config will overwrite Model Config, and Model Config will overwrite Global Config.

## Available Options

All Axios configurations are available. For those, please refer to [the Axios documentation](https://github.com/axios/axios#request-config). In addition to Axios options, Vuex ORM Axios takes few more options specific to the plugin usage.

### dataKey

- **`dataKey: string | null`**

  ```js
  {
    ok: true,
    data: {
      id: 1,
      name: 'John Doe'
    }
  }
  ```

  In this case, data persistent to the store will probably fail, since actual data is inside `data` key, but Vuex ORM Axios is going to insert whole object including `ok` property.

  For these situations, you can use `dataKey` property to specify which key to look for data.

  ```js
  User.api().get('/api/users', {
    dataKey: 'data'
  })
  ```

  With the above config, the data inside `data` key will be inserted to the store.
