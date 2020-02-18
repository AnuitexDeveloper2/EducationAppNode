import userModel  from "../../../dataAccess/entityModels/user";
import {User} from"../api";
import bcrypt from "bcryptjs";
import {Error} from '../../shared/constants/error';
import { UserFilterModel } from "../../shared/filterModels/userFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
   

export async function getUserAsync (userParam: User)  {
    let result = await userModel.findOne({email: userParam.email})
        if (result == null) {
            throw Error.userNotFound;
        }
        return result;
    };

    
    export async function checkPasswordAsync(password: string, user: User) {
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return false
        }
        return true;
    }

    export async function editAsync(userParam: User, user:userModel): Promise<boolean> {
    
        Object.assign(user, userParam);
    
        let result =  await user.save();
    
        if (result == null) {
          false;
        }
    
        return true;;
    }

    export async function removeOneAsync(userParam: userModel) {
        let user = await userModel.findById(userParam);
        
        if (user == null) {
            throw Error.userNotFound
        }

        let result = await userModel.findByIdAndRemove(userParam._id)
        console.log(result);
    }

    export async function findByEmail(email: string): Promise<boolean> {
       let user = await userModel.findOne({ email: email });
       if (user == null) {
           return false;
       }
        return true;
    }

    export async function findById(id: string) {
      
        return await userModel.findById(id);
    }

    export async function findByUserName(userName: string) {
        
        let result = await userModel.findOne({userName: userName})
        if (result == null) {
            return false;
        }
         return true;
    }

    export async function getUsersAsync(filter: UserFilterModel) {
        let count;
    let query;
    let tableSort: any = {'firstName':filter.sortType};
    let data= new Array<userModel>();

    if (filter.searchString !=null) {
        query =  userModel.find( { $or:[{ lastName: { $regex:new RegExp( filter.searchString, 'i') } }, { firstName: { $regex: new RegExp( filter.searchString, 'i') } }] });
    }

    if(filter.sortType == 0) {
        tableSort = { '_id': filter.sortType };
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        page: filter.pageNumber, 
        limit: filter.pageSize
    };
    
    await userModel.paginate(query,options).then(function(result){
        count = result.total
        data =  result.docs
    }).catch();
    const response: BaseResponse<userModel> = { data:data,count:count }
     return response;
    }

