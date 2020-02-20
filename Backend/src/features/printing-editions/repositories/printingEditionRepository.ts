import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import { findById, findByEmail } from "../../user/repositories/userRepositiry";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { BaseFilterModel } from "../../shared/filterModels/baseFilterModel";
import { PrintingEdition } from "../api";
import authorModel from "../../../dataAccess/entityModels/author";
import { match } from "assert";


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
    model.removed_at = true;
    const result = await printingEditionModel.update(printingEdition,model);
    if (result.nModified == 0) {
        return false;
    }
    return true;
}

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<any> {
    try {
        const printingEdition = printingEditionModel.findById(printingEditionParam._id);
        
        const result = await printingEditionModel.update(printingEdition,printingEditionParam);
        
        if (result.nModified == 0) {
            return false;
        }

    } catch (error) {

        return error;
    }
   
    return true;
}

export async function getById(id: number): Promise<printingEditionModel> {
   
    const printingEdition = await printingEditionModel.findById(id).populate('author_ids');

    return printingEdition;
}

export async function getPrintingEditionsAsync(filter:PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {
    let data= new Array<PrintingEdition>();
    let count;
    let query;
    let tableSort: any = {'title': filter.sortType};
   
    if (filter.searchString !=null) {
        query = printingEditionModel.find({ title: { $regex: new RegExp( filter.searchString,'i')} });
    }

    
    if(filter.sortType == 0) {
        tableSort = {'_id': filter.sortType};
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        populate:({path:('author_ids'),match:{name: { $regex:new RegExp( filter.searchString, 'i') }} }),
        page: filter.pageNumber, 
        limit: filter.pageSize,
      
    };
    
      await printingEditionModel.paginate(query,options).then(function(result){
        count = result.total
        data =  result.docs
    }).catch();
    
    const response: BaseResponse<PrintingEdition> = {data: data, count: count}
       
    return response;
}