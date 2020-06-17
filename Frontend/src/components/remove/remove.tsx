import React from "react";
import "./remove.css";
import close from "../../assets/close.svg";
import { removeAuthor } from "../../services/authors";
import { removePrintinEdition } from "../../services/printingEdition";
import { removeUser } from "../../services/users";

const Remove = ({ isShowing, hide, assigment, value }) => {
  const deleteItem = async () => {
    let result;
    debugger;
    if (assigment === "author") {
      result = await removeAuthor(value.item);
    }
    if (assigment === "product") {
      result = await removePrintinEdition(value.item);
    }
    if (assigment === "user") {
      result = await removeUser(value.item.id);
      debugger;
    }
    if (result === true) {
      hide(false);
    }
  };
  if (isShowing) {
    return (
      <div className="remove-modal">
        <div className="remove-modal-inner">
          <div className="modalHeader">
            <div className="close">
              <img src={close} onClick={hide} alt="close" />
            </div>
          </div>
          <div className="remove-title">
            Are you sure delete
            <span className="value">{value.item.name}</span>
          </div>
          <button className="create-cancel-button" onClick={hide}>
            <div className="create-cansel-label">Cancel</div>
          </button>
          <button className="remove-button" onClick={deleteItem}>
            <div className="remove-label">Remove</div>
          </button>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default Remove;
