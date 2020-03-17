import React from "react";
import { Field, Form } from "react-final-form";
import './SCSS/book.css';
import { Table } from "react-bootstrap";
import * as PrintingEditionService from "../../services/printingEditionService";



export class PrintingEditionsForAdmin extends React.Component {

    onSubmit = async (value: any) => {
        
    }

    getData = async () => {
     const data = PrintingEditionService.getPrintingEdition()
    }

    render(){
        debugger;
        return(
          
         <div></div>
        )
    }
    componentDidMount() {
      debugger
      this.getData()
    }
}

export default PrintingEditionsForAdmin