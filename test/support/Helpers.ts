import axios from 'axios'
import Vue from 'vue'
import * as Vuex from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
import VuexORMAxios from '@/index'

Vue.use(Vuex)

export function createStore(models: typeof Model[]): Vuex.Store<any> {
  VuexORM.use(VuexORMAxios, { axios })

  const database = new Database()

  models.forEach((model) => database.register(model))

  return new Vuex.Store({
    plugins: [VuexORM.install(database)]
  })
}

export function createState(state: any): any {
  return {
    $name: 'entities',

    ...Object.keys(state).reduce((carry, name) => {
      const data = state[name]

      carry[name] = {
        $connection: 'entities',
        $name: name,
        data
      }

      return carry
    }, {})
  }
}

export default { createStore }
