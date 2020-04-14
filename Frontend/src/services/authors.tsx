import axios from "axios"
import { AuthorModel } from "../shared/models/printingEdition/printingEditionModel"
import { BaseFilter } from "../shared/models/baseFilterModel"

export async function getAuthors(): Promise<Array<AuthorModel>> {
    const result = await axios.post('http://localhost:8000/admin/author/get').catch()
    return result.data
}

export async function getAuthorsForAdmin(filter:BaseFilter) {
    const result = await axios.post('http://localhost:8000/admin/author',filter);
    return result.data;
}

export async function createAuthor(name: string) {
    const author ={name: name}
    const result = await axios.post('http://localhost:8000/admin/author/create',author);
    return result.data;
}

export async function editAuthor(author: AuthorModel) {
    const result = await axios.post('http://localhost:8000/admin/author/update',author);
    return result.data
}

export async function removeAuthor(author: AuthorModel) {
    const _id = author._id
    debugger
    const result = await axios.post(`http://localhost:8000/admin/author/delete`,{_id})
    return result.data
}
