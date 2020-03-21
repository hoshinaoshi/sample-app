import React from "react";
import * as Device from "expo-device";
import {
  ActivityIndicator,
  Alert,
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import * as signUpScreenModule from "@modules/SignUpScreen";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    signUp: state.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputPassword: (value) => dispatch(signUpScreenModule.inputPassword(value)),
    inputEmail: (value) => dispatch(signUpScreenModule.inputEmail(value)),
    singUp: (email, password, token, os) => dispatch(signUpScreenModule.singUp({email, password, token, os})),
    toggleSignUpButton: (value) => dispatch(signUpScreenModule.toggleSignUpButton(value)),
  }
}

// ログイン判定
class SignUpScreen extends React.Component {
  _onPressSignUp(){
    let os = "";
    let token = ""; //Todo
    if(Device.isDevice){
      os = Device.osName
    }
    this.props.singUp(
      this.props.signUp.email,
      this.props.signUp.password,
      "",
      os,
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>SignUpScreen</Text>
        <TextInput
          style={{borderWidth: 1, borderColor: "black", width: 300}}
          placeholder={"email"}
          onChangeText={text => this.props.inputEmail(text)}
          value={this.props.signUp.email}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={"password"}
          style={{borderWidth: 1, borderColor: "black", width: 300}}
          onChangeText={text => this.props.inputPassword(text)}
          value={this.props.signUp.password}
        />
        <Button
          title="ログイン"
          onPress={() => this._onPressSignUp()}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
