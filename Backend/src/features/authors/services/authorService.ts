import authorModel from "../../shared/db-models/author";
import * as authorRepository from "../repositories/authorRepository"
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/db-models/authorResponse";

 let author = new authorModel();
 author.errors = new Array<string>();
export async function createAsync(authorParam: authorModel) : Promise<Array<string>> {
   authorParam.errors = new Array<string>();
   if (authorParam.name == null) {
      authorParam.errors.push('field is empty');
     return authorParam.errors; 
    
   }
   const result = await authorRepository.createAsync(authorParam);
   if (!result) {
      authorParam.errors.push('did not create author');
   }
   return authorParam.errors;
}

export async function removeAsync(id: string) {
   const result = await authorRepository.removeAsync(id);
   if (!result) {
      author.errors.push('failed to delete');
   }
   return author.errors.push('removal was successful');
}

export async function updateAsync(authorParam: authorModel) {
   
   if (authorParam.name == null) {
      author.errors.push('field is empty')
   }
   const result = await authorRepository.updateAsync(authorParam);

}

export async function GetAuthorsAsync(filter: AuthorFilterModel): Promise<BaseResponse<authorModel>> {
   const result = await authorRepository.GetAuthorsAsync(filter);
   return result
}