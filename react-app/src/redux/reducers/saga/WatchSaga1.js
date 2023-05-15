import axios from "axios"
import {
    take,
    fork,
    put,
    call
} from 'redux-saga/effects'

function* watchSaga1() {
    while (true) {
        yield take('get-list')
        yield fork(getList)
    }
}

function* getList() {
    const res = yield call(getListAction)
    console.log(res)
    yield put({
        type: 'change-list',
        payload: res
    })
}

function getListAction() {
    const res = axios.get('/news').then(res => res.data)
    return res
}

export default watchSaga1