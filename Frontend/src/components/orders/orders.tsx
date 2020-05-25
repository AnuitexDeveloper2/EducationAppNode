import React, { useState, useEffect } from "react";
import { getOrders } from "../../services/order";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { SortType } from "../../shared/enums/sortType";
import "./orders.css"
import '../../shared/css/table.css'
import  ReactTable  from "react-table-v6";

export function Orders () {

    const [state, setState] = useState({
        data:[],
        pages:0
    })

    useEffect(() => {
        getData(0)},[])
        
    async function getData(pageNumber) {
        debugger
       const filter : BaseFilter ={
         pageNumber: pageNumber+1,
         sortType: SortType.None,
         searchString: "",
         pageSize: 10
       }
       const result= await getOrders(filter);
       setState({data:result.err.data,pages: Math.floor(result.err.count/10+1)})

    }

    const columns = [
        {
            Header: "Date",
            accessor: "createdDate"
        },
        {
            Header: "User Name",
            id:'user_id',
          accessor: (data) => {
            return(
              <>
              {<div> {data.user_id.firstName} {data.user_id.lastName} </div>}
            </>
            )
          },
        },
        {
            Header: "User Email",
            accessor: "user_id.email"
        },
        {
            Header: "Product",
            id:'printing_edition_id.productType',
          accessor: (data) => {
              debugger
            return(
              <>
              {data.items.map((product: any,i) =><div key={i}> {product.printing_edition_id.productType} </div>)}
            </>
            )
          },
        },
        {
            Header: "Title",
            id:'printing_edition_id.title',
          accessor: (data) => {
            return(
              <>
              {data.items.map((product: any,i) =><div key={i}> {product.printing_edition_id.title} </div>)}
            </>
            )
          },
        },
        {
            Header: "Qty",
            id:'printing_edition_id.count',
            accessor: (data) => {
              return(
                <>
                {data.items.map((product: any,i) =><div key={i}> {product.count} </div>)}
              </>
              )
            },
        },
        {
            Header: "Order Amount",
            accessor: "amount"
        },
    ]
    return(
    <div>
        <div className="page-label">
            Order Managment
        </div>
        <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={state.data}
        defaultPageSize={10}
        manual
        pages={state.pages}
        onFetchData={(state) =>{
             getData(state.page)
        }}
        />
    </div>)
}