import React, { useState, useEffect, createContext } from "react";
import ReactPaginate from "react-paginate";
import "./main.css";
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import { getMainPage } from "../../services/printingEdition";
import {
  PrintingEditionModel,
  AuthorModel,
} from "../../shared/models/printingEdition/printingEditionModel";
import { enumSelector } from "../../shared/extention/enum";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";
import { Currency } from "../../shared/enums/Currency";
import { PrintingEditionSortType } from "../../shared/enums/printingEditionSortType";
import SearchBar from "../searchBar/search";
import { Spinner } from "../waiter/spinner";

export const ProductContext = createContext(null);

export default function MainPage() {
  useEffect(() => {
    getData(1)
  }, []);

  const category = enumSelector(PrintingEditionType);
  const currencys = enumSelector(Currency);
  
  const [state, setState] = useState({
    count: 0,
    data: null,
    isLoading: false,
    showCreate: false,
  });

  const [price, setPrice] = useState({ minValue: 0, maxValue: 1000 });
  
  const [data, setData] = useState({
    pageNumber: 1,
    currency: Currency.USD,
    sortType: SortType.None,
    tableSort: PrintingEditionSortType.Id,
    typeProduct: PrintingEditionType[4]
  })

  const handleSelect = async(event) => {
    const filter: PrintingEditionFilterModel = {
      searchString: "",
      sortType: data.sortType,
      pageNumber: 1,
      pageSize: 6,
      currency: data.currency,
      tableSort: data.tableSort,
      minPrice: price.minValue,
      maxPrice: price.maxValue,
      typeProduct: data.typeProduct as any,
    };
    if (event.target.name === 'currency') {
      filter.currency = Currency[event.target.value] as any
      setData({...data, currency: Currency[event.target.value] as any})
    }
    if (event.target.name === 'sortType') {
      filter.sortType = SortType[event.target.value] as any
      filter.tableSort = PrintingEditionSortType.Price
      setData({...data,tableSort: PrintingEditionSortType.Price,sortType: SortType[event.target.value] as any})
    }
    if (event.target.name === 'typeProduct') {
      filter.typeProduct = PrintingEditionType[event.target.value] as any
      setData({...data, typeProduct: PrintingEditionType[event.target.value]})
    }
    const printingEdition = await getMainPage(filter);
    setState({
      data: printingEdition.data,
      count: printingEdition.count,
      isLoading: true,
      showCreate: false,
    });
  }
 
 const priceFilter = () => {
      getData(data.pageNumber)
 }
 
  const priceInputFilter = (event: any) => {
    setPrice({ ...price, [event.target.name]: event.target.value })
  };

  const handlePageClick = (e) => {
    setData({...data, pageNumber: e.selected +1})
    getData(e.selected +1);
  };

  const purchcase = (item) => {
    debugger;
    localStorage.setItem("Product", JSON.stringify(item));
    window.location.assign("/book");
  };

  const getData = async (pageNumber) => {
    const filter: PrintingEditionFilterModel = {
      searchString: "",
      sortType: data.sortType,
      pageNumber: pageNumber,
      pageSize: 6,
      currency: data.currency,
      tableSort: data.tableSort,
      minPrice: price.minValue,
      maxPrice: price.maxValue,
      typeProduct: data.typeProduct as any,
    };
    const printingEdition = await getMainPage(filter);
    setState({
      data: printingEdition.data,
      count: printingEdition.count,
      isLoading: true,
      showCreate: false,
    });
  };

  if (!state.isLoading) {
    return (
      <Spinner/>
    );
  }
  return (
    <div>
      <SearchBar placeholder="Search Product" params={setState} pageSize={6} />
      <div className="wrapper">
        <div className="item">
          <span className="main-catalog-label">Catalog</span>
        </div>

        <div className="main-currency">
          Currency
          <select className="select-currency" name='currency' onChange={handleSelect}>
            {currencys.map((item: any, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='main-sort'>
          <div className="text-store-orange">
            SortBy 
          </div>
          <select className="select-sort" name='sortType' onChange={handleSelect}>
            <option value="None">None</option>
            <option value="Asc">Price:Low to High</option>
            <option value="Desc">Price:High to Low</option>
          </select>
        </div>
      </div>
      <div className="container">
        <div className="main-left-body">
          <div className="main-category-label">
            {" "}
            Category
            <select id="" name='typeProduct' onChange={handleSelect}>
              <option value="All">All</option>
              {category.map((item: any, i) => (
                <option key={i} value={item}>
                  {item}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="price-slider-label">Price</div>
          <div>
            <input
              type="number"
              className="min-price-form"
              name="minValue"
              onChange={priceInputFilter}
              value={price.minValue}
            />
            <span className="min-price-label">Min</span>
            <input
              type="number"
              className="max-price-form"
              name="maxValue"
              onChange={priceInputFilter}
              value={price.maxValue}
            />
            <span className="max-price-label">Max</span>
            <div className="button-price-filter">
              <button className="price-filter" onClick={priceFilter}>Submit</button>
            </div>
          </div>

        </div>

        <div className="grid">
          {state.data.map((item: PrintingEditionModel, i) => (
            <div
              className="books-block"
              key={i}
              onClick={() => purchcase(item)}
            >
              <span className="grid-image">
                <img src={item.cover_image} alt="img" className="grid-image" />
              </span>
              <span className="grid-title">
                <a href="/book" className="grid-title-ref">{item.title} </a>{" "}
              </span>
              <span className="grid-authors">
                {item.author_ids.map((author: AuthorModel) => (
                  <div>{author.name}</div>
                ))}
              </span>
              <span className="grid-price">
                {" "}
                {item.price}
                <span className="grid-currency">{Currency[data.currency]}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          // breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={state.count / 6}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          // subContainerClassName={'pages pagination'}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
