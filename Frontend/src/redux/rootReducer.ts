import { LoginState } from "./logIn/types";

export interface RootState {
    error: string;
    logInn: LoginState
}