import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";
import { PrintingEdition } from "../api";
import * as authorRepository from "../../authors/repositories/authorRepository"
import { PrintingEditionType } from "../../printing-editions/enums";


export async function create(printingEditionParam: printingEditionModel): Promise<boolean> {
    const result = await printingEditionModel.create(printingEditionParam);
    if (result == null) {
        return false;
    }
    console.log(result)
    for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
        authorRepository.addProduct(printingEditionParam.author_ids[index], result.id)
    }

    return true;
}

export async function remove(id: string): Promise<boolean> {
    let model = new printingEditionModel();
    const printingEdition = printingEditionModel.findById(id);
    if (printingEdition == null) {
        return false;
    }

    model = await printingEdition;
    model.removed_at = true;
    const result = await printingEditionModel.update(printingEdition, model);
    if (result.nModified == 0) {
        return false;
    }
    return true;
}


export async function update(printingEditionParam: printingEditionModel, _id: string): Promise<boolean> {
    const printingEdition = printingEditionModel.findById(_id);

    for (let index = 0; index < (await printingEdition).author_ids.length; index++) {
        authorRepository.removeProduct((await printingEdition).author_ids[index], (await printingEdition)._id)
    }
    for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
        authorRepository.addProduct(printingEditionParam.author_ids[index], (await printingEdition)._id);

    }

    const result = await printingEditionModel.update(printingEdition, printingEditionParam);
    if (result.nModified == 0) {
        return false;
    }

    return true;

}

export async function getById(id: string): Promise<printingEditionModel> {

    const printingEdition = await printingEditionModel.findById(id).populate('author_ids').select(['title', 'name']);

    return printingEdition;
}

export async function getPrintingEditions(filter: PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {
    
    let data = new Array<PrintingEdition>();
    let count;
    let query;
    let tableSort: any = { '_id': filter.sortType };
    let type = {}
    if (filter.typeProduct !== undefined) {
        type = { productType: PrintingEditionType[filter.typeProduct] }
    }
    if (filter.searchString != null) {
        query = printingEditionModel.find()
            .find({
                $and: [
                    { title: { $regex: new RegExp(filter.searchString, 'i') } },
                    { removed_at: false },
                    { price: { $gte: filter.minPrice } },
                    { price: { $lte: filter.maxPrice } },
                    type
                ]
            })
    }
    if (filter.tableSort === 1) {
        tableSort = { 'price': filter.sortType };
    }
    if (filter.tableSort === 2) {
        tableSort = { 'title': filter.sortType };
    }

    const options = {
        sort: tableSort,
        lean: true,
        populate: ({ path: ('author_ids'), select: (['name']) }),
        page: filter.pageNumber,
        limit: filter.pageSize,

    };

    await printingEditionModel.paginate(query, options).then(function (result) {
        count = result.total
        data = result.docs
    }).catch();

    const response: BaseResponse<PrintingEdition> = { data: data, count: count }

    return response;
}