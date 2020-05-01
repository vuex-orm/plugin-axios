import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState, fillState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'

describe('Feature - Response - Persist By', () => {
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

  it('can persist using "create" method', async () => {
    mock.onGet('/api/users').reply(200, { id: 2, name: 'Jane Doe' })

    const store = createStore([User])

    fillState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    await User.api().get('/api/users', { persistBy: 'create' })

    assertState(store, {
      users: {
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })
  })

  it('can persist using "insert" method', async () => {
    mock.onGet('/api/users').reply(200, { id: 2, name: 'Jane Doe' })

    const store = createStore([User])

    fillState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    await User.api().get('/api/users', { persistBy: 'insert' })

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })
  })

  it('can persist using "update" method', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'Johnny Doe' })

    const store = createStore([User])

    fillState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    await User.api().get('/api/users', { persistBy: 'update' })

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'Johnny Doe' }
      }
    })
  })

  it('can persist using "insertOrUpdate" method', async () => {
    mock.onGet('/api/users').reply(200, [
      { id: 1, name: 'Johnny Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    fillState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    await User.api().get('/api/users', { persistBy: 'insertOrUpdate' })

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'Johnny Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })
  })

  it('warns the user of an invalid option value', async () => {
    const spy = jest.spyOn(console, 'warn')

    spy.mockImplementation((x) => x)

    createStore([User])

    mock.onGet('/api/users').reply(200, {})
    await User.api().get('/api/users', { persistBy: 'invalid' as any })

    expect(console.warn).toHaveBeenCalledTimes(1)

    spy.mockReset()
    spy.mockRestore()
  })
})
