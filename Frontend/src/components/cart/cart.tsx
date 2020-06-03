import React, { useEffect, useState } from "react";
import { OrderItemModelItem } from "../../shared/models/orderModel/OrderItemModel";
import spinner from "../../assets/spinner.gif";
import "./cart.css";
import remove from "../../assets/delete.png";
import { removeItemFromCart } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { hideCartAction } from "../../Redux/header/actions";
import StripeCheckout from "react-stripe-checkout";
import { Orders } from "../../shared/models/order/orderModel";
import { createOrder } from "../../services/order";

export default function Cart({ outsideState }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    data: null,
    isLoaded: false,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const cancel = () => {
    dispatch(hideCartAction());
    if (outsideState !== "") {
      outsideState(false);
    }
  };

  const removeItem = (i) => {
    removeItemFromCart(i);
    getData();
  };

  const buyNow = async (token) => {
    const user = JSON.parse(localStorage.getItem("User"));
    const order: Orders = {
      user_id: user._id,
      amount: state.total,
      transaction_id: token.id,
      items: state.data,
    };
    const result = await createOrder(order);
    debugger;
    if (result) {
      cancel();
      localStorage.removeItem("Cart");
    }
  };

  function getData() {
    let totalPrice = 0;
    const myCart = JSON.parse(localStorage.getItem("Cart"));
    setState({ data: [], isLoaded: true, total: totalPrice });
    if (myCart !== null) {
      myCart.forEach((item: OrderItemModelItem) => {
        totalPrice += item.price * item.count;
      });
      setState({ data: myCart, isLoaded: true, total: totalPrice });
    }
  }

  if (!state.isLoaded) {
    return (
      <div className="loading-data">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">
            <img src={spinner} alt="spinner"></img>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-popup">
      <div className="cart-popup-inner">
        <table className="table-style-three">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit price</th>
              <th>Qty</th>
              <th>Order Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((item: OrderItemModelItem, i) => (
              <tr key={i}>
                <td>{item.printingEditionName}</td>
                <td>{item.price}</td>
                <td>{item.count}</td>
                <td>
                  <div className="tr-amount">${item.price * item.count}</div>
                </td>
                <td>
                  <img
                    src={remove}
                    alt="remove"
                    className="tr-image"
                    onClick={() => removeItem(i)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          Total Price <span className="total-price"> ${state.total} </span>
        </div>
        <button className="cart-cancel-button" onClick={cancel}>
          <span className="car-cancel-label">Cancel</span>
        </button>
        <div className="cart-buy-button">
          <StripeCheckout
            token={(token) => {
              buyNow(token);
            }}
            stripeKey="pk_test_uM7l1xcvkra93O8DCsRRCGzg00DLGeT0Tr"
          />
        </div>
      </div>
    </div>
  );
}
