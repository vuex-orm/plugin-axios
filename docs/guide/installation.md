# Installation

You can install Vuex ORM Axios via NPM, Yarn, or download it directly. Remember since Vuex ORM Axios is a plugin of [Vuex ORM](https://github.com/vuex-orm/vuex-orm), you need to install Vuex ORM and Vuex alongside with Vuex ORM Axios.

## NPM

```console
$ npm install vue vuex @vuex-orm/core @vuex-orm/plugin-axios --save
```

## Yarn

```console
$ yarn add vue vuex @vuex-orm/core @vuex-orm/plugin-axios
```

## Direct Download / CDN

[https://unpkg.com/@vuex-orm/plugin-axios](https://unpkg.com/@vuex-orm/plugin-axios)

[Unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link always points to the latest release on NPM. You can also use a specific version/tag via URLs like `https://unpkg.com/@vuex-orm/plugin-axios`.

Include Vuex ORM Axios from an HTML script.

```html
<script src="https://unpkg.com/@vuex-orm/plugin-axios"></script>

<!-- For the minified version -->
<script src="https://unpkg.com/@vuex-orm/plugin-axios/dist/vuex-orm.min.js"></script>
```

## Dev Build

You have to clone directly from GitHub and build vuex yourself if you want to use the latest dev build.

```console
$ git clone https://github.com/vuex-orm/plugin-axios.git node_modules/@vuex-orm/plugin-axios
$ cd node_modules/@vuex-orm/plugin-axios
$ npm install
$ npm run build
```
