import { takeEvery, all, put, takeLatest } from "redux-saga/effects";
import { LOGIN, LOGOUT, LOGIN_ERROR } from "../constants/auth";
import { signInSuccess, signOutSuccess, signInFailure } from "../actions/auth";

function* getSignIn() {
    yield takeLatest(LOGIN, function* (action) {
        yield put(signInSuccess(action.payload));
    })
}

function* getSignOut() {
    yield takeEvery(LOGOUT, function* () {
        yield put(signOutSuccess());
    })
}

function* getSigninError() {
    yield takeEvery(LOGIN_ERROR, function* (action) {
        yield put(signInFailure(action.payload));
    })
}

export default function* authSaga() {
    yield all([
        getSignIn(),
        getSignOut(),
        getSigninError()
    ])
}