import React from 'react';
import { AppContainer } from "./src/routes";
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  componentDidMount(){
    console.log("App")
  }
  render() {
    return (
      <AppContainer
      />
    );
  }
}

