import React, { useState, useEffect } from "react";
import  ReactTable  from "react-table-v6";
import '../../shared/css/table.css'
import { getMyOrder } from "../../services/order";

export function MyOrders () {

    const [state, setState] = useState({
        data:[],
    })

    useEffect(() => {
        getData(0)},[])

        const getData = async(pageNumber) => {
            debugger
            const user = JSON.parse(localStorage.getItem("User"))
            debugger
            const result = await getMyOrder(user._id)
            if (result.err!==null) {
              setState({data:result.err})
            }
        }

    const columns = [
        {
            Header: "Date",
            accessor: "createdDate"
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
        <ReactTable
         className="-striped -highlight"
         columns={columns}
         data={state.data}
         defaultPageSize={10}
        />
    </div>)
}