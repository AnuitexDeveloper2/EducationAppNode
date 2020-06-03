import authorModel from "../../../dataAccess/entityModels/author";
import * as authorRepository from "../repositories/authorRepository"
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import authorVlidateSchema from "../validateSchemas/AuthorRequest.schema.json";
import idValidateSchema from "../../utils/IdRequest.schema.json";
import logger from "../../utils/logger";

let author = new authorModel();
export async function create(authorParam: authorModel): Promise<boolean> {
   const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   logger.info(`>>>> authorService.create(), with: author = ${JSON.stringify(authorParam)}`)

   if (!validateResult.valid) {
      logger.error(`>>>> authorService.create(), invalid data = ${validateResult.errors}`)
      return false
   }

   const result = await authorRepository.create(authorParam);

   if (!result) {
      logger.error(`>>>> authorService.create(), result = ${result}`)
      return false
   }

   return true;
}

export async function remove(id: string): Promise<boolean> {
   const validateResult = validateWithJsonSchema(id, idValidateSchema)
   logger.info(`>>>> authorService.remove(), with: Id = ${JSON.stringify(id)}`)

   if (!validateResult.valid) {
      logger.error(`>>>> authorService.remove(), invalid data = ${validateResult.errors}`)
      return false
   }

   const result = await authorRepository.remove(id);

   if (!result) {
      logger.error(`>>>> authorService.create(), result = ${result}`)
      return false;
   }

   return true;
}

export async function update(authorParam: authorModel): Promise<boolean> {
   console.log(authorParam)
   const validateResult = validateWithJsonSchema(authorParam, authorVlidateSchema)
   logger.info(`>>>> authorService.update(), with: author = ${JSON.stringify(authorParam)}`)

   if (!validateResult.valid) {
      logger.error(`>>>> authorService.update(), invalid data = ${validateResult.errors}`)
      return false
   }


   const result = await authorRepository.update(authorParam);
   if (!result) {
      logger.error(`>>>> authorService.update(), result = ${result}`)
      return false
   }
   return true;
}

export async function getAll(): Promise<Array<authorModel>> {
   logger.info('>>>> authorService.get()');
   const result = await authorRepository.GetAll();
   if (result.length == 0) {
      logger.error('>>>> authorService.get(), list of authors is empty')
   }
   return result;
}

export async function getAuthors(filter: AuthorFilterModel): Promise<BaseResponse<authorModel>> {
   logger.info(`>>>> authorService.getAuthors(), with: filter = ${JSON.stringify(filter)}`)
   const result = await authorRepository.GetAuthors(filter);
   return result
}