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
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
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
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    baseURL: 'https://example.com/api/'
  }
}
```

Finally, you can pass configuration when making the api call.

```js
User.api().get('/api/users', {
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: 'https://example.com/api/'
})
```

The lower level configuration will overwrite a higher level of configs. Which means that the Request Config will overwrite Model Config, and Model Config will overwrite Global Config.

## Available Options

All Axios configurations are available. For those, please refer to [the Axios documentation](https://github.com/axios/axios#request-config). In addition to Axios options, Vuex ORM Axios takes few more options specific to the plugin usage.

### dataTransformer

- **`dataTransformer?: ((response: AxiosResponse) => object)`**

  This option will let you transform the response before send it to the store. Let's say your response from the server looks like below.

  ```js
  {
    ok: true,
    data: {
      id: 1,
      name: 'John Doe'
    }
  }
  ```

  For these situations, you can use `dataTransform` property to specify how you want to transform the data. The whole response is send as callback param.

  ```js
  User.api().get('/api/users', {
    dataTransformer: ({ data, headers }) => {
      // Do stuff with headers
      // Do stuff with data

      return data.data
    }
  })
  ```

  With the above config, the data inside `data` key will be inserted to the store.

  It is very useful when you need to transform a given response to be handle by Vuex ORM. For instance, if you format your response with the [JSON:API specs](https://jsonapi.org/), you can transform your response with this callback.

### dataKey

- **`dataKey?: string | null`**

  This option will define which key to look for when persisting response data. Let's say your response from the server looks like below.

  ```js
  {
    ok: true,
    data: {
      id: 1,
      name: 'John Doe'
    }
  }
  ```

  In this case, data persistent to the store will probably fail, since actual data is inside the `data` key, but Vuex ORM Axios is going to insert whole object including `ok` property.

  For these situations, you can use `dataKey` property to specify which key to look for data.

  ```js
  User.api().get('/api/users', {
    dataKey: 'data'
  })
  ```

  With the above config, the data inside `data` key will be inserted to the store.

### save

- **`save: boolean = true`**

  This option will determine whether to store the response data to the store or not. If you set this value to `false`, the response data will not be persisted to the store. In that case, the `entities` property at the Response object will become null.

  ```js
  User.api().get('/api/users', {
    save: false
  })
  ```

### delete

- **`delete?: string | number | (model: Model) => boolean`**

  When this option is defined, the matching record will be deleted from the store after the api call. Usually, you need to set this when calling api to delete a record. When this option is set, the response data will not be persisted even if the `save` option is set to true.

  ```js
  User.api().delete('/api/users', {
    delete: 1
  })
  ```

  Well, you may wonder having to manually specify what record to be deleted is a bit redundant. However, without this option, Vuex ORM Axios wouldn't know what records should be deleted because it can't rely on the response data.

  We're open to any suggestions and recommendations to improve the "delete" functionality. Please feel free to open an issue on GitHub!

### actions

- **`actions?: { [name: string]: ActionObject | ActionFunction }`**

  You can define custom actions in here. Please refer to the [Custom Actions](custom-actions) page to learn more about it.
