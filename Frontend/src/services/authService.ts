import  axios  from "axios";
import { LoginRequest, LoginResult } from "../redux/logIn/types";
import { RegisterRequest } from "../redux/register/types";



export async function register (user: RegisterRequest) {
    debugger;
    const result = await axios.post('http://localhost:8000/auth/register',{user})
    return result
} 

export function moveFacebook() {
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
    const result = await axios.post('http://localhost:8000/auth/logIn',user)
    
    return result.data
}