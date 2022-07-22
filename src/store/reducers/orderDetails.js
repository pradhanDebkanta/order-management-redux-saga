import { CREATE_ORDER_SUCCESS, DELETE_ORDER_SUCCESS, EDIT_ORDER_SUCCESS, GET_ORDER_SUCCESS, ERROR_IN_ORDER, ORDER_LOADING_START, ORDER_LOADING_END } from "../constants/order";

const initialState = {
    orderList: [],
    totalOrders: 0,
    perPageItem: 10,
    loading: false,
    error: false,
    errormessage: '',
};

const orderDetails = (state = initialState, action) => {
    const { type, payload } = action;
    let currTotalItem = state.totalOrders;
    switch (type) {
        case CREATE_ORDER_SUCCESS:
            let deepCopy = [...state.orderList];
            if (deepCopy.length < state.perPageItem) {
                deepCopy.unshift(payload);
            } else {
                deepCopy.pop();
                deepCopy.unshift(payload);
            }
            currTotalItem++;
            // console.log(deepCopy, "create order store");
            return {
                ...state,
                orderList: deepCopy,
                totalOrders: currTotalItem,
                error: false,
                errormessage: '',
            }
        case DELETE_ORDER_SUCCESS:
            let temp1 = state.orderList?.filter((item) => item.id !== payload);
            currTotalItem--;
            return {
                ...state,
                orderList: temp1,
                totalOrders: currTotalItem,
                error: false,
                errormessage: '',
            }

        case EDIT_ORDER_SUCCESS:
            let temp = state.orderList?.map((item) => item.id === payload.id ? payload : item)
            return {
                ...state,
                orderList: temp,
                error: false,
                errormessage: '',
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderList: payload.data,
                totalOrders: payload.totalItem,
                perPageItem: payload.perPageItem,
                error: false,
                errormessage: '',
            }
        case ERROR_IN_ORDER:
            return {
                ...state,
                error: true,
                errormessage: payload,

            }
        case ORDER_LOADING_START:
            return {
                ...state,
                loading: true,
            }
        case ORDER_LOADING_END:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
};

export default orderDetails;