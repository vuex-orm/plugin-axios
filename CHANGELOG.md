## [0.9.3](https://github.com/vuex-orm/plugin-axios/compare/v0.9.2...v0.9.3) (2020-05-07)


### Features

* add `persistOptions` to handle relation persistence ([#121](https://github.com/vuex-orm/plugin-axios/issues/121)) ([4345c98](https://github.com/vuex-orm/plugin-axios/commit/4345c98c3002c01924f2e0672d1874b7d746524a))
* add configurable `persistBy` option ([#119](https://github.com/vuex-orm/plugin-axios/issues/119)) ([2110528](https://github.com/vuex-orm/plugin-axios/commit/2110528c99e2b3171536f9ba2c5d4c4701a26bb0))



## [0.9.2](https://github.com/vuex-orm/plugin-axios/compare/v0.9.1...v0.9.2) (2019-11-25)


### Bug Fixes

* add Vuex ORM as a peer dependency ([e61be34](https://github.com/vuex-orm/plugin-axios/commit/e61be34a325ac826f7bdf286cbe403701f4514c6))


## [0.9.1](https://github.com/vuex-orm/plugin-axios/compare/v0.9.0...v0.9.1) (2019-11-18)


### Bug Fixes

* fix where `response.entities` is not immediately available after the request call ([#89](https://github.com/vuex-orm/plugin-axios/issues/89))

### Features

* warn users if the response data is non-array/object ([#82](https://github.com/vuex-orm/plugin-axios/issues/82))


# [0.9.0](https://github.com/vuex-orm/plugin-axios/compare/v0.8.0...v0.9.0) (2019-11-05)


### Features

* save response data after calling the API ([ba48434](https://github.com/vuex-orm/plugin-axios/commit/ba4843401eb7570007074266e4c5362930baf0c9))


# [0.8.0](https://github.com/vuex-orm/plugin-axios/compare/v0.7.0...v0.8.0) (2019-10-31)


### Features

* transform response data before persisting to the store. ([#80](https://github.com/vuex-orm/plugin-axios/pull/80))


# [0.7.0](https://github.com/vuex-orm/plugin-axios/compare/v0.5.1...v0.7.0) (2019-10-21)


### BREAKING CHANGES

* refactored entire plugin from the ground up. Please check out the [docs](https://vuex-orm.github.io/plugin-axios) for more details. ([341d395](https://github.com/vuex-orm/plugin-axios/commit/341d395133073b06e36e8f1d4f957003f2c68aa1))


## [0.5.1](https://github.com/vuex-orm/plugin-axios/compare/0.5.0...v0.5.1) (2019-07-08)


### Bug Fixes

* improper use of asynchronous method ([#34](https://github.com/vuex-orm/plugin-axios/issues/34))
* axios request interceptor + fixed `setAuthentication` error on string ([#45](https://github.com/vuex-orm/plugin-axios/pull/45))


# [0.5.0](https://github.com/vuex-orm/plugin-axios/compare/0.4.0...0.5.0) (2019-03-15)


### Bug Fixes

* reduce `lodash` imports ([#16](https://github.com/vuex-orm/plugin-axios/issues/16))
* allow axios instance to be passed into plugin ([#18](https://github.com/vuex-orm/plugin-axios/issues/18))
* expose axios instance to interceptors to allow for custom response handling with tokens ([#7](https://github.com/vuex-orm/plugin-axios/issues/7))

# [0.4.0](https://github.com/vuex-orm/plugin-axios/compare/0.3.0...0.4.0) (2019-03-15)


### Bug Fixes

* fixed custom http method ([b3ce9b4](https://github.com/vuex-orm/plugin-axios/commit/b3ce9b45f534c191140a2770334b74b7de4eaf4e))


# [0.3.0](https://github.com/vuex-orm/plugin-axios/compare/0.2.2...0.3.0) (2019-03-15)


### Bug Fixes

* uncaught exception on network error ([7a28af7](https://github.com/vuex-orm/plugin-axios/commit/7a28af7c0324221e262dd71826e86e7a9473439c))


### Features

* allow get access token as function ([a100695](https://github.com/vuex-orm/plugin-axios/commit/a100695244351bdce3cdba104b2633696c51c73e))


## [0.2.2](https://github.com/vuex-orm/plugin-axios/compare/0.2.1...0.2.2) (2018-10-12)


### Bug Fixes

* fixed params which are not set ([9d33522](https://github.com/vuex-orm/plugin-axios/commit/9d33522a0510ef219b997ba46a042d4369c353b8))


## [0.2.1](https://github.com/vuex-orm/plugin-axios/compare/0.2.0...0.2.1) (2018-10-12)


### Bug Fixes

* fixed bug with automatic config params not being overwritten with a value (:id) ([590b4b6](https://github.com/vuex-orm/plugin-axios/commit/590b4b61306b5ee98f588856deb4d3bf0fc6b9bb))


# [0.2.0](https://github.com/vuex-orm/plugin-axios/compare/0.1.2...0.2.0) (2018-10-12)


### Features

* added endpoint param extractor ([709f56f](https://github.com/vuex-orm/plugin-axios/commit/709f56f585b967f1a4f8f2663b5652b67bbfe92e))


## [0.1.2](https://github.com/vuex-orm/plugin-axios/compare/0.1.1...0.1.2) (2018-10-11)


### Bug Fixes

* fixed issue with SSR on Nuxt ([#5](https://github.com/vuex-orm/plugin-axios/issues/5))


## [0.1.1](https://github.com/vuex-orm/plugin-axios/compare/0.1.0...0.1.1) (2018-10-08)


### Bug Fixes

* fixed issue where vue-cli projects could not use async/await functions ([beb2894](https://github.com/vuex-orm/plugin-axios/commit/beb2894ae25eba717ef8eecf0d5188de1067bad0))


# 0.1.0 (2018-10-04)


Initial release 🎉 

