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
    isLoading: boolean;
    error: string;
  }
