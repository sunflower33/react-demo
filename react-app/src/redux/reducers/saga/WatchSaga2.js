import axios from "axios";
import { take, fork, put, call } from "redux-saga/effects";

function* watchSaga2() {
  while (true) {
    yield take("get-list2");
    yield fork(getList);
  }
}

function* getList() {
  const params = yield testParams();
  const res = yield call(getListAction, params);
  console.log(res);
  yield put({
    type: "change-list2",
    payload: res,
  });
}

function testParams() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(66666), 0);
  });
}

function getListAction(params) {
  console.log("测试传参--------------", params);
  const res = axios.get("/rights").then((res) => res.data);
  return res;
}

export default watchSaga2;
