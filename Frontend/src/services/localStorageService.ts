import { OrderItemModelItem } from "../shared/models/orderModel/OrderItemModel";
import { UserModel } from "../shared/models/user/user";

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

export function getAccessToken():string {
  const token = localStorage.getItem("AccessToken");
  return token
}

export function setAccessToken(token: string) {
  localStorage.setItem("AccessToken",token)
}

export function setUser(user: UserModel) {
      localStorage.setItem("User",JSON.stringify(user))
}