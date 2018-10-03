import Action from './Action'
import Context from '../common/context'

export default class Fetch extends Action {
  static async call ({ state }, params = {}) {
    const context = Context.getInstance();
    const model = context.getModelFromState(state);
    const endpoint = Action.transformParams('$fetch', model, params);
  }
}
