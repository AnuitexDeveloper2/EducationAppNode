import React from "react";
import './search.scss';
import { Form, Field } from "react-final-form";
import { getAuthorsForAdmin } from "../../services/authors";
import { SortType } from "../../shared/enums/sortType";
import { getPrintingEdition, getMainPage } from "../../services/printingEdition";
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { Currency } from "../../shared/enums/Currency";
import { PrintingEditionSortType } from "../../shared/enums/printingEditionSortType";

const SearchBar = ({placeholder,params,pageSize}) => {

const getData = async(value: any) => {
        debugger
        const filter:PrintingEditionFilterModel = {
            searchString: value.searchString,
            pageNumber: 1,
            pageSize: pageSize,
            sortType: SortType.None,
            currency: Currency.USD,
            tableSort: PrintingEditionSortType.Id,
            minPrice: 0,
            maxPrice:1000,
            typeProduct:undefined
    }
    if (placeholder ==="Search Author") {
        debugger
        const authors = await getAuthorsForAdmin(filter);
        params({authors: authors.data, pages: Math.floor(authors.count/10+1)});
    }
    if (placeholder === "Search Product") {
        const printingEdition = await getMainPage(filter);
        params({data: printingEdition.data,count:printingEdition.count,isLoading:true,showCreate:false})
    }
}
    return (
            <div className="search">
                <Form
                onSubmit={getData}
                render={({handleSubmit,submitting,pristine}) => (
                    <form onSubmit={handleSubmit}>
                        <Field type="text"
                           name="searchString"
                           placeholder={placeholder || "Enter value"}
                           component="input"
                       />
                <button  type="submit"  disabled={submitting || pristine}>{ "Search"}</button>
                       </form>
                )}
                />
            </div>
        )
}

export default SearchBar