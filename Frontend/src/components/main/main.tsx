import React, { useState, useEffect } from "react";
import { Grid, Paper, Theme, makeStyles, createStyles } from '@material-ui/core';
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import { getPrintingEdition } from "../../services/printingEdition";
import  spinner  from "../../assets/spinner.gif";
import { PrintingEditionModel, AuthorModel } from "../../shared/models/printingEdition/printingEditionModel";
import "./main.css"


export default function MainPage() {

    const [state,setState] = useState({
        count: 0,
        data: null,
        isLoading: false,
        showCreate: false,
  
    })

    const getData = async (pageNumber) => {
        const filter: PrintingEditionFilterModel ={
          searchString: '',
          sortType: SortType.None,
          pageNumber: 1,
          pageSize: 6,
          sortTable: ''
        }
        const printingEdition = await getPrintingEdition(filter)
        setState({data: printingEdition.data,count:1,isLoading:true,showCreate:false})
      }

  useEffect(() => {
    getData(0)},[])

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
  return (
    <div className="grid">
    {state.data.map((item:PrintingEditionModel) =>(
        <div>
           <span className="grid-title"> {item.title} </span>
           <span className="grid-authors">
                {item.author_ids.map((author:AuthorModel)=>(
                <div>{author.name}</div>))}
            </span>
           <span className="grid-price"> ${item.price}</span>
        </div>
    ))}
  </div>
  );
}
