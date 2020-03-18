import React from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";

// ログイン判定
export default class SignInScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SignInScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
