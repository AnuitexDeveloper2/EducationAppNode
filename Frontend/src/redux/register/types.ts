export interface RegisterRequest {
    email: string;
    password: string;
    avatar: string;
    firstName: string;
    lastName: string;
    userName: string;
}
export interface RegisterState {
    email: string;
    password: string;
    avatar: string;
    firstName: string;
    lastName: string;
    userName: string;
    isLoading: boolean;
    error: string;
  }

