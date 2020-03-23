import React from "react";
import * as Device from "expo-device";
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import { RNS3 } from "react-native-aws3";
import { AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REAGION } from "react-native-dotenv"
import {
  ActivityIndicator,
  Alert,
  Button,
  Constants,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
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
    selectAnnualIncome: (value) => dispatch(signUpScreenModule.selectAnnualIncome(value)),
    selectOccupation: (value) => dispatch(signUpScreenModule.selectOccupation(value)),
    selectHeight: (value) => dispatch(signUpScreenModule.selectHeight(value)),
    selectAcademicHistory: (value) => dispatch(signUpScreenModule.selectAcademicHistory(value)),
    selectFirstDatingSpendCost: (value) => dispatch(signUpScreenModule.selectFirstDatingSpendCost(value)),
    selectPeriodUntilDating: (value) => dispatch(signUpScreenModule.selectPeriodUntilDating(value)),
    selectMarriageHistory: (value) => dispatch(signUpScreenModule.selectMarriageHistory(value)),
    selectHaveChild: (value) => dispatch(signUpScreenModule.selectHaveChild(value)),
    inputSelfIntroduction: (value) => dispatch(signUpScreenModule.inputSelfIntroduction(value)),
    pickImage: (value) => dispatch(signUpScreenModule.pickImage(value)),

    singUp: (email, password, birthday, sex, nickname, residence, purpose, annual_income, occupation, height, academic_history, first_dating_spend_cost, period_until_dating, marriage_history, have_child, self_introduction, main_image, token, os) => dispatch(signUpScreenModule.singUp({email, password, birthday, sex, nickname, residence, purpose, annual_income, occupation, height, academic_history, first_dating_spend_cost, period_until_dating, marriage_history, have_child, self_introduction, main_image, token, os})),
    toggleSignUpButton: (value) => dispatch(signUpScreenModule.toggleSignUpButton(value)),
  }
}

