import map from 'lodash/map';
import Context from '@src/common/context';
import Action from '@src/actions/Action';
import Fetch from '@src/actions/Fetch';
import Get from '@src/actions/Get';
import Create from '@src/actions/Create';
import Update from '@src/actions/Update';
import Delete from '@src/actions/Delete';

export default class VuexOrmAxios {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  constructor(components, options) {
    Context.setup(components, options);
    this.setupActions();
    this.setupModels();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
   */
  setupActions () {
    const context = Context.getInstance();

    context.components.Actions.$fetch = Fetch.call.bind(Fetch);
    context.components.Actions.$get = Get.call.bind(Get);
    context.components.Actions.$create = Create.call.bind(Create);
    context.components.Actions.$update = Update.call.bind(Update);
    context.components.Actions.$delete = Delete.call.bind(Delete);
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels () {
    const context = Context.getInstance();

    /**
     * Transform Model and Modules
     */
    map(context.database.entities, entity => {
      entity.module = Action.transformModule(entity.module);
      entity.model = Action.transformModel(entity.model);
      return entity;
    });

    context.components.Model.$fetch = function (config = {}) {
      return this.dispatch('$fetch', config);
    };

    context.components.Model.$get = function (config = {}) {
      return this.dispatch('$get', config);
    };

    context.components.Model.$create = function (config = {}) {
      return this.dispatch('$create', config);
    };

    context.components.Model.$update = function (config = {}) {
      return this.dispatch('$update', config);
    };

    context.components.Model.$delete = function (config = {}) {
      return this.dispatch('$delete', config);
    };
  }
}
