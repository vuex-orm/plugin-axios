import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'

describe('Feature - Request - Data Key', () => {
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

  it('can specify which resource key to extract data from', async () => {
    mock.onGet('/users').reply(200, {
      data: { id: 1, name: 'John Doe' }
    })

    const store = createStore([User])

    await User.api().request({
      url: '/users',
      dataKey: 'data'
    })

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })
  })
})
