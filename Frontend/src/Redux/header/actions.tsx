import { UserModel } from "../../shared/models/user/user";

export function showCartAction() {
  return { type: "SHOW_CART" };
}

export function hideCartAction() {
  return { type: "HIDE_CART" };
}

export function showSignInAction() {
  return { type: "SHOW_LOGIN" };
}

export function hideSignInAction() {
  return { type: "HIDE_LOGIN" };
}

export function hideRegisterAction() {
  return { type: "HIDE_REGISTER" };
}

export function showRegisterAction() {
  return { type: "SHOW_REGISTER" };
}

export function signInAction(user: UserModel) {
  return { type: "SUCCESSFUL_SIGNIN", payload: user };
}

export function signOutAction() {
  return { type: "SIGN_OUT" };
}

export function showConfirmEmail() {
  return { type: "SHOW_CONFIRM" };
}

export function hideConfirmEmail() {
  return { type: "HIDE_CONFIRM" };
}

export function showForgot() {
  return { type: "SHOW_FORGOT" };
}

export function hideForgot() {
  return { type: "HIDE_FORGOT" };
}

export function showErrorAction(message: string) {
  return { type: "SHOW_ERROR", payload: message };
}

export function hideErrorEction() {
  return { type: "HIDE_ERROR" };
}
