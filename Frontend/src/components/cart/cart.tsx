import React, { useEffect, useState } from "react"
import { OrderItemModelItem } from "../../shared/models/orderModel/OrderItemModel"
import  spinner  from "../../assets/spinner.gif";
import "./cart.scss"
import remove from "../../assets/delete.png"
import { removeItemFromCart } from "../../shared/extention/localStorage";
import { useDispatch } from "react-redux";
import { hideCartAction } from "../../Redux/popUp/actions";

export default function Cart ({outsideState})  {

    const dispatch = useDispatch()
    const [state,setState] = useState({
        data:null,
        isLoaded:false,
        total:0
    })

    useEffect(() => {
        getData()
    },[])

    const cancel =() => {
        debugger
        dispatch(hideCartAction())
        if (outsideState !=="") {
            outsideState(false)
        }
    }

    const removeItem = (i) => {
        removeItemFromCart(i);
        getData();
    }

    const getData= () => {
        let totalPrice=0;
        const myCart =JSON.parse(localStorage.getItem("Cart"))
        setState({data:[], isLoaded:true,total:totalPrice})
        if (myCart !==null) {
            myCart.map((item:OrderItemModelItem)=>{
                totalPrice +=item.printingEditionPrice *item.count
            })
            setState({data:myCart, isLoaded:true,total:totalPrice})
        }


    }

    if (!state.isLoaded) {
        return(
          <div className="loading-data">
         <div className="spinner-grow text-primary" role="status">
             <span className="sr-only">
               <img src={spinner}></img>
             </span>
         </div>
         </div>
           )
          }
    
    return(
            <div className='cart-popup'>
          <div className='cart-popup-inner'>
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
        {state.data.map((item:OrderItemModelItem,i)=>
        <tr key={i}>
            <td>{item.printingEditionName}</td>
            <td>{item.printingEditionPrice}</td>
            <td>{item.amount/item.printingEditionPrice}</td>
            <td><div className="tr-amount">${item.amount}</div></td>
            <td><img src={remove} alt="remove" className="tr-image" onClick={()=>removeItem(i)}/></td>
        </tr>
        )}
    </tbody>
    </table>
        <div>Total Price <span className="total-price"> ${state.total} </span></div>
        <button  className="cart-cancel-button" onClick={cancel} > 
                   <span className="car-cancel-label">Cancel</span> 
                </button>
                <button  className="cart-buy-button"  > 
                <div className="cart-buy-label">
                    Buy Now
                </div>
                </button>
          </div>
        </div>
    )
}