import { LOAD_DETAILED_DATA, LOAD_DETAILED_DATA_SUCCESS, LOAD_DETAILED_DATA_FAILURE } from '../constants';

const initialState = {
  loading: false,
  convertedPrices: [],
  error: false
}

export default function currencyReducer(state = initialState, action) {
	switch (action.type) {
    case LOAD_DETAILED_DATA:
      return {
        ...state,
        loading: true
      }
    case LOAD_DETAILED_DATA_SUCCESS:
      return {
        ...state,
        convertedPrices: action.payload,
        loading: false,
      }
    case LOAD_DETAILED_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}
