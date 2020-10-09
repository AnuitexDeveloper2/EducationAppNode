import React from 'react';
import "./index.css";
import close from "../../assets/close.svg";
import anonymus from "../../assets/anonymus.png";

const ForgotPassword = () => {
    return (
        <div className="forgot-password-modal">
            <div className="forgot-password-inner">
                <div className="modal-header">
                    <img src={close} alt="close" className="close-image" />
                </div>
                <section className="forgot-section">
                    <div className="forgot-image">
                        <img src={anonymus} alt="user" />
                    </div>
                    <div className="forgot-title">
                        Password Assistance
                        </div>
                    <div className="forgot-text">
                        Enter the email address associated with your account
                        </div>
                    <div className="forgot-label">
                        E-mail
                        <input type="text"/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ForgotPassword