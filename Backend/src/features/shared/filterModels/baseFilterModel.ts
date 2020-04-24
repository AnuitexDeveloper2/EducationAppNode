import { SortType } from "../enums/sortType";

export interface BaseFilterModel {
    searchString: string;
    sortType: SortType;
    pageNumber: number;
    pageSize: number;
}