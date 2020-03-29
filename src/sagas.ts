import * as SignInScreenModule from "@modules/SignInScreen";
import * as SignUpScreenModule from "@modules/SignUpScreen";
import * as SearchScreenModule from "@modules/SearchScreen";
import * as SearchConditionScreenModule from "@modules/SearchConditionScreen";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    ...SignInScreenModule.SignInScreenSagas,
    ...SignUpScreenModule.SignUpScreenSagas,
    ...SearchScreenModule.SearchScreenSagas,
    ...SearchConditionScreenModule.SearchConditionScreenSagas,
  ])
}
