import {AppAction}  from "./index";


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

export async function signIn(user: UserProps, redirect:any) {
    debugger;
    let test ;
   await fetch('http://localhost:8000/auth/logIn', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    }).then((token) => {
        test = token
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
