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
import CreateEdit from "./create-edit";
import { AuthorColumns } from "../../shared/constants/columns";
import EditDelete from "../deleteEdit.tsx/lastColumn";
import SearchBar from "../searchBar/search";


const AuthorsForAdmin = () => {
    const [data, setData] = useState();
    const [author,setAuthor] = useState({
      author: {
        name:''
      }
    })

    const hide = () => {
      toggle("edit")
    }

    const passData = (currentAuthor) => {
        setAuthor({
          author:currentAuthor
        })
    }

    const {isShowing, toggle} = useModal();

    useEffect(() => {
      getData()},[])

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

    
    const columns = [
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
                <>
              <EditDelete  value={author}/>
              </>
              )
          }
      }
  ]
    return(
    <div className="author-page">
      <div className ="author-header">
        <div className="authors-title">
        Authors Page
        </div>
        <br/>
        <div className="author-body">
          <div className="search-bar">
            <SearchBar placeholder="Search Author" params= {setData}/>
          </div>
          <div className="author-create">
      <img src={add} alt="add Book" className="author-add-image" title="Add new Author" onClick={hide}/>
          </div>
        </div>
      </div>
      <CreateEdit isShowing={isShowing.create} hide={hide} assigment="Add" value=""/>
      <div className="authors-table">
       <ReactTable
       getTdProps={(rstate, rowInfo) => {
        return {
          onClick: () => {
            if (rowInfo !== undefined) {
              passData(rowInfo.original)
            }
            }}}}
       className="book-table -striped -highlight"
       columns={columns}
       data={data}
       defaultPageSize={10}
       />
     </div>
    </div>

        
    )
}
export default AuthorsForAdmin