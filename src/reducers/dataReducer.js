import { SET_TARGET_CURRENCY, LOAD_GENERAL_DATA, ADD_OWNED_CURRENCY, REMOVE_OWNED_CURRENCY,
  LOAD_GENERAL_DATA_SUCCESS, LOAD_GENERAL_DATA_FAILURE } from '../constants';
import currencyList from '../currencyList';

const initialState = {
  loadingGeneralData: false,
  generalData: [],
  realCurrencyList: currencyList,
  owned: [],
  error: false,
	targetCurrency: 'PLN'
}

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
    case ADD_OWNED_CURRENCY:
      return {
        ...state,
        owned: [...state.owned, action.payload]
      }
    case REMOVE_OWNED_CURRENCY:
      return {
        ...state,
        owned: state.owned.filter((item, i) => i !== action.payload)
      }
    case SET_TARGET_CURRENCY:
      return {
        ...state,
        targetCurrency: action.payload
      }
    case LOAD_GENERAL_DATA:
      return {
        ...state,
        loadingGeneralData: true
      }
    case LOAD_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        generalData: action.payload,
        loadingGeneralData: false,
      }
    case LOAD_GENERAL_DATA_FAILURE:
      return {
        ...state,
        loadingGeneralData: false,
        error: true
      }
    default:
      return state
  }
}
