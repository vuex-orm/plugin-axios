# Installation

You can install Vuex ORM Axios via NPM, Yarn, or download it directly. This is a plugin for Vuex ORM, therefore you must ensure [Vuex ORM](https://vuex-orm.org/guide/prologue/installation) and [axios](https://github.com/axios/axios#installing) are installed.

## NPM

```bash
npm install @vuex-orm/plugin-axios --save
```

## Yarn

```bash
yarn add @vuex-orm/plugin-axios
```

## Direct Download / CDN

[](https://unpkg.com/@vuex-orm/plugin-axios)

[Unpkg.com](https://unpkg.com) provides NPM-based CDN links. Simply download and include with a script tag.

For development environments, testing and learning purposes, you can use the latest uncompressed version with:

```html
<script src="https://unpkg.com/@vuex-orm/plugin-axios"></script>
```

For production, it's recommended to link to a specific version number and build to avoid unexpected breakage from newer versions:

```html
<script src="https://unpkg.com/@vuex-orm/plugin-axios@0.9.2/dist/vuex-orm-axios.min.js"></script>

```

See [Release Notes](https://github.com/vuex-orm/plugin-axios/releases) for available versions.

If you are using native ES Modules, there is also an ESM compatible build:

```html
<script type="module">
  import VuexORMAxios from 'https://unpkg.com/@vuex-orm/plugin-axios/dist/vuex-orm-axios.esm.js'
</script>
```

### Build Variants

In the `dist/` directory of the NPM package you will find many different builds. Each of them have their use depending on your build environment and may help to reduce bundle sizes.

|                            | URL                                                                                                                  |
|----------------------------|:---------------------------------------------------------------------------------------------------------------------|
| Development (uncompressed) | [vuex-orm-axios.js](https://unpkg.com/@vuex-orm/plugin-axios)                                            |
| Production (compressed)    | [vuex-orm-axios.min.js](https://unpkg.com/@vuex-orm/plugin-axios/dist/vuex-orm-axios.min.js)       |
| CommonJS                   | [vuex-orm-axios.common.js](https://unpkg.com/@vuex-orm/plugin-axios/dist/vuex-orm-axios.common.js) |
| ES Module                  | [vuex-orm-axios.esm.js](https://unpkg.com/@vuex-orm/plugin-axios/dist/vuex-orm-axios.esm.js)       |

## Dev Build

The built files in `/dist` folder are only checked-in during releases. To use the latest source code on GitHub, you will have to run a build yourself.

```bash
# cd /path/to/project
git clone https://github.com/vuex-orm/plugin-axios.git node_modules/@vuex-orm/plugin-axios
cd node_modules/@vuex-orm/plugin-axios
yarn && yarn build
```
