import axios from "axios";
import { baseUrl } from "../config";
import {
  ResponseModel,
  LogInResponseModel,
  UserResponseModel,
} from "../shared/models/responseModels";

export async function register(user: any): Promise<ResponseModel> {
  const result = await axios.post(`${baseUrl}/auth/register`, {user});
  return result.data;
}

export async function signIn(user: any): Promise<LogInResponseModel> {
  const result = await axios.post(`${baseUrl}/auth/logIn`, user);
  return result.data;
}

export async function oauthSignIn(user: any): Promise<LogInResponseModel> {
  const result = await axios.post(`${baseUrl}/auth/oAuth`, user);
  return result.data;
}

export async function forgotPassword(email: string): Promise<boolean> {
  const result = await axios.get(`${baseUrl}/auth/${email}`)
  return result.data
}

export async function confirmedEmail(id: number): Promise<UserResponseModel> {
  const _id = id;
  const result = await axios.post(`${baseUrl}/auth/confirmedEmail`, {_id});
  return result.data;
}
