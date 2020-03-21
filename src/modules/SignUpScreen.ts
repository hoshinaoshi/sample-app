import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SampleAppAPI } from "@utils/api";
import * as SecureStore from 'expo-secure-store';

// action type
const INPUT_EMAIL= "SIGN_UP_INPUT_EMAIL";
const INPUT_PASSWORD = "SIGN_UP_INPUT_PASSWORD";
const SIGN_UP = "SIGN_UP_SIGN_UP";
const SIGN_UP_SUCCESS = "SIGN_UP_SIGN_UP_SUCCESS";
const SIGN_UP_FAIL = "SIGN_UP_SIGN_UP_FAIL";
const SIGN_UP_SCREEN_TRANSITION = "SIGN_UP_SIGN_UP_SCREEN_TRANSITION";
const TOGGLE_SIGN_UP_BUTTON = "SIGN_UP_TOGGLE_SIGN_UP_BUTTON";

const initialState = {
  access_key: "",
  email: "",
  password: "",
  sending_request: false,
  sended_request: false,
  request_successed: false,
  request_failed: false,
  error: "",
  disableSignUpButton: true,
}

// action-creator
export function inputEmail(email) {
  return { type: INPUT_EMAIL, email};
}

export function inputPassword(password) {
  return { type: INPUT_PASSWORD, password };
}

export function singUp(payload) {
  return { type: SIGN_UP, payload };
}

export function signUpSuccess() {
  return { type: SIGN_UP_SUCCESS };
}

export function signUpFail(error) {
  return { type: SIGN_UP_FAIL, error: error };
}

export function toggleSignUpButton(disabled) {
  return { type: TOGGLE_SIGN_UP_BUTTON, disabled };
}

// redux-saga
function createUserAPI(payload) {
}

function userAPI(payload) {
  const api = new SampleAppAPI
  return api.signUp(payload)
}

function* fetchUser(action) {
  try {
    const { response, error } = yield call(userAPI, action.payload);
    if(error === null || error === undefined){
      yield put(signUpSuccess());
      SecureStore.setItemAsync("accessKey", response.access_token)
    } else {
      yield put(signUpFail(error));
    }
  } catch (e) {
    yield put(signUpFail(e));
  }
}

export const SignUpScreenSagas = [
  takeLatest(SIGN_UP, fetchUser),
]

// reducer
export default function reducer(state= initialState, action) {
  switch (action.type) {
    case INPUT_EMAIL:
      return {
        ...state,
        sended_request: false,
        email: action.email,
        error: null,
      }
    case INPUT_PASSWORD:
      return {
        ...state,
        sended_request: false,
        password: action.password,
        error: null,
      }
    case SIGN_UP:
      return {
        ...state,
        sending_request: true,
        sended_request: false,
        error: null,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: true,
        request_failed: false,
        error: null,
      }
    case SIGN_UP_FAIL:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: false,
        request_failed: true,
        error: action.error,
      }
    case SIGN_UP_SCREEN_TRANSITION:
      return initialState;
    case TOGGLE_SIGN_UP_BUTTON:
      return {
        ...state,
        disableSignUpButton: action.disabled,
      }
    default:
      return state;
  }
}
