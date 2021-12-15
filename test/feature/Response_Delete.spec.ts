import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'

describe('Feature - Response - Save', () => {
  let mock: MockAdapter

  class User extends Model {
    static entity = 'users'

    static fields() {
      return {
        id: this.attr(null),
        name: this.attr('')
      }
    }
  }

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })
  afterEach(() => {
    mock.reset()
  })

  it('can save response data manually', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    const store = createStore([User])

    const response = await User.api().get('/api/users')

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    response.config.delete = 1

    await response.delete()

    assertState(store, { users: {} })
  })

  it('throws error if `delete` option is not set', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    createStore([User])

    const response = await User.api().get('/api/users')

    try {
      await response.delete()
    } catch (e: any) {
      expect(e.message).toBe(
        '[Vuex ORM Axios] Could not delete records because the `delete` option is not set.'
      )

      return
    }

    throw new Error('Error was not thrown')
  })
})
