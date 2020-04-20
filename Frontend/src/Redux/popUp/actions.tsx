import { UserModel } from "../../shared/models/user/user"

export function showSignInAction() {
    return{type:"SHOW_LOGIN"}
}

export function hideSignInAction() {
    return {type: "HIDE_LOGIN"}
}

export function hideRegisterAction() {
    return {type: "HIDE_REGISTER"}
}

export function showRegisterAction() {
    return{type: "SHOW_REGISTER"}
}

export function signInAction(user: UserModel) {
    debugger
    return{type: "SUCCESSFUL_SIGNIN",payload: user}
}
