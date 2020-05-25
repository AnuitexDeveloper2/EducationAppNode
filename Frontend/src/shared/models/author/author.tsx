export interface AuthorModel {
    _id: string
    name: string;
    product_ids: Array<string>;
}

export interface AuthorResponceModel {
    count: Number,
    data:Array<AuthorModel>
}