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

  it('warns the user if the response data cannot be inserted', async () => {
    const spy = jest.spyOn(console, 'warn')

    spy.mockImplementation((x) => x)

    createStore([User])

    mock.onGet('/api/users').reply(200, null)
    await User.api().get('/api/users')

    mock.onGet('/api/users').reply(200, 1)
    await User.api().get('/api/users')

    expect(console.warn).toHaveBeenCalledTimes(2)

    spy.mockReset()
    spy.mockRestore()
  })

  it('can save response data manually', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    const store = createStore([User])

    const response = await User.api().get('/api/users', { save: false })

    assertState(store, { users: {} })

    await response.save()

    assertState(store, {
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })
  })

  it('sets `isSaved` flag', async () => {
    mock.onGet('/api/users').reply(200, { id: 1, name: 'John Doe' })

    createStore([User])

    const response = await User.api().get('/api/users', { save: false })

    expect(response.isSaved).toBe(false)

    await response.save()

    expect(response.isSaved).toBe(true)
  })
})
