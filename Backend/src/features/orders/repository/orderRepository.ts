import ordersModel from "../../../dataAccess/entityModels/orders";
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";



export async function createOrderAsync(orderParam: ordersModel): Promise<boolean> {
    const result = await ordersModel.create(orderParam);

    if (result == null) {
        return false
    }

    return true;
}

export async function getOrdersForAdminAsync(filter: OrderFilter) {
    let query;
    let count;
    let data = new Array<ordersModel>();
     query = ordersModel.find().populate("user_id").populate("items.OrderItem.printing_edition_id");

    const options = {
        sort: "_id",
        lean: true,
        page: filter.pageNumber, 
        limit: filter.pageSize,
    }
    await ordersModel.paginate(query,options).then(function(result){
        count = result.total
        data =  result.docs
    }).catch();
    const response: BaseResponse<ordersModel>={data: data,count:count}
    return response;;  
}

export async function getOrdersForUserAsync(id: number): Promise<Array<ordersModel>> {

    const result = await ordersModel.find({user_id: id}).select("Items").populate("items.OrderItem.printing_edition_id");

    if (result.length == 0) {
        return null
    }

    return result;
}