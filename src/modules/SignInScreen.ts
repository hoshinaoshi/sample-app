import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// action type
const INPUT_USER_NAME = "SIGN_IN_INPUT_USER_NAME";
const INPUT_PASSWORD = "SIGN_IN_INPUT_PASSWORD";
const SIGN_IN = "SIGN_IN_SIGN_IN";
const SIGN_IN_SUCCESS = "SIGN_IN_SIGN_IN_SUCCESS";
const SIGN_IN_FAIL = "SIGN_IN_SIGN_IN_FAIL";
const SIGN_IN_SCREEN_TRANSITION = "SIGN_IN_SIGN_IN_SCREEN_TRANSITION";
const SIGN_IN_FB_AUTH = "SIGN_IN_FB_AUTH";
const SIGN_IN_FB_AUTH_SUCCESS = "SIGN_IN_FB_AUTH_SUCCESS";
const SIGN_IN_TOKEN_CHECK_SUCCESS = "SIGN_IN_TOKEN_CHECK_SUCCESS";
const SIGN_IN_TOKEN_CHECK_FAIL = "SIGN_IN_TOKEN_CHECK_FAIL";
const TOGGLE_SIGN_IN_BUTTON = "SIGN_IN_TOGGLE_SIGN_IN_BUTTON";

const initialState = {
  access_key: "",
  password: "",
  seller_id: "",
  sending_request: false,
  sended_request: false,
  request_successed: false,
  request_failed: false,
  userName: "",
  token: "",
  email: "",
  provider: null,
  uid: null,
  profile_image: "",
  access_token: null,
  secret_token: null,
  token_check_successful: false,
  alreadySignUp: false,
  errorMessage: "",
  disableSignInButton: true,
}

// action-creator
export function inputUserName(userName) {
  return { type: INPUT_USER_NAME, userName};
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

export function screenTransition() {
  return { type: SIGN_IN_SCREEN_TRANSITION };
}

export function fbAuth(payload) {
  return { type: SIGN_IN_FB_AUTH, payload };
}
export function fbAuthSuccess(payload) {
  return { type: SIGN_IN_FB_AUTH_SUCCESS, payload };
}
export function tokenCheckSuccess(response) {
  return { type: SIGN_IN_TOKEN_CHECK_SUCCESS, response };
}
export function tokenCheckFail(errorMessage) {
  return { type: SIGN_IN_TOKEN_CHECK_FAIL, errorMessage };
}

export function toggleSignInButton(disabled) {
  return { type: TOGGLE_SIGN_IN_BUTTON, disabled };
}

// redux-saga
function createUserAPI(payload) {
  const api = new SnapmartAPI
  return api.tokenCheck(payload)
}

function facebookAPI(payload) {
  const api = new FacebookAPI
  return api.me(payload)
}

function userAPI(payload) {
  return APIClient.post("/sessions", {
    session: {
      access_key: "",
      email: payload.userName,
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

function* facebookAuthSuccess(action) {
  try {
    const { response, error } = yield call(createUserAPI, action.payload);
    const accessKey = response.session.access_key
    const sellerId = JSON.stringify(response.session.id)

    SecureStore.setItemAsync("accessKey", accessKey)
    SecureStore.setItemAsync("sellerId", sellerId)
    yield put(tokenCheckSuccess(response));
  } catch (e) {
    yield put(tokenCheckFail("Facebook認証に失敗しました"));
  }
}

function* facebookAuth(action) {
  try {
    const { response, error } = yield call(facebookAPI, action.payload);
    yield put(fbAuthSuccess({...response, exponentPushToken: action.payload.exponentPushToken}));
  } catch (e) {
    yield put(tokenCheckFail("認証に失敗しました"));
  }
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
  takeLatest(SIGN_IN_FB_AUTH, facebookAuth),
  takeLatest(SIGN_IN_FB_AUTH_SUCCESS, facebookAuthSuccess),
]

// reducer
export default function reducer(state= initialState, action) {
  switch (action.type) {
    case INPUT_USER_NAME:
      return {
        ...state,
        sended_request: false,
        userName: action.userName,
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
    case SIGN_IN_FB_AUTH:
      return {
        ...state,
        provider: "facebook",
        token: action.token
      }
    case SIGN_IN_FB_AUTH_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        uid: action.payload.id,
        profile_image: action.payload.picture.data.url,
        access_token: action.payload.token,
        token: action.payload.token,
      }
    case SIGN_IN_TOKEN_CHECK_SUCCESS:
      return {
        ...state,
        token_check_successful: action.response.result,
        alreadySignUp: action.response.session != null ? true : false,
      }
    case SIGN_IN_TOKEN_CHECK_FAIL:
      return {
        ...state,
        errorMessage: action.errorMessage,
      }
    case TOGGLE_SIGN_IN_BUTTON:
      return {
        ...state,
        disableSignInButton: action.disabled,
      }
    default:
      return state;
  }
}
