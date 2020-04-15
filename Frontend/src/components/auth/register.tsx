import React from 'react';
import { Form, Field } from "react-final-form";
import { RouteComponentProps } from 'react-router-dom';
import "./CSS/register.scss";
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import close from "../../assets/close.svg";
import  * as authService  from "../../services/auth";
import anonymus from "../../assets/anonymus.png";
import { formValidation } from "../../shared/validateForm/RegisterValidateForm";




export class Register extends React.Component<any> {
    constructor(props: any){
        super(props)
    }
    
    showLogIn = () => {
      this.props.hideRegisterAction();
      this.props.showSignInAction();
    }
    
    closePopUp = () => {
      this.props.hideRegisterAction();
    }

    onSubmitRegister = async (values: any) => {
        debugger;
       const result = await authService.register(values)
       if (result.err ===true) {
        this.props.hideRegisterAction();
       }
    }
   

    render() {
        return (
          <div className="registerWindow">
              <div className="registerContent">
                <div className="registerHeader">
                  <div className="close">
                    <img src={close} onClick={this.closePopUp.bind(this)}/>
                  </div>
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
                  <Field  name="userName" >
                  {({ input, meta }) => (
                  <div>
                  <input className="userNameForm" {...input} />
                  {meta.error && meta.touched && <span className="userName_error">{"Please Enter Your UserName"}</span>}
                </div>
                  )}
                  </Field>
             </div>
              <div className="form-group col-md-6">
                   <label className="firstNameLabel ">Your First Name</label>
                    <Field  name="firstName">
                     {({ input, meta }) => (
                  <div>
                  <input className="firstNameForm" {...input} />
                  {meta.error && meta.touched && <span className="firstName_error">{"Please Enter Your First Name"}</span>}
                </div>
                  )}
                    </Field>
              </div>
              <div className="form-group col-md-6">
                   <label className="lastNameLabel ">Your Last Name</label>
                    <Field  name="lastName" >
                    {({ input, meta }) => (
                  <div>
                  <input className="lastNameForm" {...input} />
                  {meta.error && meta.touched && <span className="lastName_error">{"Please Enter Your First Name"}</span>}
                </div>
                  )}
                    </Field>
              </div>
              <div className="form-group col-md-6">
                   <label className="emailLabelRegister ">Email</label>
                    <Field  name="email">
                    {({ input, meta }) => (
                  <div>
                  <input className="emailFormRegister" {...input} />
                  {meta.error && meta.touched && <span className="email_error">{"Please Enter a valid email adress"}</span>}
                </div>
                  )}
                    </Field>
              </div>
              <div className="form-group col-md-6">
                   <label className="passwordLabelRegister ">Password</label>
                    <Field type="text" name="passwordHash">
                    {({ input, meta }) => (
                  <div>
                  <input className="passwordFormRegister" {...input} />
                  {meta.error && meta.touched && <span className="password_error">{"Password must be at least 6 characters"}</span>}
                </div>
                  )}
                    </Field>
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
          <a className="moveToSignIn" onClick={this.showLogIn.bind(this)}>SignIn</a>
       </div>
      </form>)}
          />
     </div>
    </div>
   </div>
  )}}