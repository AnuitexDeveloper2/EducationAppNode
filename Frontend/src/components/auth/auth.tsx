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
