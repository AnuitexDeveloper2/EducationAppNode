export interface BaseResponse<T> {
    data: Array<T>;
    count: number;
}

export interface ResponseModel {
    result: boolean;
    error: string
}   