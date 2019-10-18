import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, createState } from 'test/support/Helpers'
import { Model, Fields } from '@vuex-orm/core'

describe('Feature - Request - Data Key', () => {
  let mock: MockAdapter

  class User extends Model {
    static entity = 'users'

    static fields (): Fields {
      return {
        id: this.attr(null),
        name: this.attr('')
      }
    }
  }

  beforeEach(() => { mock = new MockAdapter(axios) })
  afterEach(() => { mock.reset() })

  it('can specify which key to llok for the data', async () => {
    mock.onGet('/users').reply(200, {
      data: { id: 1, name: 'John Doe' }
    })

    const store = createStore([User])

    await User.api().request({
      url: '/users',
      dataKey: 'data'
    })

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })
})
