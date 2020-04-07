import React from "react";
import  ReactTable  from "react-table-v6";
import './SCSS/book.css';
import '../../shared/css/table.css'
import * as PrintingEditionService from "../../services/printingEdition";
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import { PrintingEditionState } from "../../redux/printingEdition/types";
import add from "../../assets/add-button-inside-black-circle.svg";
import edit from "../../assets/iconmonstr-pencil-8.svg"
import remove from "../../assets/remove.svg";
import { PrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";
import { Create } from "./create";

export interface PrintingEditionProps {
  loadingBooks: (printingEdition: any) => object,
  isLoading: boolean,
  data: any,
  count: number
}

export class PrintingEditionsForAdmin extends React.Component<PrintingEditionProps,PrintingEditionState> {
 
    state: PrintingEditionState = {
      count: 0,
      data: [],
      isLoading: false,
      showCreate: false
    }

    filter: PrintingEditionFilterModel ={
      searchString: '',
      sortType: SortType.None,
      pageNumber: 1,
      pageSize: 10,
      sortTable: ''
    }

    getData = async () => {
      const printingEdition = await PrintingEditionService.getPrintingEdition(this.filter)
      // const { loadingBooks } = this.props;
      // loadingBooks({printingEdition});
      this.setState({
        data:printingEdition.data,
        isLoading:true
      })
      return printingEdition.data
    }

    create() {
      this.setState({
        showCreate: !this.state.showCreate
      });
    }

         render(){
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
             accessor: "type"
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
             <img src={edit} className='img__button' title="Edit Product">{props.value}</img>
             <img src={remove} className="img__button" title="Remove Product" ></img>
               </div>)
           }
            }
          ]
       if (!this.state.isLoading) {
         return(
           <div className="loading-data">
         <div className="spinner-grow text-primary" role="status">
             <span className="sr-only">Loading...</span>
         </div>
         </div>
           )
       }
       return(
          <div>
         <div className="App">
       <img src={add} alt="add Book" className="add-image" onClick={this.create.bind(this)}/>
       {this.state.showCreate ? 
          <Create
            text='Close Me'
            closePopup={this.create.bind(this)}
          />
          : null
        }
     </div>
       <ReactTable
       className="books-table"
       columns={columns}
       data={this.state.data}
       defaultPageSize={10}
       />
   </div>
        )
       }
    async componentWillMount () {
    this.getData()
    }
}
