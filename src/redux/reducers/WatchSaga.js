import {
    all
} from 'redux-saga/effects'
import watchSaga1 from './saga/WatchSaga1'
import watchSaga2 from './saga/WatchSaga2'
import {
    takeEvery1,
    takeEvery2
} from './saga/TakeEvery'

function* watchSaga() {
    yield all([watchSaga1(), watchSaga2(), takeEvery1(), takeEvery2()])
}


export default watchSaga