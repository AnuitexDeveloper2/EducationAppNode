import * as Auth from "../../services/authService";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import './CSS/signIn.scss'
import close from "../../assets/close.svg"
import anonymus from "../../assets/anonymus.png"
import Register from "../auth/register"
import { LoginState, LoginRequest } from "../../redux/logIn/types";
import { Redirect } from "react-router-dom";

export interface LoginProps {
    doLogin: (data: LoginRequest) => object;
  }
 
 export class SignIn extends React.Component<any,LoginState,LoginProps> {
   constructor(props: any) {
        super(props)
      
    }

    state: LoginState = {
        email: "",
        password: "",
        error: "",
        isLoading: false,
        showPopup: false
      };
    redirect = () => {
        this.props.history.push('/bookList');
    }

    togglePopup() {
        debugger;
       this.setState({
         showPopup: !this.state.showPopup
       });
     }

    handle = (event: any) =>
    this.setState({ [event.target.name]: event.target.value } as any);

    onSubmit = async (value: LoginRequest) => {
        debugger;
      const result = await Auth.signIn(value)
      console.log()
      const token = result.AccessToken;
      localStorage.setItem('AccessToken', token)}

    onFacebookLogin = async () => {
        Auth.moveFacebook();
     } 

     openRegister = () => {
     {
       debugger;
       window.location.assign('/register');
      }
   }

    render() {
        return (
     <div className="modalWindow">
        <div className="modalContent">
           <div className="modalHeader">
              <div className="close">
                 <img src={close} onClick={this.props.closePopup}/>
             </div>
          </div>
            <div className="userImg">
                <img src={anonymus} alt=""/>
            </div>
             <div className="LogIn">
                     SignIn
            </div>
            <div className="SignIn_form">
                <div>
                   <Form
                     onSubmit={this.onSubmit}
                     render={({handleSubmit,form,submitting,pristine,values}) => (
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label className="emailLabel">Email</label>
                                <Field type="text" name="LoginRequest.email" className="emailForm" component="input"  />
                           </div>
                            <div className="form-group col-md-6">
                                 <label className="passwordLabel ">Password</label>
                                  <Field type="text" name="LoginRequest.password" className="passworForm" component="input" />
                            </div>
                        </div>
                    </div>
                       <div className="form-row">
                         <div className="form-group col-md-6">
                             <button className="submit" type="submit"  disabled={submitting || pristine}   value="register">Sign In</button>
                         </div>
                         <div>
                             <input type="checkbox" className="checkbox"/>
                         </div>
                         <div className="rememberMe">
                              Remember me
                         </div>
                         <div className="signUpLabel">
                              New to Book Publishing Company?
                         </div>
                         <div className="form-group col-md-6">
                             <ButtonToolbar >
                             <div >
                <Button  className="signUpButton" variant="primary" onClick={this.openRegister} > 
                <div className="sign_up_button_name">
                    SignUp
                </div>
           
                </Button>
            </div>
                              </ButtonToolbar>
                         </div>
                     </div>
                         </form>
                        )}
                            />
                            <div className="signUpLabel">
                                     <button onClick={this.onFacebookLogin}>Facebook</button>
                              </div>
                    </div>
                </div>
             </div>
        </div>
        )
      }
 }


export default SignIn