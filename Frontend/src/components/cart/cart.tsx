import React, { useEffect, useState } from "react";
import { OrderItemModelItem } from "../../shared/models/orderModel/OrderItemModel";
import "./cart.css";
import remove from "../../assets/delete.png";
import { removeItemFromCart } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { hideCartAction } from "../../Redux/header/actions";
import StripeCheckout from "react-stripe-checkout";
import { Order } from "../../shared/models/order/orderModel";
import { createOrder } from "../../services/order";
import { Spinner } from "../waiter/spinner";
import Modal from "react-modal";

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

  const customStyles = {
    content: {
      top: "40%",
      left: "50%",
      right: "0%",
      bottom: "10%",
      transform: 'translate(-50%, -50%)',
      padding: "0px",
      border: "none",
      minHeight: "600px"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)"
    }
  };

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
    const order: Order = {
      user: null,
      createdDate: null,
      userId: user.id,
      amount: state.total,
      transactionId: token.id,
      orderItem: state.data,
      description: 'some description'
    };
    const result = await createOrder(order);
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
      <Spinner />
    );
  }

  return (
    <Modal ariaHideApp={false} isOpen={true} style={customStyles}>
      <table className="cart-table">
        <thead>
          <tr>
            <th className="font-bold text-xl opacity-50">PRODUCT</th>
            <th className="cart-th">Unit price</th>
            <th className="cart-th">Qty</th>
            <th className="cart-th">Order Amount</th>
            <th className="cart-th"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-10"></tr>
          {state.data.map((item: OrderItemModelItem, i) => {
            return(
            <tr key={i} className="h-30 cart-row">
              <td className="cart-title"> <div className="flex items-center justify-evenly"> <img src={item.printingEditionImage} className="p-4" width={60} height={80} alt="book"/> <div className="cart-book-title">{item.printingEditionName}<div></div></div></div></td>
              <td className="cart-unit-price">{item.price}</td>
              <td className="cart-unit-price">{item.count}</td>
              <td>
                <div className="tr-amount">${item.price * item.count}</div>
              </td>
              <td>
                <img
                  src={remove}
                  alt="remove"
                  className="tr-image mr-4"
                  onClick={() => removeItem(i)}
                />
              </td>
            </tr>
          )})}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-4 mr-4">
       <span className="cart-total-price mr-4"> Total Price </span> <span className="total-price"> ${state.total} </span>
      </div>
      <div className="flex justify-around items-center my-4">
      <button className="cart-cancel-button" onClick={cancel}>
        <span className="car-cancel-label">Cancel</span>
      </button>
        <StripeCheckout
          token={(token) => {
            buyNow(token);
          }}
          stripeKey="pk_test_uM7l1xcvkra93O8DCsRRCGzg00DLGeT0Tr"
        >
        </StripeCheckout>
      </div>
    </Modal>
  );
}
