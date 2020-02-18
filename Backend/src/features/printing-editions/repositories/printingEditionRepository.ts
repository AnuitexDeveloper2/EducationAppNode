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
    //let query;
    let tableSort: any = {'title': filter.sortType};

   let query =  printingEditionModel.find().populate('author_ids'/*{path:'author_ids', select:'name',match:{name: {$regex:new RegExp( filter.searchString, 'i') }}}*/).find({ "author_ids.name": { $regex:new RegExp( filter.searchString, 'i') } });
  
   
  const res  = await query.find({ "author_ids.name": { $regex:new RegExp( filter.searchString, 'i') } })
    
  console.log(res)
   
    if (filter.searchString !=null) {
        //query = printingEditionModel.find({ $or:[{ title: { $regex:new RegExp( filter.searchString, 'i') } }, { author_ids: { $regex: new RegExp( filter.searchString, 'i') } }] });
        //query = printingEditionModel.populate({path:('author_ids'),match:{name: { $regex:new RegExp( filter.searchString, 'i') }} }).find({ author_ids: { $ne: undefined } });
    }

    
    if(filter.sortType == 0) {
        tableSort = {'_id': filter.sortType};
    }
    
    const options = {
        sort: tableSort,
        lean: true,
        //populate:({path:('author_ids'),match:{name: { $regex:new RegExp( filter.searchString, 'i') }} }),
        page: filter.pageNumber, 
        limit: filter.pageSize,
      
    };
    
      await printingEditionModel.paginate(query,options).then(function(result){
        count = result.total
        data =  data
    }).catch();

    
    const response: BaseResponse<PrintingEdition> = {data: data, count:count}
       
    return response;
}