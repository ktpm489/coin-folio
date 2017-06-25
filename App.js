import React from 'react';
import AppComponent from './src/components/AppComponent';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)

export default App;
