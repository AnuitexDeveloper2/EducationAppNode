import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import { findById } from "../../user/repositories/userRepositiry";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { BaseFilterModel } from "../../shared/filterModels/baseFilterModel";
import { PrintingEdition } from "../api";
import authorModel from "../../../dataAccess/entityModels/author";


export async function createAsync(printingEditionParam: printingEditionModel): Promise<boolean> {
    const result = await printingEditionModel.create(printingEditionParam);
    if (result == null) {
        return false;
    }
    return true;
}

export async function removeAsync(id: string): Promise<boolean> {
    let model = new printingEditionModel();
    const printingEdition =  printingEditionModel.findById(id);
    if ( printingEdition == null) {
        return false;
    }
    model = await printingEdition;
   // model.removed_at = false;
    const result = await printingEditionModel.updateOne(printingEdition,model);
    if (result.nModified == 0) {
        return false;
    }
    return true;
}

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<boolean> {
    const printingEdition =  printingEditionModel.findById(printingEditionParam._id);
    if (printingEdition == null) {
        return false;
    }
    const result = await printingEditionModel.update(printingEdition,printingEditionParam);
    if (result.nModified == 0) {
        return false;
    }
    return true;
}

export async function getPrintingEditionsAsync(filter:PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {
    let data= new Array<PrintingEdition>();
    let count;
    let query;
    let tableSort: any = {'name': filter.sortType};

    let res = printingEditionModel.find().populate('author_ids')

    if (filter.searchString !=null) {
        res = printingEditionModel.find({ $or:[{ title: { $regex:new RegExp( filter.searchString, 'i') } }, { author_ids: { $regex: new RegExp( filter.searchString, 'i') } }] });
    }
    
    if(filter.sortType == 0) {
        tableSort = {'_id': filter.sortType};
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        populate: ('author_ids'),
        page: filter.pageNumber, 
        limit: filter.pageSize
    };
     
      await printingEditionModel.paginate(query,options).then(function(result){
        count = result.total
        data =  result.docs
    }).catch();
    console.log(data);
   
    const response: BaseResponse<PrintingEdition> = {data: data, count:count}
    return response;
}