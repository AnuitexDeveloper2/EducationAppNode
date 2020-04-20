import  axios  from "axios";
import { UserFilter } from "../shared/models/user/userFilter";

export async function getUsers(filter: UserFilter): Promise<any> {
   const result = await axios.post('http://localhost:8000/admin/user',filter)
   return result.data
}

export async function removeUser(id:string) :Promise<Boolean> {
   const _id = id;
   debugger
   const result = await axios.post('http://localhost:8000/admin/user/remove',{_id});
   return result.data;
}

export async function blockUser(_id:string):Promise<boolean> {
   debugger
   const result = await axios.post('http://localhost:8000/admin/user/block',{_id});
   return result.data;
}