import React, { useState, useEffect } from "react";
import "./product.css";
import cart from "../../assets/iconmonstr-shopping-cart-3.svg";
import { AuthorModel } from "../../shared/models/printingEdition/printingEditionModel";
import { OrderItemModelItem } from "../../shared/models/orderModel/OrderItemModel";
import { setCart } from "../../services/localStorageService";
import Cart from "../cart/cart";
import { Spinner } from "../waiter/spinner";

export default function Product() {
  const [state, setState] = useState({
    isLoading: false,
    book: null,
    amount: 0,
  });

  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState({ user: null });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    setUser({ user: user });
    const product = await JSON.parse(localStorage.getItem("Product"));
    setState({ isLoading: true, book: product, amount: product.price });
  };

  const selectQty = async (event) => {
    const qty = await event.target.value;
    setState({
      isLoading: true,
      book: state.book,
      amount: state.book.price * qty,
    });
  };

  const moveToCart = () => {
    const currentOrderItem: OrderItemModelItem = {
      currency: state.book.currency,
      bookIds: state.book.id,
      printingEditionType: state.book.productType,
      count: state.amount / state.book.price,
      printingEditionName: state.book.title,
      price: state.book.price,
      printingEditionImage: state.book.cover_image
    };
    setCart(currentOrderItem);
    setShowCart(true);
  };

  if (!state.isLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <div className="m-auto">
      {showCart && <Cart outsideState={setShowCart} />}
      <section className="flex">
        <div className="selected-section-left">
          <img width="300px" className="selected-img" src={state.book.cover_image} alt="" />
        </div>
        <div className="selected-section-right">
          <div className="product-title whitespace-no-wrap">{state.book.title}</div>
          <div className="flex text-center justify-center p-8">
            {state.book.authors.map((author: AuthorModel, i: number) => (
              <span className="product-authors" key={i}>{author.name}</span>
            ))}
          </div>
          <div className="product-quantity">
            <span className="product-quantity-label">Qty</span>
            <span>
              <select id="" onChange={selectQty} className='bg-store-lighter-grey'>
                {[1, 2, 3, 4, 5].map((item: number, i: number) => (
                  <option value={item} key={i}>{item}</option>
                ))}
              </select>
            </span>
            <span className="product-total-price">${state.amount}</span>
          </div>
          <div className="product-cart-button">
            {user.user !== null && (
              <button className="cart-button" onClick={moveToCart}>
                <img className="cart-image" alt="cart" src={cart} />
                <span className="button-title"> Add to cart </span>
              </button>
            )}
          </div>
          <div>
          </div>
        </div>
      </section>
      <hr className="my-10"/>
      <section className="selected-description">
        <div>
          {state.book.description}
        </div>
      </section>
    </div>
  );
}
