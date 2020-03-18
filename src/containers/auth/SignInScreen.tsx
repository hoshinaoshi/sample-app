import React from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";
import * as signInScreenModule from "@modules/SignInScreen";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    signIn: state.signIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputPassword: (value) => dispatch(signInScreenModule.inputPassword(value)),
    inputUserName: (value) => dispatch(signInScreenModule.inputUserName(value)),
    singIn: (userName, password, token, os) => dispatch(signInScreenModule.singIn({userName, password, token, os})),
    screenTransition: () => dispatch(signInScreenModule.screenTransition()),
    fbAuth: (token, exponentPushToken, os) => dispatch(signInScreenModule.fbAuth({token, exponentPushToken, os})),
    toggleSignInButton: (value) => dispatch(signInScreenModule.toggleSignInButton(value)),
  }
}

// ログイン判定
class SignInScreen extends React.Component {
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
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
