import { HeaderState } from "./types";

const initialState: HeaderState = {
    showLogIn: false,
    showRegister: false,
    showCart:false,
    user:null,
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
        case "HIDE_CART":
            return {...state,showCart:false}
        case "SHOW_CART":
            return {...state,showCart:true}
        default:
            return state
    }

    return state;
}