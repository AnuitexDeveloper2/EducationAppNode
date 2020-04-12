import React from "react";
import remove from "../../assets/remove.svg";
import edit from "../../assets/iconmonstr-pencil-8.svg"
import useModal from "../author/useModal";
import CreateEdit from "../author/create-edit";
import Remove from "../remove/remove";

const EditDelete =({value}) => {
  debugger
  const {isShowing, toggle} = useModal();
  const showEdit = () => {
    toggle("edit")
  }
  const showRemove = () => {
      toggle("remove")
  }
    return(
<div>
            <img src={edit} className='img__button' title="Edit Author" onClick={showEdit}></img>
            <img src={remove} className="img__button" title="Remove Author" onClick={showRemove} ></img>
            <CreateEdit isShowing={isShowing.create} hide={showEdit} assigment="Edit" value={value}/>
            <Remove isShowing={isShowing.open} hide={showRemove} assigment="" value={value}/>
         </div>
              )    
}

export default EditDelete