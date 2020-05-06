import { OrderItemModelItem } from "../shared/models/orderModel/OrderItemModel";

let items = new Array<OrderItemModelItem>();

export function setCart(orderItemModelItem: OrderItemModelItem) {
    let currentItems = getCart();
     if (currentItems != null) {
        items= currentItems;
      }
         items.push(orderItemModelItem);
      localStorage.setItem('Cart', JSON.stringify(items));
}

export function getCart(): Array<OrderItemModelItem> {
    let currentCart: Array<OrderItemModelItem>;
    currentCart = JSON.parse(localStorage.getItem('Cart'));
    if (currentCart === null) {
      return null;
    }
    return currentCart;
}

export function removeItemFromCart(index: number) {
  const currentItems = getCart();
  currentItems.splice(index,1);
  localStorage.setItem('Cart', JSON.stringify(currentItems))
}

export function getAccessToken() {
  const token = localStorage.getItem("AccessToken");
  return token
}