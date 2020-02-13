import authorModel from "./author";

export interface BaseResponse<T> {
    data: Array<T>;
    count: number;
}