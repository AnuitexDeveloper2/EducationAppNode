import authorModel from "../../../dataAccess/entityModels/author";
import * as authorRepository from "../repositories/authorRepository"
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import  authorVlidateSchema  from "../operations/AuthorRequest.schema.json";
import idValidateSchema from "../../utils/IdRequest.schema.json";

 let author = new authorModel();
export async function createAsync(authorParam: authorModel): Promise<any>  {
  const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   
    if (!validateResult.valid) {
       return {message: "Invalid AuthorCreate request", error: validateResult.errors}
    }

   const result = await authorRepository.createAsync(authorParam);
   if (!result) {
      return "aurhor did not create"
   }
   return {message: "Invalid id parametr", error: validateResult.errors};
}

export async function removeAsync(id: string): Promise<any> {
   const validateResult = validateWithJsonSchema(id,idValidateSchema)
   if (!validateResult.valid) {
      return "id is not valid"
   }
   const result = await authorRepository.removeAsync(id);
   if (!result) {
      return "author did not remove";
   }
   return result;
}

export async function updateAsync(authorParam: authorModel): Promise<any> {
   const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   
   if (!validateResult.valid) {
      return {message: "Invalid Author Update request", error: validateResult.errors}
   }

  
   const result = await authorRepository.updateAsync(authorParam);
   if (!result) {
      return "aurhor did not update"
   }
   return result;

}

export async function GetAuthorsAsync(filter: AuthorFilterModel): Promise<BaseResponse<authorModel>> {
   const result = await authorRepository.GetAuthorsAsync(filter);
   return result
}