import axios from "axios";
import { AuthorModel } from "../shared/models/printingEdition/printingEditionModel";
import { BaseFilter } from "../shared/models/baseFilterModel";
import { AuthorResponseModel } from "../shared/models/author/author";
import { baseUrl } from "../config";

export async function getAuthors(): Promise<Array<AuthorModel>> {
  const result = await axios.post(`${baseUrl}/admin/author/get`)
  return result.data;
}

export async function getAuthorsForAdmin(filter: BaseFilter): Promise<AuthorResponseModel> {
  const result = await axios.post(`${baseUrl}/admin/author`, filter);
  return result.data;
}

export async function createAuthor(name: string): Promise<boolean> {
  const result = await axios.post(`${baseUrl}/admin/author/create`, { name });
  return result.data;
}

export async function editAuthor(author: AuthorModel): Promise<boolean> {
  const result = await axios.put(`${baseUrl}/admin/author`, author);
  return result.data;
}

export async function removeAuthor(author: AuthorModel): Promise<boolean> {
  const _id = author.id;
  const result = await axios.delete(`${baseUrl}/admin/author/${_id}`);
  return result.data;
}
