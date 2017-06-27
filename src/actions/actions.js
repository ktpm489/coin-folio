import { SET_TARGET_CURRENCY, LOAD_GENERAL_DATA, ADD_OWNED_CURRENCY, REMOVE_OWNED_CURRENCY,
  LOAD_GENERAL_DATA_FAILURE, LOAD_GENERAL_DATA_SUCCESS, LOAD_DETAILED_DATA,
  LOAD_DETAILED_DATA_SUCCESS, LOAD_DETAILED_DATA_FAILURE } from '../constants';
import { values, map } from 'lodash';

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

export function loadGeneralDataSuccess(payload) {
  return {
    type: LOAD_GENERAL_DATA_SUCCESS,
    payload: values(payload.Data)
  }
}

export function loadGeneralDataFailure() {
  return {
    type: LOAD_GENERAL_DATA_FAILURE
  }
}

export function addOwnedCurrency(payload) {
  return {
    type: ADD_OWNED_CURRENCY,
    payload
  }
}

export function removeOwnedCurrency(payload) {
  return {
    type: REMOVE_OWNED_CURRENCY,
    payload
  }
}

export function loadDetailedData() {
  return {
    type: LOAD_DETAILED_DATA
  }
}

export function loadDetailedDataSuccess(payload) {
  return {
    type: LOAD_DETAILED_DATA_SUCCESS,
    payload
  }
}

export function loadDetailedDataFailure() {
  return {
    type: LOAD_DETAILED_DATA_FAILURE
  }
}

export function fetchDetailedData() {
  return (dispatch, getState) => {
    const state = getState().data;
    const currString = state.owned.map(obj => obj.currency).join(',');
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currString}&tsyms=${state.targetCurrency}`;

    dispatch(loadDetailedData())
    fetch(url)
      .then(res => res.json())
      .then(data => map(data, (val, key) => { return {from: key, to: val} }))
      .then(data => {
        dispatch(loadDetailedDataSuccess(data))
      })
      .catch(err => console.log({'err': err}))
  }
}
