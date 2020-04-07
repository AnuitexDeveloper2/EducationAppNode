import React from "react";
import "./SCSS/create.css"
import close from "../../assets/close.svg"
import { Form, Field } from "react-final-form";
import { enumSelector } from "../../shared/extention/enum";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";
import { getAuthors } from "../../services/authors";
import { AuthorModel, PrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";
import { Currency } from "../../shared/enums/Currency";
import { Button } from "react-bootstrap";
import { createPrintingEdition } from "../../services/printingEdition";

interface CreateState {
    printingEdition: PrintingEditionModel    
    author: Array<AuthorModel>
    isLoaded: boolean
}

export class Create extends React.Component<any,CreateState> {

  state: CreateState ={
    printingEdition:{
      title: '',
      description: '',
      price: 0,
      currency: Currency.USD,
      productType: PrintingEditionType.Book,
      author_ids: null
    },
    author: null,
    isLoaded: false
  }
    category = enumSelector(PrintingEditionType)
    currency = enumSelector(Currency)

    authors: any;

    onSubmitCreate = async(printingEdition: any) => {
      debugger
      const model:PrintingEditionModel={
        title: printingEdition.title,
        description: printingEdition.discription,
        productType: printingEdition.category,
        author_ids: printingEdition.autors,
        price: printingEdition.price,
        currency: printingEdition.currency
      }
      const result = createPrintingEdition(printingEdition);
    }

    get = async() => {
      const authors = await getAuthors();
      this.setState({
        author: authors,
        isLoaded:true
      })
      return authors
    }

   
    async componentWillMount () {
      this.get()
    }

    test= (event: any) =>{
      debugger
      this.setState({ [event.target.name]: event.target.value } as any);
    }

    render() {
      if (!this.state.isLoaded) {
        return(
          <div className='popup'>
          <div className='popup_inner'></div>
          </div>
          )
        }
            return (
        <div className='popup'>
          <div className='popup_inner'>

          <div className="modalHeader">
              <div className="close">
                 <img src={close} onClick={this.props.closePopup}/>
             </div>
          </div>
            <div className="modal-body">
            <h1 className="add-product-title">Add new Product</h1>
            <Form
             onSubmit={this.onSubmitCreate}
             render={({handleSubmit,form,submitting,pristine,values}) => (
               <form onSubmit={handleSubmit}>
                  <div className="create-book-form">
                      <div className="up">
                          <span className="create-title-label">
                            title
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.title" className="create-title-form" component="textarea"/>
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
                          <Field type="text" name="PrintingEdition.discription" onChange={this.test} className="create-discription-form"  component="textarea"/>
                          </span> 
                          <br/>
                          <span className="create-category-label">
                              Category
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.category" onChange={this.test} className="create-category-form"  component="select">
                          {this.category.map((item: any,i) =><option key={i}>{item} </option>)}
                            </Field>
                         </span>
                          <span className="create-authors-label">
                              Authors
                          </span>
                          <span>
                          <Field type="text" name="author" className="create-authors-form" onChange={this.test}  component="select">
                          {this.state.author.map((item: AuthorModel,i) =><option key={i} >{item.name} </option>)}
                            </Field>
                          </span>
                          <span className="create-price-label">
                              Price
                          </span>
                          <span>
                          <Field type="number" name="PrintingEdition.price" className="create-price-form"  component="input"/>
                          </span> 
                          <span className="create-currency-label">
                              Currency
                          </span>
                          <span>
                          <Field type="text" name="PrintingEdition.currency" className="create-currency-form"   component="select">
                          {this.currency.map((item: any,i) =><option key={i} >{item} </option>)}
                            </Field>
                          </span>
                <button  className="create-cancel-button" onClick={this.props.closePopup} > 
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
  }