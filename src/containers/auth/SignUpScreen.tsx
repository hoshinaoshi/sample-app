import React from "react";
import * as Device from "expo-device";
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import * as signUpScreenModule from "@modules/SignUpScreen";
import { connect } from "react-redux";

const { width, height } = Dimensions.get('window')

const mapStateToProps = (state) => {
  return {
    signUp: state.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputPassword: (value) => dispatch(signUpScreenModule.inputPassword(value)),
    inputEmail: (value) => dispatch(signUpScreenModule.inputEmail(value)),
    selectBirthday: (value) => dispatch(signUpScreenModule.selectBirthday(value)),
    selectSex: (value) => dispatch(signUpScreenModule.selectSex(value)),
    inputNickname: (value) => dispatch(signUpScreenModule.inputNickname(value)),
    selectResidence: (value) => dispatch(signUpScreenModule.selectResidence(value)),
    selectPurpose: (value) => dispatch(signUpScreenModule.selectPurpose(value)),
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
      <ScrollView pagingEnabled={true} horizontal={true} ref={(snapScroll) => { this.snapScroll = snapScroll; }}>
        
        <View style={styles.slide}>
          <Text style={styles.text}>First</Text>
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
          <DatePicker
            style={{width: 200}}
            date={this.props.signUp.birthday}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="決定"
            cancelBtnText="閉じる"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
              },
                dateInput: {
                  marginLeft: 36
                }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => this.props.selectBirthday(date)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectSex(value)}
            items={[
              { label: "男性", value: 1 },
              { label: "女性", value: 2 },
              { label: "その他", value: 9 },
              { label: "回答しない", value: 0 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: this.props.signUp.sex }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <TextInput
            style={{borderWidth: 1, borderColor: "black", width: 300}}
            placeholder={"ニックネーム"}
            onChangeText={text => this.props.inputNickname(text)}
            value={this.props.signUp.nickname}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectResidence(value)}
            items={[
              { label: "北海道", value: 1 },
              { label: "青森", value: 2 }, { label: "岩手", value: 3 }, { label: "宮城", value: 4 }, { label: "秋田", value: 5 }, { label: "山形", value: 6 }, { label: "福島", value: 7 },
              { label: "茨城", value: 8 }, { label: "栃木", value: 9 }, { label: "群馬", value: 10 }, { label: "埼玉", value: 11 }, { label: "千葉", value: 12 }, { label: "東京", value: 13 }, { label: "神奈川", value: 14 },
              { label: "新潟", value: 15 }, { label: "富山", value: 16 }, { label: "石川", value: 17 }, { label: "福井", value: 18 },
              { label: "山梨", value: 19 }, { label: "長野", value: 20 }, { label: "岐阜", value: 21 }, { label: "静岡", value: 22 }, { label: "愛知", value: 23 }, { label: "三重", value: 24 }, { label: "滋賀", value: 25 },
              { label: "京都", value: 26 }, { label: "大阪", value: 27 }, { label: "兵庫", value: 28 }, { label: "奈良", value: 29 }, { label: "和歌山", value: 30 },
              { label: "鳥取", value: 31 }, { label: "島根", value: 32 }, { label: "岡山", value: 33 }, { label: "広島", value: 34 }, { label: "山口", value: 35 },
              { label: "徳島", value: 36 }, { label: "香川", value: 37 }, { label: "愛媛", value: 38 }, { label: "高知", value: 39 },
              { label: "福岡", value: 40 }, { label: "佐賀", value: 41 }, { label: "長崎", value: 42 }, { label: "熊本", value: 43 }, { label: "大分", value: 44 }, { label: "宮崎", value: 45 }, { label: "鹿児島", value: 46 },
              { label: "沖縄", value: 47 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: this.props.signUp.residence }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectPurpose(value)}
            items={[
              { label: "婚活", value: 0 },
              { label: "恋活", value: 1 },
              { label: "友活", value: 2 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: this.props.signUp.purpose }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <Button title="次へ" onPress={()=> this.snapScroll.scrollTo({x: width}) } />
        </View>

        <View style={styles.slide}>
          <Text style={styles.text}>Second</Text>
          <Button title="前へ" onPress={()=> this.snapScroll.scrollTo({x: -width}) } />
          <Button title="次へ" onPress={()=> this.snapScroll.scrollTo({x: width}) } />
        </View>

        <View style={styles.slide}>
          <Text style={styles.text}>Third</Text>
          <Button title="前へ" onPress={()=> this.snapScroll.scrollTo({x: -width}) } />
          <Button title="次へ" onPress={()=> this.snapScroll.scrollTo({x: width}) } />
        </View>

        <View style={styles.slide}>
          <Button
            title="登録"
            onPress={() => this._onPressSignUp()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    width: width,
    height: height,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#789',
    borderRadius: 4,
    color: '#789',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    marginLeft: 30
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#789',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor:'#eee'
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
