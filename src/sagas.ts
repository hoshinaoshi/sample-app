import * as SignInScreenModule from "@modules/SignInScreen";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    ...SignInScreenModule.SignInScreenSagas,
  ])
}