// ログイン判定
class SignUpScreen extends React.Component {
  async componentDidMount() {
    try{
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    } catch(e) {
    }
  }
  async _pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0
    });

    if (!result.cancelled) {
      this.props.pickImage(result)
    }
  };
 _onPressSignUp(){
    const outerThis = this
    const options = {
      accessKey: AWS_ACCESS_KEY,
      bucket: "sample-uploads",//AWS_S3_BUCKET,
      keyPrefix: "",
      region: AWS_REAGION,
      secretKey: AWS_SECRET_KEY,
      successActionStatus: 201,
    }

    let response = [];
    let error    = [];

    let random = Math.random().toString(36).slice(-5)
    let time = moment().format('YYYYMMDD-HHmmssSSS')
    let directory
    let fileName
    directory = `profile/`
    fileName = `${time}_${random}.jpg`

    RNS3.put({uri: this.props.signUp.main_image.uri, name: `${directory}${fileName}`, type: "image/jpg"}, options)
      .then(res => {
        if (res.status !== 201){
          error.push(res)
        } else {
          let os = "";
          let token = ""; //Todo
          if(Device.isDevice){
            os = Device.osName
          }
          this.props.singUp(
            this.props.signUp.email,
            this.props.signUp.password,
            this.props.signUp.birthday,
            this.props.signUp.sex,
            this.props.signUp.nickname,
            this.props.signUp.residence,
            this.props.signUp.purpose,
            this.props.signUp.annual_income,
            this.props.signUp.occupation,
            this.props.signUp.height,
            this.props.signUp.academic_history,
            this.props.signUp.first_dating_spend_cost,
            this.props.signUp.period_until_dating,
            this.props.signUp.marriage_history,
            this.props.signUp.have_child,
            this.props.signUp.self_introduction,
            fileName,
            "",
            os,
          )
        }
      }).catch(e => {
        error.push(e)
        outerThis.props.incrementFailCount()
      })
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
            placeholder={{ label: "選択してください", value: null }}
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
            placeholder={{ label: "選択してください", value: null }}
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
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <Button title="次へ" onPress={()=> this.snapScroll.scrollTo({x: width}) } />
        </View>

        <View style={styles.slide}>
          <Text style={styles.text}>Second</Text>
          <RNPickerSelect
            onValueChange={(value) => this.props.selectAnnualIncome(value)}
            items={[
              { label: "~100万", value: 0 },
              { label: "100~200万", value: 1 },
              { label: "200~300万", value: 2 },
              { label: "300~400万", value: 3 },
              { label: "400~500万", value: 4 },
              { label: "500~600万", value: 5 },
              { label: "600~700万", value: 6 },
              { label: "700~800万", value: 7 },
              { label: "800~900万", value: 8 },
              { label: "900~1000万", value: 9 },
              { label: "1,000~1,500万", value: 10 },
              { label: "1,500~2,000万", value: 11 },
              { label: "2,000万以上", value: 12 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectOccupation(value)}
            items={[
              { label: "上場企業", value: 0}, { label: "金融", value: 1}, { label: "公務員", value: 2}, { label: "コンサル", value: 3}, { label: "経営者・役員", value: 4}, { label: "大手企業", value: 5}, { label: "大手外資", value: 6}, { label: "大手商社", value: 7}, { label: "外資金融", value:8}, { label: "医師", value:9}, { label: "看護師", value: 10}, { label: "薬剤師", value: 11}, { label: "弁護士", value: 12}, { label: "公認会計士", value: 13}, { label: "パイロット", value: 14}, { label: "客室乗務員", value: 15}, { label: "広告", value: 16}, { label: "マスコミ", value: 17}, { label: "教育関連", value: 18}, { label: "IT関連", value: 19}, { label: "食品関連", value: 20}, { label: "旅行関係", value: 21}, { label: "製薬", value: 22}, { label: "保険", value: 23}, { label: "不動産", value: 24}, { label: "建築関連", value: 25}, { label: "通信", value: 26}, { label: "流通", value: 27}, { label: "WEB業界", value: 28}, { label: "ブライダル", value: 29}, { label: "クリエイター", value: 30}, { label: "接客業", value: 31}, { label: "受付", value: 32}, { label: "調理師・栄養士", value: 33}, { label: "アパレル・ショップ", value: 34}, { label: "美容関係", value: 35}, { label: "エンターテインメント", value: 36}, { label: "アナウンサー", value: 37}, { label: "芸能・モデル", value: 38}, { label: "イベントコンパニオン", value: 39}, { label: "スポーツ選手", value: 40}, { label: "秘書", value: 41}, { label: "事務員", value:42}, { label: "福祉・介護", value: 43}, { label: "保育士", value: 44}, { label: "会社員", value: 45}, { label: "学生", value: 46}, { label: "自由業", value: 47}, { label: "税理士", value: 48}, { label: "エンジニア", value: 49}, { label: "建築士", value: 50}, { label: "美容師", value: 51}, { label: "歯科医師", value: 52}, { label: "歯科衛生士", value: 53}, { label: "その他", value: 54},
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectHeight(value)}
            items={[
              { label: "130cm以下", value: 0 },
              { label: "130~135cm", value: 1 },
              { label: "135~140cm", value: 2 },
              { label: "140~145cm", value: 3 },
              { label: "145~150cm", value: 4 },
              { label: "150~155cm", value: 5 },
              { label: "155~160cm", value: 6 },
              { label: "160~165cm", value: 7 },
              { label: "165~170cm", value: 8 },
              { label: "170~175cm", value: 9 },
              { label: "175~180cm", value: 10 },
              { label: "180~185cm", value: 11 },
              { label: "185~190cm", value: 12 },
              { label: "190~195cm", value: 13 },
              { label: "195~200cm", value: 14 },
              { label: "200cm以上", value: 15 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectAcademicHistory(value)}
            items={[
              { label: "高校卒", value: 1 },
              { label: "短大/専門/高専卒", value: 2 },
              { label: "大学卒", value: 3 },
              { label: "大学院卒", value: 4 },
              { label: "その他", value: 0 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectFirstDatingSpendCost(value)}
            items={[
              { label: "男性が全て払う", value: 0 },
              { label: "男性が多めに払う", value: 1 },
              { label: "割り勘", value: 2 },
              { label: "持っている方が払う", value: 3 },
              { label: "相手と相談して決める", value: 4 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectPeriodUntilDating(value)}
            items={[
              { label: "マッチング後にまずは会いたい", value: 0 },
              { label: "気が合えば会いたい", value: 1 },
              { label: "メッセージを重ねてから会いたい", value: 2 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectMarriageHistory(value)}
            items={[
              { label: "独身(未婚)", value: 0 },
              { label: "独身(離婚)", value: 1 },
              { label: "独身(死別)", value: 2 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <RNPickerSelect
            onValueChange={(value) => this.props.selectHaveChild(value)}
            items={[
              { label: "なし", value: 0 },
              { label: "同居中", value: 1 },
              { label: "別居中", value: 2 },
            ]}
            style={styles}
            placeholder={{ label: "選択してください", value: null }}
            Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
          />
          <Button title="前へ" onPress={()=> this.snapScroll.scrollTo({x: -width}) } />
          <Button title="次へ" onPress={()=> this.snapScroll.scrollTo({x: width * 2}) } />
        </View>

        <View style={styles.slide}>
          <Button
            title="Pick an image from camera roll"
            onPress={()=>this._pickImage()}
          />
          {this.props.signUp.main_image && <Image source={{ uri: this.props.signUp.main_image.uri }} style={{ width: 200, height: 200 }} />}
          <TextInput
            placeholder={"自己紹介"}
            multiline={true}
            style={{borderWidth: 1, borderColor: "black", width: 300, height: 300}}
            onChangeText={text => this.props.inputSelfIntroduction(text)}
            value={this.props.signUp.self_introduction}
          />
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
