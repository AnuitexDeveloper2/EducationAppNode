import  axios  from "axios";

export async function register (user: any) {
    const result = await axios.post('http://localhost:8000/auth/register',{user});
    return result.data;
} 

export async function signIn (user: any) {
    const result = await axios.post('http://localhost:8000/auth/logIn',user);
    return result.data;
}

export async function oauthSignIn(user: any) {
    const result = await axios.post('http://localhost:8000/auth/oAuth',user);
    return result.data;
} 

export async function confirmedEmail(id: string) {
    const _id = id;
    const result = await axios.post('http://localhost:8000/auth/confirmedEmail',{_id});
    return result.data;
}