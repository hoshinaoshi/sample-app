import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SampleAppAPI } from "@utils/api";
import * as SecureStore from 'expo-secure-store';

// action type
const INPUT_EMAIL= "SIGN_UP_INPUT_EMAIL";
const INPUT_PASSWORD = "SIGN_UP_INPUT_PASSWORD";
const SELECT_BIRTHDAY = "SIGN_UP_SELECT_BIRTHDAY";
const SELECT_SEX = "SIGN_UP_SELECT_SEX";
const INPUT_NICKNAME= "SIGN_UP_INPUT_NICKNAME";
const SELECT_RESIDENCE = "SIGN_UP_SELECT_RESIDENCE";
const SELECT_PURPOSE = "SIGN_UP_SELECT_RURPOSE";
const SELECT_ANNUAL_INCOME = "SIGN_UP_SELECT_ANNUAL_INCOME";
const SELECT_OCCUPATION = "SIGN_UP_SELECT_OCCUPATION";
const SELECT_HEIGHT = "SIGN_UP_SELECT_HEIGHT";
const SELECT_ACADEMIC_HISTORY = "SIGN_UP_SELECT_ACADEMIC_HISTORY";
const SELECT_FIRST_DATING_SPEND_COST = "SIGN_UP_SELECT_FIRST_DATING_SPEND_COST";
const SELECT_PERIOD_UNTIL_DATING = "SIGN_UP_SELECT_PERIOD_UNTIL_DATING";
const SELECT_MARRIAGE_HISTORY = "SIGN_UP_SELECT_MARRIAGE_HISTORY";
const SELECT_HAVE_CHILD = "SIGN_UP_SELECT_HAVE_CHILD";
const INPUT_SELF_INTRODUCTION = "SIGN_UP_INPUT_SELF_INTRODUCTION";

const SIGN_UP = "SIGN_UP_SIGN_UP";
const SIGN_UP_SUCCESS = "SIGN_UP_SIGN_UP_SUCCESS";
const SIGN_UP_FAIL = "SIGN_UP_SIGN_UP_FAIL";
const SIGN_UP_SCREEN_TRANSITION = "SIGN_UP_SIGN_UP_SCREEN_TRANSITION";
const TOGGLE_SIGN_UP_BUTTON = "SIGN_UP_TOGGLE_SIGN_UP_BUTTON";

const initialState = {
  email: "",
  password: "",
  birthday: "",
  sex: null,
  nickname: "",
  residence: null,
  purpose: null,
  annual_income: null,
  occupation: null,
  height: null,
  academic_history: null,
  first_dating_spend_cost: null,
  period_until_dating: null,
  marriage_history: null,
  have_child: null,
  self_introduction: "",
  main_image: "",

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

export function selectBirthday(birthday) {
  return { type: SELECT_BIRTHDAY, birthday };
}

export function selectSex(sex) {
  return { type: SELECT_SEX, sex };
}

export function inputNickname(nickname) {
  return { type: INPUT_NICKNAME, nickname};
}

export function selectResidence(residence) {
  return { type: SELECT_RESIDENCE, residence };
}

export function selectPurpose(purpose) {
  return { type: SELECT_PURPOSE, purpose };
}

export function selectAnnualIncome(annual_income) {
  return { type: SELECT_ANNUAL_INCOME, annual_income };
}

export function selectOccupation(occupation) {
  return { type: SELECT_OCCUPATION, occupation };
}

export function selectHeight(height) {
  return { type: SELECT_HEIGHT, height };
}

export function selectAcademicHistory(academic_history) {
  return { type: SELECT_ACADEMIC_HISTORY, academic_history };
}

export function selectFirstDatingSpendCost(first_dating_spend_cost) {
  return { type: SELECT_FIRST_DATING_SPEND_COST, first_dating_spend_cost };
}

export function selectPeriodUntilDating(period_until_dating) {
  return { type: SELECT_PERIOD_UNTIL_DATING, period_until_dating };
}

export function selectMarriageHistory(marriage_history) {
  return { type: SELECT_MARRIAGE_HISTORY, marriage_history };
}

export function selectHaveChild(have_child) {
  return { type: SELECT_HAVE_CHILD, have_child };
}

export function inputSelfIntroduction(self_introduction) {
  return { type: INPUT_SELF_INTRODUCTION, self_introduction};
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
    case SELECT_BIRTHDAY:
      return {
        ...state,
        sended_request: false,
        birthday: action.birthday,
        error: null,
      }
    case SELECT_SEX:
      return {
        ...state,
        sended_request: false,
        sex: action.sex,
        error: null,
      }
    case INPUT_NICKNAME:
      return {
        ...state,
        sended_request: false,
        nickname: action.nickname,
        error: null,
      }
    case SELECT_RESIDENCE:
      return {
        ...state,
        sended_request: false,
        residence: action.residence,
        error: null,
      }
    case SELECT_PURPOSE:
      return {
        ...state,
        sended_request: false,
        purpose: action.purpose,
        error: null,
      }
    case SELECT_ANNUAL_INCOME:
      return {
        ...state,
        sended_request: false,
        annual_income: action.annual_income,
        error: null,
      }
    case SELECT_OCCUPATION:
      return {
        ...state,
        sended_request: false,
        occupation: action.occupation,
        error: null,
      }
    case SELECT_HEIGHT:
      return {
        ...state,
        sended_request: false,
        height: action.height,
        error: null,
      }
    case SELECT_ACADEMIC_HISTORY:
      return {
        ...state,
        sended_request: false,
        academic_history: action.academic_history,
        error: null,
      }
    case SELECT_FIRST_DATING_SPEND_COST:
      return {
        ...state,
        sended_request: false,
        first_dating_spend_cost: action.first_dating_spend_cost,
        error: null,
      }
    case SELECT_PERIOD_UNTIL_DATING:
      return {
        ...state,
        sended_request: false,
        period_until_dating: action.period_until_dating,
        error: null,
      }
    case SELECT_MARRIAGE_HISTORY:
      return {
        ...state,
        sended_request: false,
        marriage_history: action.marriage_history,
        error: null,
      }
    case SELECT_HAVE_CHILD:
      return {
        ...state,
        sended_request: false,
        have_child: action.have_child,
        error: null,
      }
    case INPUT_SELF_INTRODUCTION:
      return {
        ...state,
        sended_request: false,
        self_introduction: action.self_introduction,
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
