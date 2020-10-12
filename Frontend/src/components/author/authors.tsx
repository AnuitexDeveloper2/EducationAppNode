import React, { useState } from "react";
import ReactTable from "react-table-v6";
import "../../shared/css/table.css";
import { BaseFilter } from "../../shared/models/baseFilterModel";
import { getAuthorsForAdmin } from "../../services/authors";
import { SortType } from "../../shared/enums/sortType";
import "./css/authors.css";
import { AuthorModel } from "../../shared/models/printingEdition/printingEditionModel";
import add from "../../assets/add-button-inside-black-circle.svg";
import useModal from "./useModal";
import CreateEdit from "./create-edit";
import SearchBar from "../searchBar/search";
import LastColumn from "../lastColumn/lastColumn";
import poligon from "../../assets/Polygon.png";

const AuthorsForAdmin = () => {
  const [data, setData] = useState({
    authors: [],
    pages: 0,
  });

  const [sort, setSort] = useState({
    sortType: SortType.None,
    count: 0
  })
  const [author, setAuthor] = useState({
    item: {},
  });

  const hide = () => {
    toggle("createAuthor");
    getData(0, SortType.None)
  };

  const passData = (currentAuthor) => {
    setAuthor({
      item: currentAuthor,
    });
  };

  const useSort = () => {
    const currentSort = sort.count % 2 === 0 ? SortType.Asc : SortType.Desc
    setSort({ count: ++sort.count, sortType: currentSort })
    getData(0, currentSort)
  }

  const { isShowing, toggle } = useModal();

  const getData = async (pageNumber: number, sortType: SortType) => {
    const filter: BaseFilter = {
      searchString: "",
      pageNumber: pageNumber + 1,
      pageSize: 10,
      sortType: sortType,
    };
    const authors = await getAuthorsForAdmin(filter);
    let pages = ~~(authors.count) / 10 + 1;
    pages = pages % 2 === 0 ? pages - 1 : pages
    setData({ authors: authors.data, pages: Math.floor(pages) });

  };

  const columns = [
    {
      Header: () => {
        return (
          <div className="text-center">
            Author
            <img src={poligon} className="search-Drop-Down" alt="sort" onClick={useSort} />
          </div>
        )
      },
      id: "author.name",
      accessor: (data: AuthorModel) => {
        return (
          <div className="author-name">
            {data.name}
          </div>
        )
      }
    },
    {
      Header: "Product",
      id: "author_ids",
      accessor: (data: AuthorModel) => {
        return (
          data.books ?
            <>
              {data.books.map((product: any, i) => (
                <div key={i}> {product.title} </div>
              ))}
            </> : <></>
        );
      },
    },
    {
      Header: "",
      Cell: (props) => {
        return (
          <>
            <LastColumn value={author} assigment="author" getData={getData} />
          </>
        );
      },
    },
  ];
  return (
    <div className="author-page">
      <div className="author-header">
        <div className="authors-title">Authors Page</div>
        <br />
        <div className="author-body">
          <div className="search-bar">
            <SearchBar
              placeholder="Search Author"
              params={setData}
              pageSize={10}
            />
          </div>
          <div className="author-create">
            <img
              src={add}
              alt="add Book"
              className="author-add-image"
              title="Add new Author"
              onClick={hide}
            />
          </div>
        </div>
      </div>
      <CreateEdit
        isShowing={isShowing.create}
        hide={hide}
        assigment="Add"
        value=""
      />
      <div className="authors-table">
        <ReactTable
          getTdProps={(rstate, rowInfo) => {
            return {
              onClick: () => {
                if (rowInfo !== undefined) {
                  const currentAuthor = {
                    id: rowInfo.original.id,
                    name: rowInfo.original.name,
                  };
                  passData(currentAuthor);
                }
              },
            };
          }}
          className="-striped -highlight"
          columns={columns}
          data={data.authors}
          defaultPageSize={10}
          manual
          pages={data.pages}
          onFetchData={(state) => {
            getData(state.page, sort.sortType);
          }}
        />
      </div>
    </div>
  );
};
export default AuthorsForAdmin;
