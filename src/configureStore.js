import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';

export default function configureStore() {
	let store = createStore(
    rootReducer,
    applyMiddleware(logger)
  );

	return store;
}
