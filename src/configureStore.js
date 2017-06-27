import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { AsyncStorage } from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore() {
  const store = compose(autoRehydrate())(createStore)(rootReducer, applyMiddleware(thunk, logger));

  persistStore(store, {storage: AsyncStorage}, () => console.log('restored'));

	return store;
}
