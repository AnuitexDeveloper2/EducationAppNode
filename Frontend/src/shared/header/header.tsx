import React, { Component, useState } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import {Navbar,NavItem,Nav,Button, ButtonToolbar, ModalDialog} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import SignIn from '../../components/auth/signIn';
import bookLogo from "../../assets/Book_Logo_svg.png"

export class Header extends Component<{}, { showPopup: boolean,showRegister: boolean }> {
  constructor(props: string) {
    super(props);
    this.state = {
      showPopup: false,
      showRegister: false
    };
  }
   togglePopup() {
     debugger;
    this.setState({
      showPopup: !this.state.showPopup
    });
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
              <img src={signIn} alt="" className="signInButton" onClick={this.togglePopup.bind(this)}/>
            {
            this.state.showPopup ?
            <SignIn closePopup={this.togglePopup.bind(this)} /> : null
             }
      
      </div>  
    );
}


}
export default Header;

