import React, { useState } from 'react';
import "./index.css";
import close from "../../assets/close.svg";
import anonymus from "../../assets/anonymus.png";
import { forgotPassword } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { hideForgot } from '../../Redux/header/actions';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const [state,setState] = useState('')

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value)
    }

    const closeModal = () => {
        dispatch(hideForgot())
    }
    const sendEmail = async () => {
        const result = await forgotPassword(state)
        if (result) {
            dispatch(hideForgot())
        }
    }
    return (
        <div className="forgot-password-modal">
            <div className="forgot-password-inner">
                <div className="modal-header">
                    <img src={close} alt="close" onClick={closeModal} className="close-image" />
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
                    <div className="forgot-input">
                            <input type="text" className="forgot-input" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="forgot-button-section">
                            <button className="forgot-button cursor-pointer" onClick={sendEmail}><span className="forgot-button-title">Coninue</span></button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ForgotPassword