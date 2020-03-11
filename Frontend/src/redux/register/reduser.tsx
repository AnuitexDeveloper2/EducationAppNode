import {  RegisterState } from "../register/types";


export const initialState: RegisterState = {
    email: "",
    password: "",
    userName: "",
    avatar: "",
    firstName: "",
    lastName: "",
    isLoading: false,
    error: ""
  };

export function registerReducer(state: RegisterState = initialState, action: any) {
    switch (action.type) {
        case `@@register/DO_REGISTER`: {
          return {
            ...state,
            loading: true
          };
        }
        case `@@register/REGISTER_FAILED`: {
          const { data } = action.payload;
          return {
            ...state,
            data,
            loading: false,
            error: "error"
          };
        }
    
        case `@@register/REGISTER_SUCCESS`: {
          const { data } = action.payload;
          return {
            ...state,
            token: data,
            loading: false
          };
        }
    
        default:
          return state;
    }
  }