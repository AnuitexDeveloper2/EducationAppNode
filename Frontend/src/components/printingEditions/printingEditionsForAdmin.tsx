import React, { useState } from "react";
import ReactTable from "react-table-v6";
import "./CSS/book.css";
import "../../shared/css/table.css";
import * as PrintingEditionService from "../../services/printingEdition";
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import add from "../../assets/add-button-inside-black-circle.svg";
import { AuthorModel, PrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";
import CreateEditProduct from "./create-edit";
import SearchBar from "../searchBar/search";
import useModal from "../author/useModal";
import LastColumn from "../lastColumn/lastColumn";
import { Currency } from "../../shared/enums/Currency";
import { PrintingEditionSortType } from "../../shared/enums/printingEditionSortType";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";

const PrintingEditionForAdmin = () => {
  const [state, setState] = useState({
    count: 0,
    data: [],
    isLoading: false,
    showCreate: false,
  });

  const [product, setProduct] = useState({ item: {} });

  const hide = () => {
    toggle("createProduct");
    getData(0)
  };
  const { isShowing, toggle } = useModal();
  const getData = async (pageNumber: number) => {
    const filter: PrintingEditionFilterModel = {
      searchString: "",
      sortType: SortType.None,
      pageNumber: pageNumber + 1,
      pageSize: 10,
      tableSort: PrintingEditionSortType.Id,
      currency: Currency.USD,
      minPrice: 0,
      maxPrice: 1000,
      typeProduct: undefined,
    };
    const printingEdition = await PrintingEditionService.getPrintingEdition(
      filter
    );
    setState({
      data: printingEdition.data,
      count: printingEdition.count,
      isLoading: true,
      showCreate: false,
    });
  };

  const passData = (currentProduct) => {
    let book;
    state.data.forEach((item) => {
      if (item.id === currentProduct.id) {
        book = item
        return
      }
    })
    setProduct({
      item: book,
    });
  };

  const columns = [
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
      id: "category",
      accessor: (data: PrintingEditionModel) => {
        return <div>{PrintingEditionType[data.category]}</div>
      }
    },
    {
      Header: "Authors",
      id: "authors",
      accessor: (data: PrintingEditionModel) => {
        return (
          data.authors ? (<>
            {data.authors.map((author: AuthorModel, i) => (
              <div key={i}> {author.name} </div>
            ))}
          </>) : <></>
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
            <LastColumn value={product} assigment="product" getData={getData}/>
          </div>
        );
      },
    },
  ];
  // if (!state.isLoading) {
  //   return (
  //     <Spinner/>
  //   );
  // }
  return (
    <div>
      <div className="App">
        <div className="author-body">
          <div className="search-bar">
            <SearchBar
              placeholder="Search Product"
              params={setState}
              pageSize={10}
            />
          </div>
          <div className="author-create">
            <img
              src={add}
              alt="add Book"
              className="add-image"
              onClick={hide}
            />
            <CreateEditProduct
              isShowing={isShowing.createProduct}
              hide={hide}
              assigment="Add"
              value=""
            />
          </div>
        </div>
      </div>{" "}
      <br />
      <div className="books-table">
        <ReactTable
          getTdProps={(rstate, rowInfo) => {
            return {
              onClick: () => {
                if (rowInfo !== undefined) {
                  const currentProduct = {
                    id: rowInfo.original.id,
                    name: rowInfo.original.title,
                    description: rowInfo.original.description,
                    price: rowInfo.original.price,
                  };
                  passData(currentProduct);
                }
              },
            };
          }}
          className="-striped -highlight"
          columns={columns}
          data={state.data}
          defaultPageSize={10}
          manual
          pages={Math.floor(state.count / 11 + 1)}
          onFetchData={(state) => {
            getData(state.page);
          }}
        />
      </div>
    </div>
  );
};

export default PrintingEditionForAdmin;
