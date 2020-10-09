import { UserModel } from "../../shared/models/user/user";

export interface HeaderState {
  showLogIn: boolean;
  showRegister: boolean;
  showCart: boolean;
  user: UserModel;
  showConfirm: boolean;
  showForgot: boolean;
}
