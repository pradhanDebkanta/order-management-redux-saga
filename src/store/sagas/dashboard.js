import { takeEvery, all, put, takeLatest } from "redux-saga/effects";
import { CREATE_ORDER, EDIT_ORDER, DELETE_ORDER, GET_ORDER, GET_ALLL_ORDER } from "../constants/order";
import { getAllOrderSuccess, getLimitedOrderSuccess, editOrderSuccess, createOrderSuccess, deleteOrderSuccess, orderError } from "../actions/dashboard";
import ApiService from "../../services/apiService";
import { customNotification, msgType } from "../../utils/customNotification";

function* getAllOrderSaga() {
    yield takeEvery(GET_ALLL_ORDER, function* (action) {
        // console.log(action, "from get all order saga");
        try {
            const { data, headers, status } = yield ApiService.get("/orderDetails");
            let payloadData = {
                data,
                totalItem: headers["x-total-count"]
            };
            if (status === 200) {
                customNotification({ status, message: "successfully fetch.", type: msgType.success });
                yield put(getAllOrderSuccess(payloadData));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(orderError(e.message));
        }
    })
}

function* getLimitedOrderSaga() {
    yield takeLatest(GET_ORDER, function* (action) {
        // console.log("getLimitedOrderSaga call", action);
        const { payload: { pageNo, itemCount } } = action;
        try {
            const { data, headers, status } = yield ApiService.get(`/orderDetails?_page=${pageNo}&_limit=${itemCount}`);
            // console.log(data, "from get limit order res");
            let payloadData = {
                data,
                totalItem: headers["x-total-count"],
                perPageItem: itemCount
            };
            if (status === 200) {
                customNotification({ status, message: "successfully fetch.", type: msgType.success });
                yield put(getLimitedOrderSuccess(payloadData));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(orderError(e.message));
        }
    })
}

function* createOrderSaga() {
    yield takeEvery(CREATE_ORDER, function* (action) {
        // console.log("createOrderSaga call");
        const { payload } = action;
        try {
            const { data, status } = yield ApiService.post(`/orderDetails`, {}, payload);
            console.log(data, "from createOrder", status);
            if (status >= 200 && status < 300) {
                customNotification({ status, message: "order created successfully.", type: msgType.success });
                yield put(createOrderSuccess(data));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(orderError(e.message))
        }

    })
}

function* editOrderSaga() {
    yield takeEvery(EDIT_ORDER, function* (action) {
        const { payload: { id }, payload } = action;
        try {
            const { data, status } = yield ApiService.patch(`/orderDetails/${id}`, {}, payload);
            // console.log(data, "from createOrder", status);
            if (status === 200) {
                customNotification({ status, message: "Order edited successfully.", type: msgType.success });
                yield put(editOrderSuccess(data));
            }

        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(orderError(e.message))
        }
    })
}

function* deleteOrderSaga() {
    yield takeEvery(DELETE_ORDER, function* (action) {
        // console.log("deleteOrderSaga call", action);
        try {
            const { status } = yield ApiService.delete(`/orderDetails/${action.payload}`, {});
            // console.log(status, "from deleteOrderSaga");
            if (status === 200) {
                customNotification({ status, message: "Order deleted successfully.", type: msgType.success });
                yield put(deleteOrderSuccess(action.payload));
            }
        } catch (e) {
            console.log(e);
            customNotification({ message: e.message, type: msgType.error });
            yield put(orderError(e.message))
        }

    })
}

export default function* rootSaga() {
    yield all([
        getAllOrderSaga(),
        getLimitedOrderSaga(),
        createOrderSaga(),
        editOrderSaga(),
        deleteOrderSaga()
    ])
}
