import React, { useState } from "react";
import remove from "../../assets/remove.svg";
import edit from "../../assets/iconmonstr-pencil-8.svg";
import useModal from "../author/useModal";
import CreateEdit from "../author/create-edit";
import Remove from "../remove/remove";
import CreateEditProduct from "../printingEditions/create-edit";

const LastColumn = ({ value, assigment }) => {
  const { isShowing, toggle } = useModal();
  const [state, setState] = useState({
    isShowRemove: false,
    isShowCreateAuthor: false,
    isShowCreateProduct: false,
  });
  const showEdit = () => {
    if (assigment === "author") {
      toggle("createAuthor");
      setState({
        isShowCreateAuthor: true,
        isShowRemove: false,
        isShowCreateProduct: false,
      });
    }
    if (assigment === "product") {
      toggle("createProduct");
      setState({
        isShowCreateAuthor: false,
        isShowRemove: false,
        isShowCreateProduct: true,
      });
    }
  };
  const showRemove = () => {
    setState({
      isShowRemove: true,
      isShowCreateAuthor: false,
      isShowCreateProduct: false,
    });
    toggle("remove");
  };
  return (
    <div>
      <img
        src={edit}
        alt="edit"
        className="img__button"
        title="Edit"
        onClick={showEdit}
      ></img>
      <img
        src={remove}
        alt="remove"
        className="img__button"
        title="Remove"
        onClick={showRemove}
      ></img>
      {state.isShowCreateAuthor && (
        <CreateEdit
          isShowing={isShowing.create}
          hide={showEdit}
          assigment="Edit"
          value={value}
        />
      )}
      {state.isShowRemove && (
        <Remove
          isShowing={isShowing.delete}
          hide={showRemove}
          assigment={assigment}
          value={value}
        />
      )}
      {state.isShowCreateProduct && (
        <CreateEditProduct
          isShowing={isShowing.createProduct}
          hide={showEdit}
          assigment="Edit"
          value={value}
        />
      )}
    </div>
  );
};

export default LastColumn;
