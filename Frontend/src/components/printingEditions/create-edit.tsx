import React, { useEffect, useState } from "react";
import "./SCSS/create.css"
import close from "../../assets/close.svg"
import { Form, Field } from "react-final-form";
import { enumSelector } from "../../shared/extention/enum";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";
import { getAuthors } from "../../services/authors";
import { AuthorModel, PrintingEditionModel, RequestPrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";
import { Currency } from "../../shared/enums/Currency";
import { createPrintingEdition, editPrintingEdition } from "../../services/printingEdition";

interface CreateState {
    printingEdition: PrintingEditionModel    
    author: Array<AuthorModel>
    isLoaded: boolean
}

const CreateEditProduct = ({isShowing, hide,assigment,value}) => {
  let title:string
  const product: RequestPrintingEditionModel ={
    // _id:"",
    title:"",
    description:"",
    price:0,
    productType:PrintingEditionType.Book,
    currency: Currency.USD,
    author_ids:[]
  }
  if (assigment == "Add") {
    title = "Add new Product"
}
if (assigment === "Edit") {
  debugger
    product.title = value.item.name
    product.description = value.item.description
    product.price = value.item.price
    title = "Edit Product";
}
  const  [state, setState] = useState({
      author: null,
      isLoaded: false
    })
    const category = enumSelector(PrintingEditionType)
    const currency = enumSelector(Currency)


    const onSubmitCreate = async(data: any) => {
      debugger
      const authors = [] as  string[]
      authors.push(data.author)
      const model:RequestPrintingEditionModel={
        // _id: null,
        title: data.PrintingEdition.title,
        description: data.PrintingEdition.discription,
        productType: data.PrintingEdition.category,
        author_ids:authors ,
        price: data.PrintingEdition.price as number,
        currency: data.PrintingEdition.currency
      }
      let result: boolean
      if (assigment === "Add") {
         result =await createPrintingEdition(model);
      }

      if (assigment === "Edit") {
        // model._id = value.product._id
        result = await editPrintingEdition(model)
      }
      if (result) {
        hide(false)
      }
    }
    
    const get = async() => {
      const authors = await getAuthors();
      setState({
        author: authors,
        isLoaded:true
      })
      return authors
    }

    
    
    useEffect(() => {
      get()},[])

     const test= (event: any) =>{
        debugger
        setState({ [event.target.name]: event.target.value } as any);
    }
    
          if (isShowing && state.isLoaded) {
            return (
          <div className='popup'>
          <div className='popup_inner'>

          <div className="modalHeader">
            <div className="close">
                 <img src={close} onClick={hide}/>
             </div>
          </div>
            <div className="modal-body">
            <h1 className="add-product-title">{title}</h1>
            <Form
             onSubmit={onSubmitCreate}
             render={({handleSubmit,form,submitting,pristine,values}) => (
               <form onSubmit={handleSubmit}>
                  <div className="create-book-form">
                      <div className="up">
                          <span className="create-title-label">
                            title
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.title" className="create-title-form" defaultValue={product.title} component="textarea"/>
                           </span>
                          <span className="create-foto">
                              <img src="" alt="foto"/> <br/>
                              <p className="change-foto-label">
                              ChangeFoto
                              </p>
                          </span>
                      </div>
                      <div className="down">
                          <span className="create-discription-label">
                              discription
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.discription" defaultValue={product.description}  className="create-discription-form"  component="textarea"/>
                          </span> 
                          <br/>
                          <span className="create-category-label">
                              Category
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.category"  className="create-category-form"   component="select">
                            {category.map((item: any,i) =><option key={i}>{item} </option>)}
                            </Field>
                         </span>
                          <span className="create-authors-label">
                              Authors
                          </span>
                          <span>
                          <Field type="text" name="author" className="create-authors-form"  component="select">
                            {state.author.map((item: AuthorModel,i) =><option key={i} value={item._id} >{item.name} </option>)}
                            </Field>
                          </span>
                          <span className="create-price-label">
                              Price
                          </span>
                          <span>
                          <Field type="number" name="PrintingEdition.price" className="create-price-form" defaultValue={product.price}  component="input"/>
                          </span> 
                          <span className="create-currency-label">
                              Currency
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.currency" className="create-currency-form"   component="select">
                          {currency.map((item: any,i) =><option key={i} >{item} </option>)}
                            </Field>
                          </span>
                <button  className="create-cancel-button" onClick={hide} > 
                <div className="create-cansel-label">
                    Cancel
                </div>
                </button>
                <button  className="create-save-button" disabled={submitting || pristine}> 
                <div className="create-save-label">
                    Save
                </div>
                </button>
            </div>
                    </div>
                 </form>
                )}
                />
            </div>
        </div>
      </div>
      );
    }
    return(<div></div>)
    }
    
    export default CreateEditProduct