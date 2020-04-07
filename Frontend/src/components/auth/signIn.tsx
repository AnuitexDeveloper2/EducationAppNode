import * as Auth from "../../services/auth";
import React from "react";
import { Form, Field } from "react-final-form";
import { Button, ButtonToolbar } from "react-bootstrap";
import './CSS/signIn.scss'
import close from "../../assets/close.svg"
import anonymus from "../../assets/anonymus.png"
import { PopUpState } from "../../redux/popUp/types";

export interface LoginState {
  showLogIn: boolean,
  showRegister: boolean
  }
 
 export class SignIn extends React.Component<any> {
   constructor(props: any) {
        super(props)
      }
        state: PopUpState={
          showLogIn: false,
          showRegister: false
        }

        showRegister = async () => {
          debugger;
          this.closePopUp()
          this.props.showRegisterAction()
        }

       

    closePopUp =()=> {
        this.props.hideSignInAction()
    }
   
    onSubmitLogIn = async (value: any) => {
      debugger
      const result = await Auth.signIn(value)
      const token = result.AccessToken;
      localStorage.setItem('AccessToken', token)}

    onFacebookLogin = async () => {
        Auth.moveFacebook();
     } 

  //      window.location.assign('/register');

    render() {
      
          debugger
          return (
            
            <div className="modalWindow">
        <div className="modalContent">
           <div className="modalHeader">
              <div className="close">
                 <img src={close} onClick={this.closePopUp}/>
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
                               <Button  className="signUpButton" variant="primary" onClick={this.showRegister.bind(this)} > 
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
 }}