---
sidebarDepth: 2
---

# Model

Vuex ORM Axios adds a few properties and methods to the Model object.

## Static Properties

### axios

- **`static axios: AxiosInstance | null`**

  The axios isntance which was installed during the plugin installation process. Vuex ORM Axios adds a few properties and methods to the Model object. Vuex ORM Axios will use this Axios instance to perform any HTTP request.

  Usually, this property will not become `null`. However, there's a case where you may need to add Axios instance manually, for example, when using Vuex ORM Axios with Nuxt.js. Int hat case, this property will temporary be `null`.

### globalApiConfig

- **`globalApiConfig: GlobalConfig`**

  The property that holds global configuration. The value will be set automatically during the plugin installation process. **Do not mutate this property manually**.

- **`apiConfig: Config | null`**

  The property that defines the Model configuration for the API call.

## Static Methods

### setAxios

- **`static setAxios(axios: AxiosInstance): void`**

  The method to set the Axios instance manually. Usually, you don't have to call this method yourself. However, you might need to use this method to set Axios instance properly in some situations. Please [refer here](../guide/getting-started.html#nuxt-js-integration) for more detail.

### api

- **`static api(): Request`**

  This method is going to return a new Request instance. Request instance is the wrapper for Axios, and it's used to perform any API request.

  ```js
  User.api().get('/api/users')
  ```
