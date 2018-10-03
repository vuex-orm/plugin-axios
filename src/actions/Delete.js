import Action from './Action'

export default class Delete extends Action {
  static call ({ state, dispatch }, params={}) {
    console.log(state, dispatch, params);
  }
}
