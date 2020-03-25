import { combineReducers } from "redux";
import { popUpReducer } from "./popUp/popUpReducer";

export const rootReducer = combineReducers({
    popUpmanager: popUpReducer
})