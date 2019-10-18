# Advanced Usage

In addition to basic Axios request methods such as `get` and `post`, Vuex ORM Axios defines a more powerful and convenient method that you can use to call API and integrate with Vuex ORM better.

Vuex ORM defines the following methods.

- [fetch](#fetch)

## fetch

The `fetch` method works almost as same as `get` method, but it will take URL query parameters as the 2nd argument.

```js
User.api().fetch('/api/users', {
  search: 'John'
})
```

The `fetch` method works almost as same as `get` method, but it will take URL query parameters as the 2nd argument.

The above method will call endpoint at `/api/users?search=john`.

You can also pass general config at 3rd argument.

```js
User.api().fetch(
  '/api/users',
  { search: 'John' },
  { dataKey: 'data' }
)
```
