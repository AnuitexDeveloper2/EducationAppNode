import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { PrintingEdition } from "../api";
import * as authorRepository from "../../authors/repositories/authorRepository"
import { isNull } from "util";


export async function createAsync(printingEditionParam: printingEditionModel): Promise<boolean> {
    const result = await printingEditionModel.create(printingEditionParam);
    
    if (result == null) {
        return false;
    }
    for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
        authorRepository.addProductAsync(printingEditionParam.author_ids[index],result.id)
        
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

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<boolean> {
    const printingEdition = printingEditionModel.findById(printingEditionParam._id);
    
    for (let index = 0; index <(await printingEdition).author_ids.length; index++) {
        authorRepository.removeProductAsync( (await printingEdition).author_ids[index],(await printingEdition)._id)
    }
    
    for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
        authorRepository.addProductAsync(printingEditionParam.author_ids[index],(await printingEdition)._id);
        
    }
    
    const result = await printingEditionModel.update(printingEdition,printingEditionParam);
    if (result.nModified == 0) {
        return false;
    }
    
    return true;
    
}

export async function getById(id: string): Promise<printingEditionModel> {
   
    const printingEdition = await printingEditionModel.findById(id).populate('author_ids').select(['title','name']);

    return printingEdition;
}

export async function getPrintingEditionsAsync(filter:PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {
    let data= new Array<PrintingEdition>();
    let count;
    let query;
    let tableSort: any = {'title': filter.sortType};
   
    if (filter.searchString !=null) {
        query = printingEditionModel.find().find({ title: { $regex: new RegExp( filter.searchString,'i')} })
    }

    
    if(filter.sortType == 0) {
        tableSort = {'_id': filter.sortType};
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        populate:({path:('author_ids'),select:(['name'])}),
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