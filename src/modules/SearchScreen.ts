import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { SampleAppAPI } from "@utils/api";
import * as SecureStore from 'expo-secure-store';

// action type
const SEARCH= "SEARCH_SEARCH";
const SEARCH_SUCCESS = "SEARCH_SEARCH_SUCCESS";
const SEARCH_FAIL = "SEARCH_SEARCH_FAIL";

const initialState = {
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
  sending_request: false,
  sended_request: false,
  request_successed: false,
  request_failed: false,
  error: "",
}

// action-creator
export function search(payload) {
  return { type: SEARCH, payload};
}

export function searchSuccess() {
  return { type: SEARCH_SUCCESS };
}

export function searchFail(error) {
  return { type: SEARCH_FAIL, error: error };
}


// redux-saga
function callAPI(payload) {
  const api = new SampleAppAPI
  return api.search(payload)
}

function* searchUser(action) {
  try {
    const { response, error } = yield call(callAPI, action.payload);
    if((error == null || error == undefined) && (response != undefined || response != null)){
      yield put(searchSuccess());
    } else {
      yield put(searchFail(error));
    }
  } catch (e) {
    yield put(searchFail(e));
  }
}

export const SearchScreenSagas = [
  takeLatest(SEARCH, searchUser),
]

// reducer
export default function reducer(state= initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        sending_request: false,
        sended_request: false,
        request_successed: false,
        request_failed: false,
        error: null,
      }
    case SEARCH_SUCCESS:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: true,
        request_failed: false,
        error: null,
      }
    case SEARCH_FAIL:
      return {
        ...state,
        sending_request: false,
        sended_request: true,
        request_successed: false,
        request_failed: true,
        error: action.error,
      }
    default:
      return state;
  }
}
