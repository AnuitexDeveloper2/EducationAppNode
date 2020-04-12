import React from "react";
import './search.scss';
import { Form, Field } from "react-final-form";
import { getAuthorsForAdmin } from "../../services/authors";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { SortType } from "../../shared/enums/sortType";

const SearchBar = ({placeholder,params}) => {

const getData = async(value: any) => {
        debugger
        const searchString = value
        const filter:BaseFilter = {
            searchString: value.searchString,
            pageNumber: 1,
            pageSize: 10,
            sortTable: '',
            sortType: SortType.None,
    }
        const authors = await getAuthorsForAdmin(filter)
        params(authors.data)
        debugger
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