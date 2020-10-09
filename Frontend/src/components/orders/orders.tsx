import React, { useState } from "react";
import { getOrders } from "../../services/order";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { SortType } from "../../shared/enums/sortType";
import "./orders.css";
import "../../shared/css/table.css";
import ReactTable from "react-table-v6";
import { Order, OrderItem } from "../../shared/models/order/orderModel";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";

export function Orders() {
  const [state, setState] = useState({
    data: new Array<Order>(),
    pages: 0,
  });
  async function getData(pageNumber) {
    const filter: BaseFilter = {
      pageNumber: pageNumber + 1,
      sortType: SortType.None,
      searchString: "",
      pageSize: 10,
    };
    const result = await getOrders(filter);
    setState({ data: result.data, pages: Math.floor(result.count / 10 + 1) });
  }

  const columns = [
    {
      Header: "Date",
      accessor: "createdDate",
    },
    {
      Header: "User Name",
      id: "user_id",
      accessor: (data: Order) => {
        return (
          <>
            {
              <div>
                {" "}
                {data.user.firstName} {data.user.lastName}{" "}
              </div>
            }
          </>
        );
      },
    },
    {
      Header: "User Email",
      accessor: "user.email",
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
      accessor: (data:Order) => {
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
      accessor: (data: Order) => {
        return (
          <>
            {data.orderItem.map((item: OrderItem, i) => (
              <div key={i}> {item.count} </div>
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
      <div className="page-label">Order Managment</div>
      <ReactTable
        className="-striped -highlight"
        columns={columns}
        data={state.data}
        defaultPageSize={10}
        manual
        pages={state.pages}
        onFetchData={(state) => {
          getData(state.page);
        }}
      />
    </div>
  );
}
