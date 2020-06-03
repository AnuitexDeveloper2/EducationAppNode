import authorModel from "../../../dataAccess/entityModels/author";
import { AuthorFilterModel } from "../../shared/filterModels/authorFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";


export async function create(authorParam: authorModel): Promise<boolean> {
    const result = await authorModel.create(authorParam);

    if (result == null) {
        return false;
    }
    return true;
}

export async function remove(id: string): Promise<boolean> {
    let model = new authorModel();
    const author = authorModel.findById(id);

    if (author == null) {
        return false;
    }

    model = await author;
    model.removed_at = true;
    const result = await authorModel.update(author, model);

    if (result.nModified == 0) {
        return false;
    }

    return true;
}

export async function update(authorParam: authorModel): Promise<boolean> {
    const author = authorModel.findById(authorParam._id);
    const result = await authorModel.update(author, authorParam);
    console.log(result)
    if (result.nModified == 0) {
        return false
    }

    return true;
}

export async function addProduct(authorId: string, printingEditionId: string) {
    const author = authorModel.findById(authorId)
    let model = await author;
    model.product_ids.push(printingEditionId)
    let result = await authorModel.update(author, model)

}

export async function removeProduct(authorId: string, printingEditionId: string) {
    const author = authorModel.findById(authorId);
    let model = await author;

    for (let index = 0; index < model.product_ids.length; index++) {

        if (model.product_ids[index].toString() == printingEditionId.toString()) {
            model.product_ids.splice(index, 1);
            await authorModel.update(author, model)
        }
    }
}

export async function GetAll(): Promise<Array<authorModel>> {
    const result = await authorModel.find()
    return result
}


export async function GetAuthors(filter: AuthorFilterModel): Promise<BaseResponse<authorModel>> {
    let count;
    let query;
    let tableSort: any = { 'name': filter.sortType };
    let data = new Array<authorModel>();


    if (filter.searchString != null) {
        query = authorModel.find({ $and: [{ names: { $regex: new RegExp(filter.searchString, 'i') } }, { removed_at: false }] });
    }

    if (filter.sortType == 0) {
        tableSort = { '_id': filter.sortType };
    }

    const options = {
        sort: tableSort,
        lean: true,
        page: filter.pageNumber,
        limit: filter.pageSize,
        populate: ({ path: "product_ids", select: "title" })
    };

    await authorModel.paginate(query, options).then(function (result) {
        count = result.total
        data = result.docs
    }).catch();

    const response: BaseResponse<authorModel> = { data: data, count: count }
    return response;
}