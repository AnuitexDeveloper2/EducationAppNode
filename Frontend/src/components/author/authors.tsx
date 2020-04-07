import React, { useEffect, useState } from "react";
import  ReactTable  from "react-table-v6";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { getAuthorsForAdmin } from "../../services/authors";
import { SortType } from "../../shared/enums/sortType";
import '../../shared/css/table.css'
import './css/authors.css'
import { AuthorModel } from "../../shared/models/printingEdition/printingEditionModel";
import add from "../../assets/add-button-inside-black-circle.svg";
import edit from "../../assets/iconmonstr-pencil-8.svg"
import remove from "../../assets/remove.svg";
import useModal from "./useModal";
import Modal from "./create-edit";


const AuthorsForAdmin = () => {
    const [data, setData] = useState();
    const {isShowing, toggle} = useModal();
    useEffect(() => {getData()})

    const getData = async() => {
        const filter:BaseFilter = {
            searchString: '',
            pageNumber: 1,
            pageSize: 10,
            sortTable: '',
            sortType: SortType.None,
 }
        const authors = await getAuthorsForAdmin(filter)
        setData(authors.data)
    }
    const columns =[
        {
            Header:"Author",
            accessor: "name"
        },
        {
            Header:"Product",
            id:'author_ids',
            accessor: (data: AuthorModel) => {
              return(
                <>
                {data.product_ids.map((product: any,i) =><div key={i}> {product} </div>)}
              </>
              )
            },
        },
        {
            Header: "",
            Cell: props => {
                return(
                <div>
              <img src={edit} className='img__button' title="Edit Product">{props.value}</img>
              <img src={remove} className="img__button" title="Remove Product" ></img>
                </div>)
            }
        }
    ]
    return(
    <div>
      <img src={add} alt="add Book" className="add-image" onClick={toggle}/>
      <Modal isShowing={isShowing} hide={toggle}/>
      <div className="authors-table">
       <ReactTable
       className="book-table"
       columns={columns}
       data={data}
       defaultPageSize={10}
       />
     </div>
    </div>

        
    )
}
export default AuthorsForAdmin