<p align="center">
  <img width="192" src="https://github.com/vuex-orm/plugin-axios/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex Orm Plugin: Axios</h1>

<p align="center">
  <a href="https://travis-ci.org/vuex-orm/plugin-axios">
    <img src="https://travis-ci.org/vuex-orm/plugin-axios.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://codecov.io/gh/vuex-orm/plugin-axios">
    <img src="https://codecov.io/gh/vuex-orm/plugin-axios/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide">
  </a>
  <a href="https://github.com/vuex-orm/plugin-axios/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@vuex-orm/plugin-axios.svg" alt="License">
  </a>
</p>

Vuex ORM Axios plugin adds the smooth integration between API request call and Vuex ORM persistent through awesome [Axios](https://github.com/axios/axios).

```js
User.api().get('/api/users')
```

## Sponsors

Vuex ORM is sponsored by awesome folks. Big love to all of them from whole Vuex ORM community :two_hearts:

### Super Love Sponsors

<a href="https://github.com/petertoth">
  <img src="https://avatars2.githubusercontent.com/u/3661783?s=400&v=4" alt="Peter Tóth" width="96">
</a>
<a href="https://github.com/phaust">
  <img src="https://avatars1.githubusercontent.com/u/2367770?s=400&v=4" alt="Mario Kolli" width="96">
</a>
<a href="https://github.com/cannikan">
  <img src="https://avatars2.githubusercontent.com/u/21893904?s=460&v=4" alt="Cannikan" width="96">
</a>

#### A Love Sponsors

<a href="https://github.com/georgechaduneli">
  <img src="https://avatars1.githubusercontent.com/u/9340753?s=460&v=4" alt="George Chaduneli" width="64">
</a>

## Documentation

Coming soon...

## Questions & Discussions

Join us on our [Slack Channel](https://join.slack.com/t/vuex-orm/shared_invite/enQtNDQ0NjE3NTgyOTY2LTc1YTI2N2FjMGRlNGNmMzBkMGZlMmYxOTgzYzkzZDM2OTQ3OGExZDRkN2FmMGQ1MGJlOWM1NjU0MmRiN2VhYzQ) for any questions and discussions.

Although there is the Slack Channel, do not hesitate to open an [issue](https://github.com/vuex-orm/vuex-orm/issues) for any question you might have. We're always more than happy to hear any feedback, and we don't care what kind of form they are.

## Plugins

Vuex ORM can be extended via a plugin to add additional features. Here is the list of available plugins.

- [Vuex ORM GraphQL](https://github.com/vuex-orm/plugin-graphql) – The plugin to sync the store against a [GraphQL](https://graphql.org) API.
- [Vuex ORM Search](https://github.com/vuex-orm/plugin-search) – The plugin adds a search() method to filter records using fuzzy search logic from the [Fuse.js](http://fusejs.io).
- [Vuex ORM Change Flags](https://github.com/vuex-orm/plugin-change-flags) - Vuex ORM plugin for adding IsDirty / IsNew flags to model entities.
- [Vuex ORM Soft Delete](https://github.com/vuex-orm/plugin-soft-delete) – Vuex ORM plugin for adding soft delete feature to model entities.

## Contribution

We are excited that you are interested in contributing to Vuex ORM Axios! Anything from raising an issue, submitting an idea of a new feature, or making a pull request is welcome!

### Development

```bash
$ yarn build
```

Compile files and generate bundles in `dist` directory.

```bash
$ yarn lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn test
```

Run the test using [Jest](https://jestjs.io/).

```bash
$ yarn test:watch
```

Run the test in watch mode.

```bash
$ yarn coverage
```

Generate test coverage in `coverage` directory.

## License

The Vuex ORM Plugin Axios is open-sourced software licensed under the [MIT license](LICENSE.md).
