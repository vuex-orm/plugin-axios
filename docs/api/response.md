---
sidebarDepth: 2
---

# Response

The Response object is what gets returned when you make API call via Request object.

## Instance Properties

### response

- **`response: AxiosResponse`**

  Please refer to the [Axios documentation](https://github.com/axios/axios#response-schema) for more details.

### entities

- **`entities: Collections | null`**

  The result of Vuex ORM persistent method.

### model

- **`model: typeof Model`**

  The Model class that was attached to the Request instance when making an API call.

### config

- **`config: Config`**

  The configuration which was passed to the Request instance.

## Instance Methods

### save

- **`save (): Promise<void>`**

  Save response data to the store.

### delete

- **`delete (): Promise<void>`**

  Delete store record depending on `delete` option. If the `delete` option is not specified at the config, it will throw an error.
