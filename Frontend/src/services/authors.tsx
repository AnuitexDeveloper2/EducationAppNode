import axios from "axios"
import { AuthorModel } from "../shared/models/printingEdition/printingEditionModel"
import { BaseFilter } from "../shared/models/baseFilterModel"

export async function getAuthors(): Promise<Array<AuthorModel>> {
    const result = await axios.post('http://localhost:8000/admin/author/get').catch()
    return result.data
}

export async function getAuthorsForAdmin(filter:BaseFilter) {
    debugger
    const result = await axios.post('http://localhost:8000/admin/author',filter)
    return result.data;
}
