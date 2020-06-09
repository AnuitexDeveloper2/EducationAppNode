import userModel  from "../../../dataAccess/entityModels/user";
import {User, ResetPassword} from"../api";
import bcrypt from "bcrypt";
import {Error} from '../../shared/constants/error';
import { UserFilterModel } from "../../shared/filterModels/userFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";
import { UserFilterType } from "../../shared/enums/userFilterType";
import { checkPassword } from "../../auth/auth.service";

export async function getUserAsync (userParam: User)  {
    const result = await userModel.findOne({email: userParam.email})
        
    if (result == null) {
            throw Error.userNotFound;
        }
        return result;
    };

    

    export async function editAsync(userParam: userModel): Promise<any> {
       
        const user = await userModel.findById(userParam.id);
        let result;

        try {
             result = await userModel.updateOne(user, userParam);
        } catch (error) {
            return error;
        }
    
        if (result.nModified == 0) {
          return false;
        }
        const updatedUser = await userModel.findById(userParam.id)
    
        return updatedUser ;
    }

    export async function updateOneAsync(id: string,prop:any): Promise<any> {
        const result = await userModel.findByIdAndUpdate(id, prop);
        if (result=== null) {
            return false;
        }
    
        return result;
    }

    export async function blockUserAsync(id:string): Promise<Boolean> {
        let model = new userModel();
        const user =  userModel.findById(id);
        model = await user;
        model.status =  !(await user).status;
        const result = await userModel.update(user, model);
        
        if (result.nModified == 0) {
            return false;
        }
    
        return true;
    }

    export async function changePasswordAsync(param: ResetPassword): Promise<boolean> {
        let model = new userModel();
        const user =  userModel.findById(param.id);
        const isPasswordMatch =  checkPassword(param.oldPassword, await user);
        
        if (!isPasswordMatch) {
            return false ;
        }
        model = await user;
        const salt = bcrypt.genSaltSync(10);
        model.passwordHash = bcrypt.hashSync(param.newPassword, salt);
        const result = await userModel.update(user, model);

        if (result.nModified == 0) {
            return false;
        }

        return true;
    }

    export async function findByEmail(email: string): Promise<any> {
       let user = await userModel.findOne({email});

       if (user == null) {
           return false;
       }
        return user.email;
    }

    export async function findByIdAsync(id: string): Promise<userModel> {
        let user = new userModel();
        try {
          user = await userModel.findById(id);
      } catch (error) {
          return error.message
      }

        return user; 
    }

    export async function findByUserName(userName: string): Promise<boolean> {
        
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
        query =  userModel
        .find( {$and:[{ $or:[{ lastName: { $regex:new RegExp( filter.searchString, 'i') } }, { firstName: { $regex: new RegExp( filter.searchString, 'i') } }] },{ removed_at: false }]});
    }
    if (filter.userType !== UserFilterType.All) {
        query = filter.userType ===UserFilterType.Active? query.find({status:false}) : query.find({status:true})
        
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
    const response: BaseResponse<userModel> = { data: data,count:count }
     return response;
    }

