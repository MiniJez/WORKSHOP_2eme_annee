/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src/navigation'
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
};

export default App;
