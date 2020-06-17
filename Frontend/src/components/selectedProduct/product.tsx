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
      printing_edition_id: state.book.id,
      printingEditionType: state.book.productType,
      count: state.amount / state.book.price,
      printingEditionName: state.book.title,
      price: state.book.price,
    };
    setCart(currentOrderItem);
    setShowCart(true);
  };

  if (!state.isLoading) {
    return (
     <Spinner/>
    );
  }
  return (
    <div className="product-body">
      {showCart && <Cart outsideState={setShowCart} />}
      <div className="product-container">
        <div className="product-image">
          <img src={state.book.cover_image} alt="" className="current-image" />
        </div>
        <div className="product-details">
          <div className="product-title">{state.book.title}</div>
          <div className="product-authors">
            {state.book.author_ids.map((author: AuthorModel) => (
              <span>{author.name}</span>
            ))}
          </div>
          <div className="product-quantity">
            <span className="product-quantity-label">Qty</span>
            <span>
              <select id="" onChange={selectQty}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </span>
            <span className="product-total-price">${state.amount}</span>
            <div className="product-cart-button">
              {user.user !== null && (
                <button className="cart-button" onClick={moveToCart}>
                  {" "}
                  <img className="cart-image" alt="cart" src={cart} /> Add to
                  cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{state.book.description}</div>
    </div>
  );
}
