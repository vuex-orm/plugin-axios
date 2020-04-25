import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexORM, { Database, Model } from '@vuex-orm/core'
import VuexORMAxios from '@/index'

Vue.use(Vuex)

interface Entities {
  [name: string]: {
    [id: string]: Record<string, any>
  }
}

export function createStore(models: typeof Model[]): Store<any> {
  VuexORM.use(VuexORMAxios, { axios })

  const database = new Database()

  models.forEach((model) => {
    database.register(model)
  })

  return new Store({
    plugins: [VuexORM.install(database)],
    strict: true
  })
}

export function createState(entities: Entities): any {
  return {
    $name: 'entities',

    ...Object.keys(entities).reduce((carry, name) => {
      const data = entities[name]

      carry[name] = {
        $connection: 'entities',
        $name: name,
        data
      }

      return carry
    }, {})
  }
}

export function assertState(store: Store<any>, entities: Entities): void {
  expect(store.state.entities).toEqual(createState(entities))
}
