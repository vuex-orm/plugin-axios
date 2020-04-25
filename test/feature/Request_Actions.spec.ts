import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'
import { Request, Response } from '@/index'

describe('Feature - Request - Actions', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })
  afterEach(() => {
    mock.reset()
  })

  it('can define a custom action', async () => {
    class User extends Model {
      static entity = 'users'

      static fields() {
        return {
          id: this.attr(null),
          name: this.attr('')
        }
      }

      static apiConfig = {
        actions: {
          fetch: { method: 'get', url: '/users' }
        }
      }
    }

    mock.onGet('/users').reply(200, { id: 1, name: 'John' })

    const store = createStore([User])

    await User.api().fetch()

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John' }
      }
    })
  })

  it('can define a custom action as a function', async () => {
    class User extends Model {
      static entity = 'users'

      static fields() {
        return {
          id: this.attr(null),
          name: this.attr('')
        }
      }

      static apiConfig = {
        actions: {
          fetch(this: Request, url: string): Promise<Response> {
            return this.get(url)
          }
        }
      }
    }

    mock.onGet('/users').reply(200, { id: 1, name: 'John' })

    const store = createStore([User])

    await User.api().fetch('/users')

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John' }
      }
    })
  })
})
