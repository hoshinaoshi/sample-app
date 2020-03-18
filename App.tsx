import React from 'react';
import { AppContainer } from "./src/routes";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

const store = configureStore();

export default class App extends React.Component {
  componentDidMount(){
    console.log("App")
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

