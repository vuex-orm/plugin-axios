# Setup

The Axios plugin can be installed with Vuex ORM using the `VuexORM.use` plugin install method.

An instance of axios must be configured during installation for the plugin to work.

```js
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios, { axios })
```

You may also configure additional options during installation. See all available [Configurations](./configurations.md).

### Example

Here is an example that demonstrates a typical setup of Vuex ORM together with the plugin.


```js
import axios from 'axios'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import User from '@/models/User'

VuexORM.use(VuexORMAxios, { axios })

const database = new VuexORM.Database()

database.register(User)

const store = new Vuex({
  plugins: [VuexORM.install(database)]
})
```

## Nuxt Integration

Configuring the plugin with [Nuxt.js](https://nuxtjs.org/) requires the [Axios Module](https://axios.nuxtjs.org/) to be installed. The plugin also does not require an axios instance to be configured during plugin installation. Instead, you must register axios by creating a plugin.

First, leave `axios` option empty during plugin installation.

```js
// store/index.js

import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import User from '@/models/User'

VuexORM.use(VuexORMAxios) // <- No axios option.

const database = new VuexORM.Database()

database.register(User)

export const plugins = [VuexORM.install(database)]
```

Next, create a plugin where you must configure the axios instance on models globally.

```js
// plugins/vuex-orm-axios.js

import { Model } from '@vuex-orm/core'

export default ({ $axios }) => {
  Model.setAxios($axios)
}
```

Finally, register the plugin you just created in your `nuxt.config.js` file.

```js
// nuxt.config.js

export default {
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/vuex-orm-axios']
}
```
