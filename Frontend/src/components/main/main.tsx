import React, { useState, useEffect, createContext} from "react";
import { Range } from 'rc-slider';
import ReactPaginate from "react-paginate";
import "./main.css"
import { PrintingEditionFilterModel } from "../../shared/models/printingEdition/printingEditionFilterModel";
import { SortType } from "../../shared/enums/sortType";
import { getMainPage } from "../../services/printingEdition";
import  spinner  from "../../assets/spinner.gif";
import { PrintingEditionModel, AuthorModel } from "../../shared/models/printingEdition/printingEditionModel";
import { enumSelector } from "../../shared/extention/enum";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";
import { Currency } from "../../shared/enums/Currency";
import { PrintingEditionSortType } from "../../shared/enums/printingEditionSortType";
import SearchBar from "../searchBar/search";

export const ProductContext = createContext(null)

export default function MainPage() {
  useEffect(() => {
    getData(1,Currency.USD,SortType.None,PrintingEditionSortType.Id,0,1000,PrintingEditionType[4])},[])
  
    const [state,setState] = useState({
        count: 0,
        data: null,
        isLoading: false,
        showCreate: false
    })
    
    const [currency, setCurrency] = useState(Currency[0])
    const [direction, setDirection] = useState(SortType[0])
    const [sortType, setSortType] = useState(PrintingEditionSortType[0])
    const [price, setPrice] = useState({minValue:0,maxValue:1000})
    const [typeProduct,setTypeProduct] = useState(PrintingEditionType[4])

    const category = enumSelector(PrintingEditionType)
    const currencys = enumSelector(Currency)

    const changeCurrency = (e) => {
      const currentCurrency =Currency[e.target.value]
      setCurrency(Currency[currentCurrency])
      getData(1,currentCurrency,SortType[direction],PrintingEditionSortType[sortType],price.minValue,price.maxValue,typeProduct)
    }

    const changeSort = (e) => {
      const currentDirection = SortType[e.target.value]
      getData(1,Currency[currency],currentDirection,PrintingEditionSortType.Price,price.minValue,price.maxValue,typeProduct)
      setDirection(SortType[currentDirection])
      setSortType(PrintingEditionSortType[1])
    }

    const priceFilter = (range) => {
      setPrice({minValue:range[0],maxValue:range[1]})
      getData(1,Currency[currency],SortType[direction],PrintingEditionSortType[sortType],price.minValue,price.maxValue,typeProduct)
    }

    const priceInputFilter =(event:any) => {
      if (event.target.name==="minValue") {
        setPrice({ minValue: event.target.value,maxValue: price.maxValue }as any);
      }
      if (event.target.name==="maxValue") {
        setPrice({ maxValue: event.target.value,minValue: price.minValue }as any);
      }
      getData(1,Currency[currency],SortType[direction],PrintingEditionSortType[sortType],price.minValue,price.maxValue,typeProduct)
    }

    const typeProductChange = (e) => {
       let currenttype = PrintingEditionType[e.target.value]
       setTypeProduct(PrintingEditionType[e.target.value])
       getData(1,Currency[currency],SortType[direction],PrintingEditionSortType[sortType],price.minValue,price.maxValue,currenttype)
    }
    
      const handlePageClick =(e) => {
      getData(e.selected +1,Currency[currency],SortType[direction],PrintingEditionSortType[sortType],price.minValue,price.maxValue,typeProduct)
    }

    const purchcase =(item) => {
      debugger
        localStorage.setItem('Product',JSON.stringify(item))
        window.location.assign("/book")
    }

    const getData = async (pageNumber,currency,direction,tableSort,minPrice,maxPrice,typeProduct) => {
        const filter: PrintingEditionFilterModel ={
          searchString: '',
          sortType: direction,
          pageNumber: pageNumber,
          pageSize: 6,
          currency: currency,
          tableSort: tableSort,
          minPrice: minPrice,
          maxPrice: maxPrice,
          typeProduct: typeProduct
        }
        const printingEdition = await getMainPage(filter)
        setState({data: printingEdition.data,count:printingEdition.count,isLoading:true,showCreate:false})
      }


    if (!state.isLoading) {
        return(
          <div className="loading-data">
         <div className="spinner-grow text-primary" role="status">
             <span className="sr-only">
               <img src={spinner} alt="spinner"></img>
             </span>
         </div>
         </div>
           )
          }
  return (
 <div>
   <SearchBar placeholder="Search Product" params={setState} pageSize={6}/>
     <div className="wrapper">
       <div className="item"><span className="main-catalog-label">Catalog</span></div>
       
        <div className="main-currency">
        Currency 
          <select   className="select-currency" onChange={changeCurrency}>
          {currencys.map((item: any,i) =><option key={i} value={item}>{item} </option>)}
          </select>
      </div>
      <div className="main-sort">
        SortBy <br/> 
        <select  className="select-sort" onChange={changeSort}>
              <option value="None">None</option>
              <option value="Asc">Price:Low to High</option>
              <option value="Desc">Price:High to Low</option>
          </select>
      </div>
    </div>
    <div className="container">
        <div className="main-left-body">
         <div className="main-category-label"> Category
           <select  id="" onChange={typeProductChange}>
             <option value="All">All</option>
             {category.map((item: any,i) =><option key={i} value={item}>{item} </option>)}
           </select>
          </div>
          
         <div className="price-slider-label">
           Price
           </div>
           <div>
             <input type="number" className="min-price-form" name="minValue" onChange={priceInputFilter} value={price.minValue}/>
              <span className="min-price-label">Min</span>  
             <input type="number" className="max-price-form" name="maxValue" onChange={priceInputFilter} value={price.maxValue}/>
              <span className="max-price-label">Max</span>
              <div className="price-slider">
                <Range min={0} max={1000} defaultValue={[0, 1000]} onChange={priceFilter} tipFormatter={value=> `${value}%`} />
              </div>
           </div>
       </div>

        <div className="grid">
    {state.data.map((item:PrintingEditionModel,i) =>
      <div className="books-block" key={i} onClick={()=>purchcase(item)}>
          <span className="grid-image"><img src={item.cover_image} alt="img" className="grid-image"/></span>
            <span className="grid-title"><a href="/book">{item.title} </a> </span>
             <span className="grid-authors">
                {item.author_ids.map((author:AuthorModel)=>(
                  <div>{author.name}</div>))}
            </span>
                <span className="grid-price"> {item.price}<span className="grid-currency">{currency}</span></span>
        </div>
    )}
  </div>
   </div>
  <div className="pagination">
    <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        // breakLabel={<a href="">...</a>}
        breakClassName={'break-me'}
        pageCount={state.count/6}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
         onPageChange={handlePageClick}
        containerClassName={'pagination'}
        // subContainerClassName={'pages pagination'}
       activeClassName={'active'}
    /> 
</div> 
    </div>
  );
}
