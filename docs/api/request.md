---
sidebarDepth: 2
---

# Request

The Request object is the foundation for the Vuex ORM Axios, and you can call many methods to perform api request. You can obtain Request instance by `api` method on the Model.

```js
const request = User.api()
```

Usually, you could just call Request methods directly by method chaining.

```js
User.api().get()
```

## Constructor

- **``constructor(model: typeof Model)``**

  Request instance requires the Model class to be passed to the constructor. It's automatically done when obtaining the Request object through `Model.api()` method. But you could manually construct Request object your self.

  ```js
  // This is equivalent to...
  const request = new Request(User)

  // This.
  const request = User.api()
  ```

## Instance Properties

### model

- **`model: typeof Model`**

  The Model class that is attached to the Request instance.

### axios

- **`axios: AxiosInstance`**

  The Axios instance that will be used to perform the request.

## Instance Methods

### get

- **`get(url: string, config: Config = {}): Promise<Response>`**

  Performs a `GET` request. It takes the same argument as Axios's `get` method.

### post

- **`post(url: string, data: any = {}, config: Config = {}): Promise<Response>`**

  Performs a `POST` request. It takes the same argument as Axios's `post` method.

### put

- **`put(url: string, data: any = {}, config: Config = {}): Promise<Response>`**

  Performs a `PUT` request. It takes the same argument as Axios's `put` method.

### patch

- **`patch(url: string, data: any = {}, config: Config = {}): Promise<Response>`**

  Performs a `PATCH` request. It takes the same argument as Axios's `patch` method.

### delete

- **`delete(url: string, config: Config = {}): Promise<Response>`**

  Performs a `DELETE` request. It takes the same argument as Axios's `delete` method.
