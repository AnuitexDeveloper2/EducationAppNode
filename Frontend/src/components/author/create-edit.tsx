import React from "react";
import "./css/create.css";
import close from "../../assets/close.svg";
import { AuthorModel } from "../../shared/models/author/author";
import { createAuthor, editAuthor } from "../../services/authors";

const CreateEdit = ({ isShowing, hide, assigment, value }) => {
  let title: string;
  const author: AuthorModel = {
    _id: "",
    product_ids: [],
    name: "",
  };
  if (assigment === "Add") {
    author.name = "";
    title = "Add new Author";
  }
  if (assigment === "Edit") {
    debugger;
    author.name = value.item.name;
    title = "Edit Author";
  }
  const valueName: any = React.createRef();
  const create = async () => {
    const name = valueName.current.value;
    const model: AuthorModel = {
      name: name,
      _id: "9877",
      product_ids: [],
    };
    let result: any;
    if (assigment === "Add") {
      result = await createAuthor(name);
    }
    if (assigment === "Edit") {
      model._id = value.item.id;
      result = await editAuthor(model);
    }
    if (result) {
      hide(false);
    }
  };

  if (isShowing) {
    return (
      <div className="create-author-modal">
        <div className="create-author-modal-inner">
          <div className="modalHeader">
            <div className="close">
              <img src={close} onClick={hide} alt="close" />
            </div>
          </div>
          <div className="modal-body">
            <h1 className="add-product-title">{title}</h1>
            <input
              type="text"
              placeholder="Name"
              className="create-author-input"
              defaultValue={author.name}
              ref={valueName}
            />
            <button className="create-cancel-button" onClick={hide}>
              <div className="create-cansel-label">Cancel</div>
            </button>
            <button className="create-save-button" onClick={create}>
              <div className="create-save-label">{assigment}</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default CreateEdit;
