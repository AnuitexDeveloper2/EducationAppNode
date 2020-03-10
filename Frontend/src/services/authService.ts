import  axios  from "axios";
import { LoginRequest, LoginResult } from "../redux/logIn/types";



/*export  function signIn(user: LoginRequest) {
    debugger;
    let test: any ;
    fetch('http://localhost:8000/auth/logIn', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
}*/

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

export async function signIn (user: LoginRequest) {
    debugger;
    const result = await axios.post('http://localhost:8000/auth/logIn',{user})
    
    return result.data
}