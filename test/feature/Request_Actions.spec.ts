import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, createState } from 'test/support/Helpers'
import { Model, Fields } from '@vuex-orm/core'
import Request from '@/api/Request'
import Response from '@/api/Response'

describe('Feature - Request - Actions', () => {
  let mock: MockAdapter

  beforeEach(() => { mock = new MockAdapter(axios) })
  afterEach(() => { mock.reset() })

  it('can define a custom action', async () => {
    class User extends Model {
      static entity = 'users'

      static fields (): Fields {
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

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can define a custom action as a function', async () => {
    class User extends Model {
      static entity = 'users'

      static fields (): Fields {
        return {
          id: this.attr(null),
          name: this.attr('')
        }
      }

      static apiConfig = {
        actions: {
          fetch (this: Request, url: string): Promise<Response> {
            return this.get(url)
          }
        }
      }
    }

    mock.onGet('/users').reply(200, { id: 1, name: 'John' })

    const store = createStore([User])

    await User.api().fetch('/users')

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })
})
