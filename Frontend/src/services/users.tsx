import  axios  from "axios";
import { BaseFilter } from "../shared/models/baseFilterModel";
import { UserModel } from "../shared/models/user/user";

export async function getUsers(filter: BaseFilter): Promise<any> {
   const result = await axios.post('http://localhost:8000/admin/user',filter)
   debugger
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