import { Store, createStore, applyMiddleware } from "redux";
import rootReducer, { RootState } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

export default function configureStore(initialState?: RootState): Store<RootState> {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const composeEnhancers = composeWithDevTools({});   

    const enhancer = composeEnhancers(applyMiddleware(...middlewares));

    const store = createStore(rootReducer, initialState!, enhancer)

    return store
}
//parent-child = props
//child-parent= redux