import { applyMiddleware, combineReducers, createStore as reduxCreateStore } from "redux";

// middleware
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas"

import { composeWithDevTools } from 'redux-devtools-extension'

import signInReducer from "./modules/SignInScreen";

const sagaMiddleware = createSagaMiddleware()

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      signIn: signInReducer,
    }),
    composeWithDevTools(applyMiddleware(
      sagaMiddleware,
      logger,
    )),
  );
  sagaMiddleware.run(rootSaga)

  return store;
}
