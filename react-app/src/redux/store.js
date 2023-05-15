import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
} from "redux";
import {
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";
import createSagaMiddleWare from 'redux-saga'
import ReducerLayout from "./reducers/ReducerLayout";
import ReducerOptions from "./reducers/ReducerOptions";
import ReducerTest from "./reducers/ReducerTest";
import ReducerTestSaga from "./reducers/ReducerTestSaga";
import watchSaga from "./reducers/WatchSaga";

const SagaMiddleWare = createSagaMiddleWare()

const initalValue = {};
const reducer = combineReducers({
  ReducerOptions,
  ReducerTest,
  ReducerLayout, 
  ReducerTestSaga,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ReducerTest", "ReducerLayout"],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  initalValue,
  composeEnhancers(applyMiddleware(ReduxThunk, ReduxPromise, SagaMiddleWare))
);
const persistor = persistStore(store);

SagaMiddleWare.run(watchSaga)   // Saga任务

export {
  store,
  persistor
};