import React, { useEffect, useState } from "react";
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

const AuthorsForAdmin = () => {
  const [data, setData] = useState({
    authors: [],
    pages: 0,
  });
  const [author, setAuthor] = useState({
    item: {},
  });

  const hide = () => {
    toggle("createAuthor");
    getData(0)
  };

  const passData = (currentAuthor) => {
    setAuthor({
      item: currentAuthor,
    });
  };

  const { isShowing, toggle } = useModal();

  useEffect(() => {
    getData(0);
  }, []);

  const getData = async (pageNumber) => {
    const filter: BaseFilter = {
      searchString: "",
      pageNumber: pageNumber + 1,
      pageSize: 10,
      sortType: SortType.None,
    };
    const authors = await getAuthorsForAdmin(filter);
    setData({ authors: authors.data, pages: Math.floor(authors.count) });
  };

  const columns = [
    {
      Header: "Author",
      accessor: "name",
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
            <LastColumn value={author} assigment="author" />
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
            getData(state.page);
          }}
        />
      </div>
    </div>
  );
};
export default AuthorsForAdmin;
