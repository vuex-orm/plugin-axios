import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createStore, assertState, fillState } from 'test/support/Helpers'
import { Model } from '@vuex-orm/core'

describe('Feature - Response - Persist Options', () => {
  let mock: MockAdapter

  class Post extends Model {
    static entity = 'posts'

    static fields() {
      return {
        id: this.attr(null),
        user: this.hasOne(User, 'post_id'),
        comments: this.hasMany(Comment, 'post_id')
      }
    }
  }

  class User extends Model {
    static entity = 'users'

    static fields() {
      return {
        id: this.attr(null),
        post_id: this.attr(null),
        name: this.string('')
      }
    }
  }

  class Comment extends Model {
    static entity = 'comments'

    static fields() {
      return {
        id: this.attr(null),
        post_id: this.attr(null)
      }
    }
  }

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })
  afterEach(() => {
    mock.reset()
  })

  it('should support persist options for relations', async () => {
    mock.onGet('/api/posts').reply(200, {
      id: 1,
      user: {
        id: 1,
        name: 'Johnny Doe'
      },
      comments: [{ id: 2 }]
    })

    const store = createStore([User, Post, Comment])

    fillState(store, {
      posts: {
        1: { $id: '1', id: 1, user: null, comments: [] }
      },
      users: {
        1: { $id: '1', id: 1, post_id: 1, name: 'John Doe' }
      },
      comments: {
        1: { $id: '1', id: 1, post_id: 1 }
      }
    })

    await Post.api().get('/api/posts', {
      persistOptions: {
        insert: ['comments'],
        update: ['users']
      }
    })

    assertState(store, {
      posts: {
        1: { $id: '1', id: 1, user: null, comments: [] }
      },
      users: {
        1: { $id: '1', id: 1, post_id: 1, name: 'Johnny Doe' }
      },
      comments: {
        1: { $id: '1', id: 1, post_id: 1 },
        2: { $id: '2', id: 2, post_id: 1 }
      }
    })
  })
})
