import React from "react";
import * as SecureStore from 'expo-secure-store';
import * as Device from "expo-device";
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import { RNS3 } from "react-native-aws3";
import { AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REAGION } from "react-native-dotenv"
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import * as searchScreenModule from "@modules/SearchScreen";
import { connect } from "react-redux";

const { width, height } = Dimensions.get('window')

const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (accessKey, birthday, sex, nickname, residence, purpose, annual_income, occupation, height, academic_history, first_dating_spend_cost, period_until_dating, marriage_history, have_child, self_introduction) => dispatch(searchScreenModule.searchUsers({accessKey, birthday, sex, nickname, residence, purpose, annual_income, occupation, height, academic_history, first_dating_spend_cost, period_until_dating, marriage_history, have_child, self_introduction})),
  }
}

// ログイン判定
class SearchScreen extends React.Component {
  async componentDidMount() {
    const accessKey = await SecureStore.getItemAsync("accessKey")
    this.props.searchUsers(
      accessKey,
      "", // this.props.search.birthday,
      "", // this.props.search.sex,
      "", // this.props.search.nickname,
      "", // this.props.search.residence,
      "", // this.props.search.purpose,
      "", // this.props.search.annual_income,
      "", // this.props.search.occupation,
      "", // this.props.search.height,
      "", // this.props.search.academic_history,
      "", // this.props.search.first_dating_spend_cost,
      "", // this.props.search.period_until_dating,
      "", // this.props.search.marriage_history,
      "", // this.props.search.have_child,
      "", // this.props.search.self_introduction,
      ""
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.search.users}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <View>
              <Text>{item.id}</Text>
              <Image style={{width: 50, height: 50}} source={{uri: item.profile_image_url}}/>
            </View>
          }
        />
        <Text onPress={() => this.props.navigation.navigate("SearchCondition")}>SearchCondition</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
