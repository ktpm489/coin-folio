import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import currencyReducer from './currencyReducer';

const rootReducer = combineReducers({
	data: dataReducer,
  currencies: currencyReducer
})

export default rootReducer;
