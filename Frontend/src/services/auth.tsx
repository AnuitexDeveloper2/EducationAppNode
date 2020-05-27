import  axios  from "axios";
import { ResponseModel, LogInResponseModel, UserResponseModel } from "../shared/models/responseModels";

export async function register (user: any): Promise<ResponseModel> {
    const result = await axios.post('http://localhost:8000/auth/register',{user});
    return result.data;
} 

export async function signIn (user: any): Promise<LogInResponseModel> {
    const result = await axios.post('http://localhost:8000/auth/logIn',user);
    return result.data;
}

export async function oauthSignIn(user: any): Promise<LogInResponseModel> {
    const result = await axios.post('http://localhost:8000/auth/oAuth',user);
    return result.data;
} 

export async function confirmedEmail(id: string): Promise<UserResponseModel> {
    const _id = id;
    debugger
    const result = await axios.post('http://localhost:8000/auth/confirmedEmail',{_id});
    return result.data;
}