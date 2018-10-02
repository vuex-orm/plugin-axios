import VuexOrmAxios from './vuex-orm-axios';

export default class VuexOrmAxiosPlugin {
  /**
   * This is called, when VuexORM.install(VuexOrmAxios, options) is called.
   *
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   * @returns {VuexOrmAxios}
   */
  static install(components, options) {
    return new VuexOrmAxios(components, options);
  }
}
