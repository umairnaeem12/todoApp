import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/Navigation/StackNavigator';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <StackNavigator />
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({})