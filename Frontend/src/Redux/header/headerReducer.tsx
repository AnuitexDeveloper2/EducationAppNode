import { HeaderState } from "./types";

const initialState: HeaderState = {
  showLogIn: false,
  showRegister: false,
  showCart: false,
  showConfirm: false,
  user: null,
};

export function headerReducer(state: HeaderState = initialState, action: any) {
  switch (action.type) {
    case "SHOW_LOGIN":
      return { ...state, showLogIn: true };
    case "SHOW_REGISTER":
      return { ...state, showRegister: true };
    case "HIDE_LOGIN":
      return { ...state, showLogIn: false };
    case "HIDE_REGISTER":
      return { ...state, showRegister: false };
    case "HIDE_CART":
      return { ...state, showCart: false };
    case "SHOW_CART":
      return { ...state, showCart: true };
    case "SIGN_OUT":
      return { ...state, user: null };
    case "SHOW_CONFIRM":
      return { ...state, showConfirm: true };
    case "HIDE_CONFIRM":
      return { ...state, showConfirm: false };
    default:
      return state;
  }
}
