import React from "react";
import "./CSS/confirmEmail.css";
import close from "../../assets/close.svg";
import { useDispatch } from "react-redux";
import { hideConfirmEmail } from "../../Redux/header/actions";

const ConfirmEmail = () => {
  const dispatch = useDispatch();
  function closePopUp() {
    dispatch(hideConfirmEmail());
  }
  return (
    <div className="confirm-email-modal">
      <div className="confirm-email-inner">
        <div className="close">
          <img src={close} alt="close" onClick={closePopUp} />
        </div>
        <div className="confirm-email-label">Confirm Your Email Adress</div>
        <div className="confirm-email-content">
          We have sent an e-mail with a confirmation link to your email
          <br />
          adress.In order to complete the signUp progress, please click
          <br />
          the confirmation link. <br />
          <br />
          If you do not receive a confirmation e-mail, please check the spam{" "}
          <br />
          folder.Also, please verify that you entered a valid email adress in
          our <br />
          sign-up form
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
