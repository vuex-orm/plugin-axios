import Action from './Action'

export default class Get extends Action {
  static call ({ state, dispatch }, params={}) {
    console.log(state, dispatch, params);
  }
}
