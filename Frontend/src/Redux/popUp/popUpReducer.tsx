import { HeaderState } from "./types";

const initialState: HeaderState = {
    showLogIn: false,
    showRegister: false,
    user:null,
    showMenu:false
}

export function popUpReducer (state: HeaderState= initialState, action: any) {
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