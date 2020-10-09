import React, { useState, useEffect } from "react";
import ReactTable from "react-table-v6";
import "../../shared/css/table.css";
import { getMyOrder } from "../../services/order";
import { OrderItem, Order } from "../../shared/models/order/orderModel";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";


export function MyOrders() {
  const [state, setState] = useState({
    data: new Array<Order>(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    const result = await getMyOrder(user.id);
    if (result !== null) {
      setState({ data: result });
    }
  };

  const columns = [
    {
      Header: "Date",
      id: "data.date",
      accessor: (data: Order) => {
        const time = new Date().toLocaleDateString() +' '+new Date().toLocaleTimeString()
        return (
          <>
          {time}
          </>
        )
      }
    },
    {
      Header: "Product",
      id: "printing_edition_id.productType",
      accessor: (data: Order) => {
        return (
          <>
            {data.orderItem.map((item: OrderItem, i) => (
              <div key={i}> {PrintingEditionType[item.book.category]} </div>
            ))}
          </>
        );
      },
    },
    {
      Header: "Title",
      id: "printing_edition_id.title",
      accessor: (data) => {
        return (
          <>
            {data.orderItem.map((item: OrderItem, i) => (
              <div key={i}> {item.book.title} </div>
            ))}
          </>
        );
      },
    },
    {
      Header: "Qty",
      id: "printing_edition_id.count",
      accessor: (data) => {
        return (
          <>
            {data.orderItem.map((product: any, i) => (
              <div key={i}> {product.count} </div>
            ))}
          </>
        );
      },
    },
    {
      Header: "Order Amount",
      accessor: "amount",
    },
  ];
  return (
    <div>
      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={state.data}
        defaultPageSize={10}
      />
    </div>
  );
}
