import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'

describe('Feature - Request - Save', () => {
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

  it('can prevent persisting response data to the store', async () => {
    mock.onGet('/users').reply(200, {
      data: { id: 1, name: 'John Doe' }
    })

    const store = createStore([User])

    const result = await User.api().request({
      url: '/users',
      save: false
    })

    expect(result.entities).toBe(null)

    assertState(store, { users: {} })
  })
})
