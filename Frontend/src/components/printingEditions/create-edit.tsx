import React, { useEffect, useState } from "react";
import "./CSS/create.css";
import close from "../../assets/close.svg";
import { Form, Field } from "react-final-form";
import { enumSelector } from "../../shared/extention/enum";
import { PrintingEditionType } from "../../shared/enums/ptintingEditionType";
import { getAuthors } from "../../services/authors";
import {
  AuthorModel,
  RequestPrintingEditionModel,
} from "../../shared/models/printingEdition/printingEditionModel";
import { Currency } from "../../shared/enums/Currency";
import {
  createPrintingEdition,
  editPrintingEdition,
} from "../../services/printingEdition";
import FileBase from "react-file-base64";


const CreateEditProduct = ({ isShowing, hide, assigment, value }) => {
  const [image, setImage] = useState({
    baseImage: "",
  });

  const getBaseFile = (files) => {
    setImage({
      baseImage: files.base64,
    });
  };
  let title: string;
  const product: RequestPrintingEditionModel = {
    title: "",
    description: "",
    price: 0,
    productType: PrintingEditionType.Book,
    currency: Currency.USD,
    author_ids: [],
    cover_image: image.baseImage,
  };
  if (assigment === "Add") {
    title = "Add new Product";
  }
  if (assigment === "Edit") {
    product.title = value.item.name;
    product.description = value.item.description;
    product.price = value.item.price;
    title = "Edit Product";
  }
  const [state, setState] = useState({
    author: null,
  });
  const category = enumSelector(PrintingEditionType);
  const currency = enumSelector(Currency);

  const onSubmitCreate = async (data) => {
    debugger
    const authors = [] as string[];
    authors.push(data.author);
    const model: RequestPrintingEditionModel = {
      title: data.PrintingEdition.title,
      description: data.PrintingEdition.discription,
      productType: data.PrintingEdition.category,
      author_ids: authors,
      price: data.PrintingEdition.price as number,
      currency: data.PrintingEdition.currency,
      cover_image: image.baseImage,
    };
    let result: boolean;
    if (assigment === "Add") {
      result = await createPrintingEdition(model);
    }

    if (assigment === "Edit") {
      const id = value.item.id;
      result = await editPrintingEdition(model, id);
    }
    if (result) {
      hide(false);
    }
  };

  const get = async () => {
    const authors = await getAuthors();
    setState({
      author: authors,
    });
    return authors;
  };

  useEffect(() => {
    get();
  }, []);


  if (isShowing) {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="modalHeader">
            <div className="close">
              <img src={close} onClick={hide} alt="close" />
            </div>
          </div>
          <div className="modal-body">
            <h1 className="add-product-title">{title}</h1>
            <Form
              onSubmit={onSubmitCreate}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="create-book-form">
                    <div className="up">
                      <span className="create-title-label">title</span>
                      <span>
                        <Field
                          type="text"
                          name="PrintingEdition.title"
                          className="create-title-form"
                          defaultValue={product.title}
                          component="textarea"
                        />
                      </span>
                      <span className="create-foto">
                        <img
                          src={image.baseImage}
                          alt=""
                          className="process__image"
                        />
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={getBaseFile}
                        />
                      </span>
                    </div>
                    <div className="down">
                      <span className="create-discription-label">
                        discription
                      </span>
                      <span>
                        <Field
                          type="text"
                          name="PrintingEdition.discription"
                          defaultValue={product.description}
                          className="create-discription-form"
                          component="textarea"
                        />
                      </span>
                      <br />
                      <span className="create-category-label">Category</span>
                      <span>
                        <Field
                          type="text"
                          name="PrintingEdition.category"
                          className="create-category-form"
                          component="select"
                        >
                          {category.map((item: any, i) => (
                            <option key={i}>{item} </option>
                          ))}
                        </Field>
                      </span>
                      <span className="create-authors-label">Authors</span>
                      <span>
                        <Field
                          type="text"
                          name="author"
                          className="create-authors-form"
                          component="select"
                        >
                          {state.author.map((item: AuthorModel, i) => (
                            
                            <option key={i} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </Field>
                      </span>
                      <span className="create-price-label">Price</span>
                      <span>
                        <Field
                          type="number"
                          name="PrintingEdition.price"
                          className="create-price-form"
                          defaultValue={product.price}
                          component="input"
                        />
                      </span>
                      <span className="create-currency-label">Currency</span>
                      <span>
                        <Field
                          type="text"
                          name="PrintingEdition.currency"
                          className="create-currency-form"
                          component="select"
                        >
                          {currency.map((item: any, i) => (
                            <option key={i}>{item} </option>
                          ))}
                        </Field>
                      </span>
                      <button className="create-cancel-button" onClick={hide}>
                        <div className="create-cansel-label">Cancel</div>
                      </button>
                      <button
                        className="create-save-button"
                        disabled={submitting || pristine}
                      >
                        <div className="create-save-label">Save</div>
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
  return <div></div>;
};

export default CreateEditProduct;
