import React, { Component, useState } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import {Navbar,NavItem,Nav,Button, ButtonToolbar, ModalDialog} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import bookLogo from "../../assets/Book_Logo_svg.png"
import  PopUpManager  from '../../components/auth/popUpManager';
import { PopUpState } from '../../redux/popUp/types';
import { connect} from "react-redux"
import { showSignInAction } from '../../redux/popUp/actions';

 class Header extends Component<any, PopUpState> {
  constructor(props: any) {
    super(props);
  }

  state:PopUpState = {
    showLogIn: false,
    showRegister: false
  }

  showSigInForm=(event:any) => {
    debugger;
      const {showLogIn: showTest} = this.state
      this.props.showSignInAction()
  }
    render() {
        return (
      <div className="header">
          <div className="bookLogo">
            
              <img src={bookLogo} alt=""/>
          </div>
          <div className="signIn">
              SignIn
          </div>
          <div className="signInButton">
          {/* onClick={this.togglePopup.bind(this)} */}
              <img src={signIn} alt="" onClick={this.showSigInForm.bind(this)}  />
            
              <PopUpManager/>
              
            
            </div>
      
      </div>  
    );
}


}
  
export default connect(null,{showSignInAction})(Header);

