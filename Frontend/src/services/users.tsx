import axios from "axios";
import { UserFilter } from "../shared/models/user/userFilter";
import { UserModelRequest, ResetPassword } from "../shared/models/user/user";
import { baseUrl } from "../config";

export async function getUsers(filter: UserFilter): Promise<any> {
  const result = await axios.post(`${baseUrl}/admin/user`, filter);
  return result.data;
}

export async function removeUser(id: string): Promise<Boolean> {
  const _id = id;
  const result = await axios.post(`${baseUrl}/admin/user/remove`, {_id,});
  return result.data;
}

export async function blockUser(_id: string): Promise<boolean> {
  const result = await axios.post(`${baseUrl}/admin/user/block`, {_id,});
  return result.data;
}

export async function editUser(user: UserModelRequest) {
  const result = await axios.post(`${baseUrl}/user/edit`, user);
  return result.data;
}

export async function changePassword(param: ResetPassword) {
  const result = await axios.post(`${baseUrl}/user/editPassword`, param );
  return result.data;
}

export async function getUser(_id: string): Promise<any> {
  const result = await axios.post(`${baseUrl}/user/me`, { _id });
  return result.data;
}
