import {
    GET_ORDER,
    CREATE_ORDER,
    EDIT_ORDER,
    ERROR_IN_ORDER,
    DELETE_ORDER, GET_ALLL_ORDER,
    CREATE_ORDER_SUCCESS,
    EDIT_ORDER_SUCCESS,
    GET_ALLL_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    GET_ORDER_SUCCESS,
    ORDER_LOADING_START,
    ORDER_LOADING_END
} from "../constants/order";

export const getAllOrder = () => {
    return {
        type: GET_ALLL_ORDER
    }
}

export const getLimitedOrder = (body) => {
    return {
        type: GET_ORDER,
        payload: body
    };
}

export const createOrder = (data) => {
    return {
        type: CREATE_ORDER,
        payload: data
    };

}
export const editOrder = (data) => {
    return {
        type: EDIT_ORDER,
        payload: data
    };
}

export const deleteOrder = (id) => {
    return {
        type: DELETE_ORDER,
        payload: id
    };
}

export const orderError = (err) => {
    return {
        type: ERROR_IN_ORDER,
        payload: err
    }
}

export const getAllOrderSuccess = (data) => {
    return {
        type: GET_ALLL_ORDER_SUCCESS,
        payload: data
    };
}

export const getLimitedOrderSuccess = (data) => {
    return {
        type: GET_ORDER_SUCCESS,
        payload: data
    };
}

export const createOrderSuccess = (data) => {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: data
    };
}

export const editOrderSuccess = (data) => {
    return {
        type: EDIT_ORDER_SUCCESS,
        payload: data
    };
}

export const deleteOrderSuccess = (data) => {
    return {
        type: DELETE_ORDER_SUCCESS,
        payload: data
    };
}

export const startLoading = () => {
    console.log("startLoading");
    return {
        type: ORDER_LOADING_START
    };
}
export const endLoading = () => {
    console.log("endLoading");
    return {
        type: ORDER_LOADING_END
    };
}
