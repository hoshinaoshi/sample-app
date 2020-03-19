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
    inputEmail: (value) => dispatch(signInScreenModule.inputEmail(value)),
    singIn: (email, password, token, os) => dispatch(signInScreenModule.singIn({email, password, token, os})),
    toggleSignInButton: (value) => dispatch(signInScreenModule.toggleSignInButton(value)),
  }
}

// ログイン判定
class SignInScreen extends React.Component {
  _onPressSignIn(){
    let os = "";
    let token = ""; //Todo
    if(Device.isDevice){
      os = Device.osName
    }
    this.props.singIn(
      this.props.signIn.email,
      this.props.signIn.password,
      "",
      os,
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>SignInScreen</Text>
        <TextInput
          style={{borderWidth: 1, borderColor: "black", width: 300}}
          placeholder={"email"}
          onChangeText={text => this.props.inputEmail(text)}
          value={this.props.signIn.email}
        />
        <TextInput
          secureTextEntry={true}
          placeholder={"password"}
          style={{borderWidth: 1, borderColor: "black", width: 300}}
          onChangeText={text => this.props.inputPassword(text)}
          value={this.props.signIn.password}
        />
        <Button
          title="ログイン"
          onPress={() => this._onPressSignIn()}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
