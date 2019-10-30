# Usage

After setting up Vuex ORM Axios, you may use `Model.api` method to perform api call.

```js
User.api().get('/api/users')
```

## Request

Vuex ORM Axios can perform all basic Axios requests, which is `get`, `post`, `put`, `patch`, `delete`, and `request`. These methods take the same arguments as Axios and perform exactly as same as Axios, except it's going to store response data to the store corresponding to the Model that is calling the api.

Available methods and the argument pattern is listed below. Remember, the argument is the same as the corresponding Axios methods. The `data` or `config` will be passed directly to the underlining Axios instance.

```js
User.api().get(url, config)
User.api().post(url, data, config)
User.api().put(url, data, config)
User.api().patch(url, data, config)
User.api().delete(url, config)
User.api().request(config)
```

When calling any of the above methods, Vuex ORM Axios will persist the response data to the store. Let's say your api response is as follows.

```js
// Response body data.

{
  "id": 1,
  "name": "John Doe",
  "age": 24
}
```

And if you call api from User Model, the above data will be inserted as User records to the store.

```js
// Call api from User Model.
User.api().get('/api/users')

// Then, inside Vuex Store.
{
  users: {
    data: {
      1: { id: 1, name: 'John Doe', age: 24 }
    }
  }
}
```

Now, remember that Vuex ORM Axios will try to insert any response data to the store. For example, if you call the same API from Post Model, it's going to try to insert the response as Post records. So be aware of what Model to call the API from.

Also, note that these methods can take the same configuration as Axios.

```js
User.api().get('users', {
  baseURL: 'https://example.com/api/'
})
```

There're additional configuration specific to Vuex ORM Axios as well. Please check out [Configurations page](configurations) for more.

### Note on Delete Method

Even when you call `delete` method, it will not delete records from the store. It just means that it will perform HTTP DELETE request. If you want to delete the record after calling the API, you must define `delete` option.

```js
User.api().delete('/api/users/1', {
  delete: 42
})
```

The above example will delete the user record with an id of 1. Please check out [Configurations page](configurations) for more.

## Response

The response object is a bit different from Axios response and contains 2 properties. One is `response`, which is the pure Axios response object, and the second one is the `entities`, which holds Vuex ORM persistent result.

```js
const result = await User.api().get('/api/users')

// You may access Axios response object like this.
result.response.status // <- 200

// And Vuex ORM persisted entities like so.
result.entities // <- { users: [{ ... }] }
```
