import * as Auth from "../../services/auth";
import React from "react";
import { Form, Field } from "react-final-form";
import FacebookLogin from "react-facebook-login";
import "./CSS/signIn.css";
import close from "../../assets/close.svg";
import anonymus from "../../assets/anonymus.png";
import { HeaderState } from "../../Redux/header/types";

export interface LoginState {
  showLogIn: boolean;
  showRegister: boolean;
}

export class SignIn extends React.Component<any> {

  state: HeaderState = {
    showLogIn: false,
    showRegister: false,
    showCart: false,
    user: null,
    showConfirm: false,
    showForgot: false
  };

  responseFacebook = async (response) => {
    const name = response.name.split(" ");
    const user = {
      userName: response.name,
      email: response.email,
      firstName: name[0],
      lastName: name[1],
      password: null,
    };

    const result = await Auth.oauthSignIn(user);
    if (result) {
      this.successedLogIn(result);
    }
  };

  showRegister = async () => {
    this.closePopUp();
    this.props.showRegisterAction();
  };

  closePopUp = () => {
    this.props.hideSignInAction();
    this.props.showForgot()
  };

  onSubmitLogIn = async (value: any) => {
    const result = await Auth.signIn(value);
    if (result.result) {
      this.successedLogIn(result);
    }
    if (!result.result) {
      alert(result.error);
    }
  };

  showForgotPassword = () => {
    this.closePopUp();
  }

  successedLogIn(result) {
    const token = result.AccessToken;
    const refresh = result.RefreshToken;
    localStorage.setItem("AccessToken", token);
    localStorage.setItem("RefreshToken", refresh);
    localStorage.setItem("User", JSON.stringify(result.User));
    window.location.assign("/main");
  }

  render() {
    return (
      <div className="signin-modal">
        <div className="signin-modal-inner">
          <div className="modalHeader">
            <div className="close">
              <img src={close} alt="close" onClick={this.closePopUp} />
            </div>
          </div>
          <div className="userImg">
            <img src={anonymus} alt="" />
          </div>
          <div className="LogIn">SignIn</div>
          <div className="SignIn_form">
            <div>
              <Form
                onSubmit={this.onSubmitLogIn}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="emailLabel">Email</label>
                          <Field
                            type="text"
                            name="email"
                            className="emailForm"
                            component="input"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label className="passwordLabel">Password</label>
                          <label className="forgotPasswordLabel whitespace-no-wrap cursor-pointer" onClick={this.showForgotPassword}>Forgot Your password?</label>
                          <Field
                            type="text"
                            name="password"
                            className="passworForm"
                            component="input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <button
                          className="submit"
                          type="submit"
                          disabled={submitting || pristine}
                          value="register"
                        >
                          Sign In
                        </button>
                      </div>
                      <div>
                        <input type="checkbox" className="checkbox" />
                      </div>
                      <div className="rememberMe">Remember me</div>
                      <div className="signUpLabel">
                        New to Book Publishing Company?
                      </div>
                      <div className="form-group col-md-6">
                          <div>
                            <button
                              className="signUpButton"
                              onClick={this.showRegister.bind(this)}
                            >
                              <div className="sign_up_button_name">SignUp</div>
                            </button>
                          </div>
                      </div>
                    </div>
                  </form>
                )}
              />
              <div className="signUpLabel"></div>
              <div className="facebook-logIn">
                <FacebookLogin
                  appId="869634570156556"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  icon="fa-facebook"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
