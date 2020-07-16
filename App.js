/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import Apps from './src';
import store from './src/store';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <Apps />
    </Provider>
  );
}
