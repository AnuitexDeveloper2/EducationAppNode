import  axios  from "axios";



export async function register (user: any) {
    debugger;
    const result = await axios.post('http://localhost:8000/auth/register',{user})
    console.log(result.data)
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

export async function signIn (user: any) {
    debugger;
    const result = await axios.post('http://localhost:8000/auth/logIn',user)
    
    return result.data
}