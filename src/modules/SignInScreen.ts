import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// action type
const INPUT_EMAIL= "SIGN_IN_INPUT_EMAIL";
const INPUT_PASSWORD = "SIGN_IN_INPUT_PASSWORD";
const SIGN_IN = "SIGN_IN_SIGN_IN";
const SIGN_IN_SUCCESS = "SIGN_IN_SIGN_IN_SUCCESS";
const SIGN_IN_FAIL = "SIGN_IN_SIGN_IN_FAIL";
const SIGN_IN_SCREEN_TRANSITION = "SIGN_IN_SIGN_IN_SCREEN_TRANSITION";
const TOGGLE_SIGN_IN_BUTTON = "SIGN_IN_TOGGLE_SIGN_IN_BUTTON";

const initialState = {
  access_key: "",
  email: "",
  password: "",
  sending_request: false,
  sended_request: false,
  request_successed: false,
  request_failed: false,
  errorMessage: "",
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

export function signInFail() {
  return { type: SIGN_IN_FAIL };
}

export function toggleSignInButton(disabled) {
  return { type: TOGGLE_SIGN_IN_BUTTON, disabled };
}

// redux-saga
function createUserAPI(payload) {
  const api = new SnapmartAPI
  return api.tokenCheck(payload)
}

function userAPI(payload) {
  return APIClient.post("/sessions", {
    session: {
      access_key: "",
      email: payload.email,
      password: payload.password,
      exponent_push_token: payload.token,
      provider: "service",
      os: payload.os,
    },
  }).then((response) => {
    SecureStore.setItemAsync("accessKey", response.data.session.access_key)
    SecureStore.setItemAsync("sellerId", JSON.stringify(response.data.session.id))
  })
}

function* fetchUser(action) {
  try {
    const user = yield call(userAPI, action.payload);
    yield put(signInSuccess());
    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  } catch (e) {
   yield put(signInFail());
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
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
        errorMessage: "",
      }
    case INPUT_PASSWORD:
      return {
        ...state,
        sended_request: false,
        password: action.password,
        errorMessage: "",
      }
    case SIGN_IN:
      return {
        ...state,
        sending_request: true,
        sended_request: false,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: true,
        request_failed: false,
      }
    case SIGN_IN_FAIL:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: false,
        request_failed: true
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
