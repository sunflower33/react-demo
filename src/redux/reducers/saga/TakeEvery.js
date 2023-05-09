import {
    call,
    takeEvery
} from 'redux-saga/effects'

export function* takeEvery1() {
    yield takeEvery('testTakeEvery1', testTakeEvery1)
}

export function* takeEvery2() {
    yield takeEvery('testTakeEvery2', testTakeEvery2)
}

function* testTakeEvery1() {
    console.log('testTakeEvery1-----')
    yield call(test1)
}

function* testTakeEvery2() {
    console.log('testTakeEvery2-----')
    yield call(test2)
}

function test1() {
    return new Promise((resolve, reject) => setTimeout(() => resolve('test1'), 1000))
}

function test2() {
    return new Promise((resolve, reject) => setTimeout(() => resolve('test2'), 1000))
}