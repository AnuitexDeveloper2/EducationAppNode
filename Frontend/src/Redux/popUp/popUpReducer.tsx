import { PopUpState } from "./types";

const initialState: PopUpState = {
    showLogIn: false,
    showRegister: false
}

export function popUpReducer (state: PopUpState= initialState, action: any) {
    switch (action.type) {
        case "SHOW_LOGIN":
            return {...state,showLogIn: true}
        case "SHOW_REGISTER":
            return {...state,showRegister:true}
        case "HIDE_LOGIN":
            return {...state,showLogIn:false}
        case "HIDE_REGISTER":
            return {...state,showRegister:false}
        default:
            return state
    }

    return state;
}