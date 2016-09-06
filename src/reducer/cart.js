import {handleActions} from 'redux-actions';
import {CLEAR_ITEMS, ADD_ITEM, REMOVE_ITEM, SET_QUANTITY} from 'action/types';
import map from 'lodash/fp/map';

function itemHasId(item) {
    return item.id == this;
}

const checkIfItemIsInCart = (items, id) => items.findIndex(itemHasId, id) >= 0 ?  items :[ ...items, { id, quantity: 1 } ]

export default handleActions({
  [CLEAR_ITEMS]: () => ({
    items: [],
  }),
  [ADD_ITEM]: (state, {payload: id}) => ({
    items: checkIfItemIsInCart(state.items, id)
  }),
  [REMOVE_ITEM]: (state, {payload: id}) => ({
    items: state.items.filter(item => item.id !== id)
  }),
  [SET_QUANTITY]: (state, {payload: {id: target, quantity}}) => ({
    ...state,
    items: map(({id, ...rest}) => (
      target === id ? {id, ...rest, quantity} : {id, ...rest}
    ), state.items),
  }),
}, {
  items: [],
});
