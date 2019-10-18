import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, createState } from 'test/support/Helpers'
import { Model, Fields } from '@vuex-orm/core'

describe('Feature - Request - Fetch', () => {
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

  it('can perform a get request', async () => {
    mock.onGet('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().fetch('/api/users')

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John Doe' },
        2: { $id: 2, id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can perform a get request with params', async () => {
    mock.onGet('/api/users', {
      params: { search: 'John' }
    }).reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().fetch('/api/users', { search: 'John' })

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John Doe' },
        2: { $id: 2, id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can perform a get request with config', async () => {
    mock.onGet('/api/users', {
      params: { search: 'John' }
    }).reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().fetch('/api/users', { search: 'John' }, { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: 1, id: 1, name: 'John Doe' },
        2: { $id: 2, id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })
})
