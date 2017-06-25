import { SET_TARGET_CURRENCY, LOAD_GENERAL_DATA,
  LOAD_GENERAL_DATA_FAILURE, LOAD_GENERAL_DATA_SUCCESS } from '../constants';
import { values } from 'lodash';

export function setTargetCurrency(currencyShort) {
  return {
    type: SET_TARGET_CURRENCY,
		payload: currencyShort
  }
}

export function loadGeneralData() {
  return {
    type: LOAD_GENERAL_DATA
  }
}

export function loadGeneralDataSuccess(data) {
  return {
    type: LOAD_GENERAL_DATA_SUCCESS,
    payload: values(data.Data)
  }
}

export function loadGeneralDataFailure() {
  return {
    type: LOAD_GENERAL_DATA_FAILURE
  }
}
