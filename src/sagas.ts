import * as SignInScreenModule from "@modules/SignInScreen";
import * as SignUpScreenModule from "@modules/SignUpScreen";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    ...SignInScreenModule.SignInScreenSagas,
    ...SignUpScreenModule.SignUpScreenSagas,
  ])
}
