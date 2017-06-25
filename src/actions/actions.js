import { SET_TARGET_CURRENCY } from '../constants'

export function setTargetCurrency(currencyShort) {
  return {
    type: SET_TARGET_CURRENCY,
		payload: currencyShort
  }
}
