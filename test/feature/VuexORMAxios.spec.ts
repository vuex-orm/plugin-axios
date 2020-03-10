import axios from 'axios'
import VuexORM, { Model } from '@vuex-orm/core'
import VuexORMAxios from '@/index'

describe('Feature - Vuex ORM Axios', () => {
  it('can register an axios instance as plugin install argument', () => {
    VuexORM.use(VuexORMAxios, { axios })

    expect(Model.axios).toBe(axios)
  })

  it('can register axios instance directly on a model', () => {
    VuexORM.use(VuexORMAxios)

    Model.setAxios(axios)

    expect(Model.axios).toBe(axios)
  })

  it('throws when calling api request without registering the axios', () => {
    VuexORM.use(VuexORMAxios)

    const shouldThrow = () => {
      Model.api().axios
    }

    expect(shouldThrow).toThrowError('Vuex ORM Axios')
  })
})
