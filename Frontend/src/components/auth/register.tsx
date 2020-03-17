import React from 'react';
import { Form, Field } from "react-final-form";
import { RouteComponentProps } from 'react-router-dom';
import "./CSS/register.scss";
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import close from "../../assets/close.svg";
import  * as authService  from "../../services/authService";
import anonymus from "../../assets/anonymus.png";
import { formValidation } from "../../shared/validateForm/RegisterValidateForm";




export class Register extends React.Component<any> {
    constructor(props: any){
        super(props)
    }
    
   

    onSubmitRegister = async (values: any) => {
        debugger;
        console.log(values)
        authService.register(values)
    }
   

    render() {
        debugger;
      
            
            return (
                <div className="registerWindow">
                <div className="registerContent">
                  <div className="registerHeader">
                    <div className="userImgRegister">
                      <img src={anonymus} alt=""/>
                  </div>
                  <div className="createAccountLabel">
                    Create Account
                </div>
                <Form
                validate={(values) => formValidation.validateForm(values)}
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
                      <Field type="number" name="email" initialValue="email" className="emailFormRegister" component="select" />
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
            {/* <a className="moveToSignIn" onClick={this.showLogIn}>SignIn</a> */}
         </div>
        </form>)}
            />
       </div>
      </div>
     </div>
                   )
              
            }
           
        }
            
            export default Register;
            