import React from 'react';
import { Form, Field } from "react-final-form";
import { RouteComponentProps } from 'react-router-dom';
import "./CSS/register.scss";
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import close from "../../assets/close.svg";
import  * as authService  from "../../services/authService";
import anonymus from "../../assets/anonymus.png";




export class Register extends React.Component<any> {
    constructor(props: any){
        super(props)
    }
    
   

    onSubmit = async (values: any) => {
        debugger;
        console.log(values)
        authService.register(values)
    }

    render() {
        return (
            <div className="registerWindow">
            <div className="registerContent">
               <div className="registerHeader">
                  <div className="close">
                     <img src={close} onClick={this.props.closePopup}/>
                 </div>
              </div>
                <div className="userImg">
                    <img src={anonymus} alt=""/>
                </div>
                 <div className="signUp">
                         Create Account
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
                    <Button  className="signUpButton" variant="primary"  > 
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
                                         <button >Facebook</button>
                                  </div>
                        </div>
                    </div>
                 </div>
            </div>
                   )
               }
}

export default Register;
