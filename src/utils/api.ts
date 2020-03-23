import axios from "axios";
const API_URL = "http://localhost:3000/v1/"

export function apiClient(accessKey="") {
  return axios.create({
    baseURL: API_URL,
    headers: {
      "ACCESS-KEY": accessKey,
      "SNAPMART-ACCESS": accessKey,
      "ACCESS_KEY": accessKey,
      "SNAPMART_ACCESS": accessKey,
    }
  });
};

export class SampleAppAPI {
  signIn(payload) {
    return apiClient().post("/sessions", {
      session: {
        email: payload.email,
        password: payload.password,
        token: payload.token,
        os: payload.os,
      }
    }).then((res) => {
      let response = res.data
      let error = null
      return { response, error }
    }).catch( error => {
      error = error.response
      return { error }
    })
  }
  signUp(payload) {
    return apiClient().post("/users", {
      user: {
        email: payload.email,
        password: payload.password,
        birthday: payload.birthday,
        sex: payload.sex,
        nickname: payload.nickname,
        residence: payload.residence,
        purpose: payload.purpose,
        annual_income: payload.annual_income,
        occupation: payload.occupation,
        height: payload.height,
        academic_history: payload.academic_history,
        first_dating_spend_cost: payload.first_dating_spend_cost,
        period_until_dating: payload.period_until_dating,
        marriage_history: payload.marriage_history,
        have_child: payload.have_child,
        self_introduction: payload.self_introduction,
        main_image: payload.main_image,
        exponent_push_token: payload.token,
        os: payload.os,
      }
    }).then((res) => {
      let response = res.data
      let error = null
      return { response, error }
    }).catch( error => {
      error = error.response
      return { error }
    })
  }
  search(payload) {
    return apiClient().get("/users", {
      users: {
        birthday: "test", //payload.birthday,
      }
    }).then((res) => {
      let response = res.data
      let error = null
      return { response, error }
    }).catch( error => {
      error = error.response
      return { error }
    })
  }
}
