import axios from 'axios'
import VuexORM, { Model } from '@vuex-orm/core'
import VuexORMAxios from '@/index'

describe('Feature - Vuex ORM Axios', () => {
  it('registeres axios instance by passing to plugin install option', () => {
    VuexORM.use(VuexORMAxios, { axios })

    expect(Model.axios).toBe(axios)
  })

  it('can register axios instance directly to the model', () => {
    VuexORM.use(VuexORMAxios)

    Model.setAxios(axios)

    expect(Model.axios).toBe(axios)
  })

  it('throws when calling api request without registering the axios', () => {
    VuexORM.use(VuexORMAxios)

    // tslint:disable-next-line
    expect(() => { Model.api().axios }).toThrowError('Vuex ORM Axios')
  })
})
