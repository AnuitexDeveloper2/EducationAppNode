import {AppAction}  from "./index";
import { Observable } from "redux";
import  axios  from "axios";
import { LoginRequest } from "../../redux/logIn/types";


export interface UserProps {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string
}

 interface Register {
    type: 'SIGN_UP';
    user: UserProps
}

type Action = Register;
/*export const actionCreators = {
    addBookAction: (user: UserProps, redirect: any): AppAction<Action> => (dispatch, getState) => {
        debugger;
        const appState = getState();
        if (appState) {
            fetch(`http://localhost:8000/admin/author/create`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user)
            })
                .then(redirect)

            dispatch({  type: 'SIGN_UP', user: user });
        }
    }
}*/
export function register(user: UserProps, redirect: any) {
    debugger
    fetch(`http://localhost:8000/auth/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then(redirect)
}

export  function signIn(user: LoginRequest) {
    debugger;
    let test: any ;
    fetch('http://localhost:8000/auth/logIn', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    }).then((token) => {
        test = token.json
       return token.json()
    })
    
    console.log(test);
    const some = test;
      
    
}

export function moveFacebook() {
    let test;
    fetch('https://www.facebook.com/dialog/oauth?client_id=869634570156556&redirect_uri=http://localhost:8000/auth/callback&response_type=code',{
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
        }
    )
}
