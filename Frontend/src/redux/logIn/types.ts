export enum LoginActions {
    DO_LOGIN = "DO_LOGIN",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED"
  }

export interface LoginRequest {
    email: string;
    password: string;
  }

export interface LoginResult {
    token: string;
  }

  export interface LoginState {
    email: string;
    password: string;
    showPopup: boolean;
    isLoading: boolean;
    error: string;
  }