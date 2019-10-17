# Setup

This page is a quick start guide to begin using Vuex ORM. It assumes you have a basic understanding of Vuex ORM. If you are not familiar with Vuex ORM, please check out the [Vuex ORM Documentation](https://vuex-orm.github.io/vuex-orm/).

At first, Vuex ORM Axios requires manually passing Axios instance during the installation process. Please make sure you have axios installed to your app.

To install Vuex ORM Axios to Vuex ORM, pass Vuex ORM Axios to the `VuexORM.use` method. Here, you should pass your axios instance as an option.

```js
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios, { axios })
```

Here is a more realistic example that shows how to install Vuex ORM to Vuex along with Vex ORM Axios.

```js
import axios from 'axios'
import Veux from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import User from '@/models/User'

VuexORM.use(VuexORMAxios, { axios })

const database = new VuexORM.Database()

database.register(User)

const store = new Vuex({
  Plugins: [VuexORM.install(database)]
})
```

## Nuxt.js Integration

When using Vuex ORM Axios with Nuxt.js Axios Module, you can’t pass Axios instance directly from `store/index.js` file. Hence you must create a Nuxt.js plugin. Let's work through the process of setting up Vuex ORM Axios with Nuxt.js.

First, leave `axios` option empty at the plugin installation part.

```js
// store/index.js

import Veux from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import User from '@/models/User'

VuexORM.use(VuexORMAxios) // <- No axios option.

const database = new VuexORM.Database()

database.register(User)

const plugins = [VuexORM.install(database)]
```

Next, create a plugin to set Axios instance to Vuex ORM Model directly.

```js
// plugins/vuex-orm-axios.js

import { Model } from '@vuex-orm/core'

export default ({ $axios }) => {
  Model.setAxios($axios)
}
```

Finally, don’t forget to register the plugin to `nuxt.config.js`.

```js
// nuxt.config.js

export default {
  // …

  modules: ['@nuxtjs/axios'],

  plugins: ['@/plugins/vuex-orm-axios']
}
```
