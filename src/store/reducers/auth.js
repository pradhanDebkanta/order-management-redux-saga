import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE } from "../constants/auth";

const initialState = {
    userData: {},
    // userRole: "",
    isAuthenticated: false,
    loading: false,
    error: false,
    errormessage: '',
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false,
                error: false,
                errormessage: ""
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                userData: {},
                isAuthenticated: false,
                loading: false,
                error: false,
                errormessage: ""
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                userData: {},
                isAuthenticated: false,
                loading: false,
                error: true,
                errormessage: payload
            }
        default:
            return state;
    }
}

export default auth;