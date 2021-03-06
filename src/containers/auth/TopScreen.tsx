import React from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";

// ログイン判定
export default class TopScreen extends React.Component {
  componentDidMount(){
    console.log("Top")
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Top</Text>
        <Text onPress={() => this.props.navigation.navigate("SignIn")}>SignIn</Text>
        <Text onPress={() => this.props.navigation.navigate("SignUp")}>SignUp</Text>
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
