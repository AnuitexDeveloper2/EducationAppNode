import React from "react";
import { connect } from "react-redux";
import SignIn from "../../containers/signIn/signInContainers";
import Register from "../../containers/register/registerConteiner";
import Cart from "../cart/cart";
import ConfirmEmail from "./confirmEmail";
import ForgotPassword from "../forgotPassword/forgot-password";

const PopUpManager: React.FC<any> = ({ popupState }) => {
  if (popupState.headermanager.showLogIn) {
    return (
      <div>
        <SignIn/>
      </div>
    );
  }
  if (popupState.headermanager.showRegister) {
    return (
      <div>
        <Register/>
      </div>
    );
  }
  if (popupState.headermanager.showCart) {
    return (
      <div>
        <Cart outsideState="" />
      </div>
    );
  }
  if (popupState.headermanager.showConfirm) {
    return (
      <div>
        <ConfirmEmail />
      </div>
    );
  }
  if (popupState.headermanager.showForgot) {
    return (
      <div>
        <ForgotPassword />
      </div>
    );
  }
  return <div></div>;
};

const mapStateToProps = (state: any) => {
  return {
    popupState: state,
  };
};

export default connect(mapStateToProps, null)(PopUpManager);
