import Action from './Action'

export default class Update extends Action {
  static call ({ state, dispatch }, params={}) {
    console.log(state, dispatch, params);
  }
}
