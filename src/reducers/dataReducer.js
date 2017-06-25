import { SET_TARGET_CURRENCY } from '../constants';

const initialState = {
	targetCurrency: 'PLN'
}

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
    case SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload
      }
    default:
      return state
  }
}
