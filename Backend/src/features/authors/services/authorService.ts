import authorModel from "../../shared/db-models/author";
import * as authorService from "../repositories/authorRepository"


export async function create(authorParam: authorModel) : Promise<authorModel> {

   const result = authorService.create(authorParam);
   return result;
}