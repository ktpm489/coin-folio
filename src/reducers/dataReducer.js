import { SET_TARGET_CURRENCY, LOAD_GENERAL_DATA, LOAD_GENERAL_DATA_SUCCESS, LOAD_GENERAL_DATA_FAILURE } from '../constants';

const initialState = {
  loadingGeneralData: false,
  generalData: [],
  error: false,
	targetCurrency: 'PLN'
}

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
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
