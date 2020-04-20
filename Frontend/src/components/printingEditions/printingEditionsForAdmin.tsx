import React, { useState, useEffect } from "react";
import  ReactTable  from "react-table-v6";
import './SCSS/book.css';
import '../../shared/css/table.css'
import * as PrintingEditionService from "../../services/printingEdition";
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import add from "../../assets/add-button-inside-black-circle.svg";
import { PrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";
import  CreateEditProduct  from "./create-edit";
import SearchBar from "../searchBar/search";
import  spinner  from "../../assets/spinner.gif";
import useModal from "../author/useModal";
import LastColumn from "../lastColumn/lastColumn";

// export interface PrintingEditionProps {
//   loadingBooks: (printingEdition: any) => object,
//   isLoading: boolean,
//   data: any,
//   count: number
// }

// const {isShowing, toggle} = useModal();

const PrintingEditionForAdmin =() =>{
 
  const [state,setState] = useState({
      count: 0,
      data: null,
      isLoading: false,
      showCreate: false,
      
  })

  const [product,setProduct] = useState({item:{}})
  useEffect(() => {
    getData(0)},[])
    
    const hide =() => {
      toggle("createProduct")
    }
    const {isShowing, toggle} = useModal();
    const getData = async (pageNumber) => {
      const filter: PrintingEditionFilterModel ={
        searchString: '',
        sortType: SortType.None,
        pageNumber: 1,
        pageSize: 10,
        sortTable: ''
      }
      const printingEdition = await PrintingEditionService.getPrintingEdition(filter)
      setState({data: printingEdition.data,count:1,isLoading:true,showCreate:false})
    }

    const passData = (currentProduct) => {
      setProduct({
        item: currentProduct
      })
  }
    
    const create = () => {
      setState({
        showCreate: true,
        isLoading:true,
        data: state.data,
        count: state.count
      });
    }
    
      const columns = [
        {
            Header:"Title",
            accessor: "title"
          },
          {
           Header:"Description",
           accessor: "description"
          },
          {
           Header:"Category",
           accessor: "productType"
          },
          {
           Header: 'Authors',
           id:'author_ids',
           accessor: (data: PrintingEditionModel) => {
             return(
               <>
               {data.author_ids.map((author: any,i) =><div key={i}> {author.name} </div>)}
             </>
             )
           },
         },
          
          {
           Header:"Price",
           accessor: "price"
          },
          {
           Header:"Edit",
           Cell: props => {
             return(
             <div>
               <LastColumn value = {product} assigment="product"/>
             </div>)
         }
          }
    ]
      if (!state.isLoading) {
        return(
          <div className="loading-data">
         <div className="spinner-grow text-primary" role="status">
             <span className="sr-only">
               <img src={spinner}></img>
             </span>
         </div>
         </div>
           )
          }
          return(
            <div>
         <div className="App">
           <div className="author-body">

         <div className="search-bar">
            <SearchBar placeholder="Search Product" params= {setState}/>
          </div>
          <div className="author-create">

       <img src={add} alt="add Book" className="add-image" onClick={hide}/>
          <CreateEditProduct
          isShowing={isShowing.createProduct} hide={hide} assigment="Add" value=""
          />
         
        </div>
        </div>
     </div> <br/>
     <div className="books-table">

       <ReactTable
       getTdProps={(rstate, rowInfo) => {
         
        return {
          onClick: () => {
            if (rowInfo !== undefined) {
              const currentProduct ={
                id:rowInfo.original.id,name:rowInfo.original.title,description:rowInfo.original.description,price:rowInfo.original.price
            }
              passData(currentProduct)
            }
            }}}}
       className="-striped -highlight"
       columns={columns}
       data={state.data}
      defaultPageSize={10}
      />
      </div>
   </div>
        )
      }
    
      export default PrintingEditionForAdmin
