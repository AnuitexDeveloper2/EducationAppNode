import React from "react";
import "./remove.css"
import close from "../../assets/close.svg"
import { removeAuthor } from "../../services/authors";
import { removePrintinEdition } from "../../services/printingEdition";


const Remove = ({isShowing, hide,assigment,value}) => {
    let item ='';
    if (assigment==='author') {
        item = value.author.name
    }
    if (assigment === 'product') {
        item = value.product.title
    }

    const deleteItem = async() => {
        let result;
        if (assigment==='author') {
             result = await removeAuthor(value.author)
        }
        if (assigment === 'product') {
             result = await removePrintinEdition(value.product)
        }
        if (result) {
            hide(false)
        }

    }
    if (isShowing) {
    return(
            
        <div className='remove-modal'>

        <div className='remove-modal-inner'>
        <div className="modalHeader">
              <div className="close">
                 <img src={close} onClick={hide}/>
             </div>
          </div>
            <div className="remove-title">
            Are you sure delete 
                <span className="value">
                    {item}
                </span> 
            </div>
            <button  className="create-cancel-button" onClick={hide} > 
                <div className="create-cansel-label">
                    Cancel
                </div>
                </button>
                <button  className="remove-button" onClick={deleteItem}  > 
                <div className="remove-label">
                    Remove
                </div>
                </button>
        </div>
        </div>
            )
        }
    return(
        <div></div>
    )
}

export default Remove