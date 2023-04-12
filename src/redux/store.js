import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import ReducerA from "./reducers/ReducerA";
import ReducerB from "./reducers/ReducerB";
const initalValue = {};
const reducer = combineReducers({
  ReducerA,
  ReducerB,
});

const store = createStore(reducer, initalValue, applyMiddleware(ReduxThunk));
export default store;
