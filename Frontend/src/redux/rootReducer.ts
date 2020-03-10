import { LoginState } from "./logIn/types";
import { Reducer, combineReducers } from "redux";
import { logInReducer } from "./logIn/reduser";


export interface RootState {
    logIn: LoginState
}

const rootReducer  : Reducer<RootState> = combineReducers<RootState>({
    logIn: logInReducer
})

export default rootReducer