import { LOGIN, LOGOUT, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE } from "../constants/auth";

export const signIn = (data) => {
    return {
        type: LOGIN,
        payload: data
    };
}

export const signOut = () => {
    return {
        type: LOGOUT,
        payload: {}
    };
}
export const signInError = (data) => {
    return {
        type: LOGIN_ERROR,
        payload: data
    };
}

export const signInSuccess = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
}

export const signOutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const signInFailure = (data) => {
    return {
        type: LOGIN_FAILURE,
        payload: data
    }
}