import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SampleAppAPI } from "@utils/api";
import * as SecureStore from 'expo-secure-store';

// action type
const INPUT_EMAIL= "SIGN_IN_INPUT_EMAIL";
const INPUT_PASSWORD = "SIGN_IN_INPUT_PASSWORD";
const SIGN_IN = "SIGN_IN_SIGN_IN";
const SIGN_IN_SUCCESS = "SIGN_IN_SIGN_IN_SUCCESS";
const SIGN_IN_FAIL = "SIGN_IN_SIGN_IN_FAIL";
const SIGN_IN_SCREEN_TRANSITION = "SIGN_IN_SIGN_IN_SCREEN_TRANSITION";
const TOGGLE_SIGN_IN_BUTTON = "SIGN_IN_TOGGLE_SIGN_IN_BUTTON";

const initialState = {
  email: "",
  password: "",
  sending_request: false,
  sended_request: false,
  request_successed: false,
  request_failed: false,
  error: "",
  disableSignInButton: true,
}

// action-creator
export function inputEmail(email) {
  return { type: INPUT_EMAIL, email};
}

export function inputPassword(password) {
  return { type: INPUT_PASSWORD, password };
}

export function singIn(payload) {
  return { type: SIGN_IN, payload };
}

export function signInSuccess() {
  return { type: SIGN_IN_SUCCESS };
}

export function signInFail(error) {
  return { type: SIGN_IN_FAIL, error: error };
}

export function toggleSignInButton(disabled) {
  return { type: TOGGLE_SIGN_IN_BUTTON, disabled };
}

// redux-saga
function createUserAPI(payload) {
}

function userAPI(payload) {
  const api = new SampleAppAPI
  return api.signIn(payload)
}

function* fetchUser(action) {
  try {
    const { response, error } = yield call(userAPI, action.payload);
    if((error == null || error == undefined) && (response != undefined || response != null)){
      yield put(signInSuccess());
      SecureStore.setItemAsync("accessKey", response.access_token)
    } else {
      yield put(signInFail(error));
    }
  } catch (e) {
    yield put(signInFail(e));
  }
}

export const SignInScreenSagas = [
  takeLatest(SIGN_IN, fetchUser),
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
    case SIGN_IN:
      return {
        ...state,
        sending_request: true,
        sended_request: false,
        error: null,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: true,
        request_failed: false,
        error: null,
      }
    case SIGN_IN_FAIL:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: false,
        request_failed: true,
        error: action.error,
      }
    case SIGN_IN_SCREEN_TRANSITION:
      return initialState;
    case TOGGLE_SIGN_IN_BUTTON:
      return {
        ...state,
        disableSignInButton: action.disabled,
      }
    default:
      return state;
  }
}
