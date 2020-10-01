import {
  AuthorModel,
  PrintingEditionModel,
} from "../models/printingEdition/printingEditionModel";
import React from "react";
import edit from "../../assets/iconmonstr-pencil-8.svg";
import remove from "../../assets/remove.svg";

export const AuthorColumns = [
  {
    Header: "Author",
    accessor: "name",
  },
  {
    Header: "Product",
    id: "author_ids",
    accessor: (data: AuthorModel) => {
      return (
        <>
          {data.books.map((product: any, i) => (
            <div key={i}> {product} </div>
          ))}
        </>
      );
    },
  },
  {
    Header: "",
    Cell: (props) => {
      return (
        <div>
          <img src={edit} alt='edit' className="img__button" title="Edit Author">
            {props.value}
          </img>
          <img src={remove} alt='remove' className="img__button" title="Remove Author"></img>
        </div>
      );
    },
  },
];

export const PrintingEditionColumns = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Category",
    accessor: "productType",
  },
  {
    Header: "Authors",
    id: "author_ids",
    accessor: (data: PrintingEditionModel) => {
      return (
        <>
          {data.authors.map((author: any, i) => (
            <div key={i}> {author.name} </div>
          ))}
        </>
      );
    },
  },

  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Edit",
    Cell: (props) => {
      return (
        <div>
          <img src={edit} className="img__button" title="Edit Product">
            {props.value}
          </img>
          <img
            src={remove}
            className="img__button"
            title="Remove Product"
          ></img>
        </div>
      );
    },
  },
];
