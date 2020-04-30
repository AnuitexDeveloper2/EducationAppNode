import  React  from "react";
import { connect } from "react-redux";
import  SignIn  from "../../containers/signIn/signInContainers";
import  Register  from "../../containers/register/registerConteiner";
import Cart from "../cart/cart";

const PopUpManager: React.FC<any>= ({popupState}) => {
    if (popupState.popUpmanager.showLogIn) {
        
        return(
            <div>
            <SignIn></SignIn>
        </div>
    )
}
    if (popupState.popUpmanager.showRegister) {
        return(
            <div>
            <Register></Register>
        </div>
            )
    }
    debugger
    if(popupState.popUpmanager.showCart) {
        return(
            <div>
            <Cart outsideState=""/>
        </div>
    )
}
        return(<div></div>)
}

const mapStateToProps = (state:any) => {
    return {
          popupState: state
        }
   }
  
  export default connect(mapStateToProps,null)(PopUpManager)