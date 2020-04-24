import { UserModel } from "../../shared/models/user/user";

export interface HeaderState {
    showLogIn: boolean;
    showRegister: boolean;
    user:UserModel;
}