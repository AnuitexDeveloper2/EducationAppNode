import { SortType } from "../enums/sortType";

export interface BaseFilter {
    searchString: string;
    sortType: SortType;
    pageNumber: number;
    pageSize: number;
}