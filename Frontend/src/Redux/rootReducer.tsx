import { combineReducers } from "redux";
import { headerReducer } from "./header/headerReducer";

export const rootReducer = combineReducers({
    headermanager: headerReducer
})