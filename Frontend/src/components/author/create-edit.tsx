import React from "react";
import ReactDOM from "react-dom";
import './css/create.css'
import close from "../../assets/close.svg"

const Modal = ({ isShowing, hide }) => {

    if (isShowing) {
    return(
            
     <div className='create-author-modal'>
          <div className='create-author-modal-inner'>
          <div className="modalHeader">
              <div className="close">
                 <img src={close} onClick={hide}/>
             </div>
          </div>
            <div className="modal-body">
            <h1 className="add-product-title">Add new Author</h1>
            <input type="text" placeholder="Name"/>
            <button  className="create-cancel-button" onClick={hide} > 
                <div className="create-cansel-label">
                    Cancel
                </div>
                </button>
                <button  className="create-save-button" > 
                <div className="create-save-label">
                    Save
                </div>
                </button>
            </div>
        </div>
      </div>
     
    )
}
return(<div></div>)
   }
  
  export default Modal;