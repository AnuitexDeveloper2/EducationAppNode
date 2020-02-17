import authorModel from "../../../dataAccess/entityModels/author";
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import  mongoose  from "mongoose";


export async function createAsync(authorParam: authorModel): Promise<boolean> {
    authorParam._id = new mongoose.Types.ObjectId()
    const result = await authorModel.create(authorParam);
    if (result == null) {
        return false;
    }
    return true;
}

export async function removeAsync(id: string): Promise<boolean> {
    const result = await authorModel.findByIdAndRemove(id)
    
    if (result == null) {
        return false;
    }

    return true;
}

export async function updateAsync(authorParam: authorModel): Promise<boolean> {
    const author = authorModel.findById(authorParam._id);
    const result = await authorModel.update(author,authorParam);
    
    if (result == null) {
        return false
    }

    return true;
}

export async function GetAuthorsAsync(filter:AuthorFilterModel): Promise<BaseResponse<authorModel>> {
    let count;
    let query;
    let tableSort: any = {'name':filter.sortType};
    let data= new Array<authorModel>();
    
    if (filter.searchString !=null) {
        query = authorModel.find({ name: { $regex: new RegExp( filter.searchString,'i')} });
    }
    
    if(filter.sortType == 0) {
        tableSort = {'_id': filter.sortType};
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        page: filter.pageNumber, 
        limit: filter.pageSize
    };
     
      await authorModel.paginate(query,options).then(function(result){
        count = result.total
        data =  result.docs
    }).catch();

    console.log(data)
    const response: BaseResponse<authorModel>={data:data,count:count}
     return response;
}