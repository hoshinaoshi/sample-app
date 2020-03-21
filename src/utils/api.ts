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
}
