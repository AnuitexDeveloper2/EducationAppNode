import * as Auth from "../../services/authService";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import './CSS/signIn.scss'
import close from "../../assets/close.svg"
import anonymus from "../../assets/anonymus.png"
import Register from "../auth/register"
import { Redirect } from "react-router-dom";

export interface LoginProps {
   
  }
 
 export class SignIn extends React.Component<any,LoginProps> {
   constructor(props: any) {
        super(props)
      }
        state={
          showLogIn: true,
          showRegister: false
        }

        showRegister = async () => {
          debugger;
          this.setState({
            showLogIn: false,
            showRegister: true
          })
        }

        showLogIn = async () => {
          debugger;
          this.setState({
            showLogIn: true,
            showRegister: false
          })
        }
   

    // togglePopup() {
    //     debugger;
    //    this.setState({
    //      show: !this.state.show!
    //    });
       
    //  }

  

    onSubmitLogIn = async (value: any) => {
        debugger;
      const result = await Auth.signIn(value)
      console.log()
      const token = result.AccessToken;
      localStorage.setItem('AccessToken', token)}

    onSubmitRegister = async (value: any) => {
      await Auth.register(value)
    }

    onFacebookLogin = async () => {
        Auth.moveFacebook();
     } 

  //    openRegister = () => {
  //    {
  //      debugger;
  //      window.location.assign('/register');
  //     }
  //  }

    render() {
      
        if (this.state.showLogIn) {
          
          debugger;
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
                     onSubmit={this.onSubmitLogIn}
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
                <Button  className="signUpButton" variant="primary" onClick={this.showRegister} > 
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
      if (this.state.showRegister) {
        debugger;
        return (
          <div className="registerWindow">
              <div className="registerContent">
                <div className="registerHeader">
                  <div className="close">
                    <img src={close} onClick={this.props.closePopup}/>
                  </div>
                  <div className="userImgRegister">
                    <img src={anonymus} alt=""/>
                </div>
                <div className="createAccountLabel">
                  Create Account
              </div>
              <Form
       onSubmit={this.onSubmitRegister}
       render={({handleSubmit,form,submitting,pristine,values}) => (
         <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="userNameLabel">Your UserName</label>
                  <Field type="text" name="userName" className="userNameForm" component="input"  />
             </div>
              <div className="form-group col-md-6">
                   <label className="firstNameLabel ">Your First Name</label>
                    <Field type="text" name="firstName" className="firstNameForm" component="input" />
              </div>
              <div className="form-group col-md-6">
                   <label className="lastNameLabel ">Your Last Name</label>
                    <Field type="text" name="lastName" className="lastNameForm" component="input" />
              </div>
              <div className="form-group col-md-6">
                   <label className="emailLabelRegister ">Email</label>
                    <Field type="text" name="email" className="emailFormRegister" component="input" />
              </div>
              <div className="form-group col-md-6">
                   <label className="passwordLabelRegister ">Password</label>
                    <Field type="text" name="passwordHash" className="passwordFormRegister" component="input" />
              </div>
              <div className="form-group col-md-6">
                   <label className="confirmPasswordLabel ">Confirm Password</label>
                    <Field type="text" name="LoginRequest.password" className="confirmPasswordForm" component="input" />
              </div>
          </div>
      </div>
         <div className="form-row">
           <div className="form-group col-md-6">
               <button className="registerButton" type="submit"  disabled={submitting || pristine}   value="register"><span className="registerButtonLabel">SignUp Your Account</span></button>
           </div>
           <span className="alreadyRegister">Already have an account?</span>
          <a className="moveToSignIn" onClick={this.showLogIn}>SignIn</a>
       </div>
      </form>)}
          />
     </div>
    </div>
   </div>
  )}}}
          
    
    export default SignIn