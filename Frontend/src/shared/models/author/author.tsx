export interface AuthorModel {
    _id: string
    name: string;
    product_ids: Array<string>;
}

export interface AuthorResponseModel {
    count: number,
    data:Array<AuthorModel>
}