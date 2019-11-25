import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, createState } from 'test/support/Helpers'
import { Model, Fields } from '@vuex-orm/core'

describe('Feature - Request', () => {
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

  it('`get` can perform a get request', async () => {
    mock.onGet('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().get('/api/users')

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`get` can perform a get request with additional config', async () => {
    mock.onGet('/api/users').reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().get('/api/users', { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`post` can perform a post request', async () => {
    mock.onPost('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().post('/api/users')

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`post` can perform a post request with additional config', async () => {
    mock.onPost('/api/users').reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().post('/api/users', {}, { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`put` can perform a put request', async () => {
    mock.onPut('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().put('/api/users')

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`put` can perform a put request with additional config', async () => {
    mock.onPut('/api/users').reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().put('/api/users', {}, { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`patch` can perform a patch request', async () => {
    mock.onPatch('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().patch('/api/users')

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`patch` can perform a patch request with additional config', async () => {
    mock.onPatch('/api/users').reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().patch('/api/users', {}, { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`delete` can perform a delete request', async () => {
    mock.onDelete('/api/users').reply(200, [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const store = createStore([User])

    await User.api().delete('/api/users')

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('`delete` can perform a delete request with additional config', async () => {
    mock.onDelete('/api/users').reply(200, {
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const store = createStore([User])

    await User.api().delete('/api/users', { dataKey: 'data' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })
})
