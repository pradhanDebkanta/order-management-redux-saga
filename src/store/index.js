import { compose, applyMiddleware, createStore } from "redux";
import createSagaMiddlewire from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";


const sagaMiddlewire = createSagaMiddlewire();
const middleWires = [sagaMiddlewire];
const configureStore = (preloadedState) => {
    // basic setup

    // const store = createStore(
    //     rootReducer,
    //     compose(
    //         applyMiddleware(...middleWires),
    //         typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //     )
    // );

    // advance setup
    const composeEnhancers = (process.env.NODE_ENV !== "production") && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(...middleWires),
    );
    const store = createStore(rootReducer, preloadedState, enhancer);
    sagaMiddlewire.run(rootSaga);
    return store;
}

const store = configureStore();

export default store;