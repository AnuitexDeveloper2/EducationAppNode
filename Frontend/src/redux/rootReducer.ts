import { LoginState} from "./logIn/types";
import { RegisterState } from "./register/types";
import { Reducer, combineReducers } from "redux";
import { logInReducer} from "./logIn/reduser";
import { registerReducer } from "./register/reduser";


export interface RootState {
    logIn: LoginState
    register: RegisterState
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
    logIn: logInReducer,
    register: registerReducer
})

export default rootReducer