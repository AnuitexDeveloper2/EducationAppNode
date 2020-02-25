import React, { Component } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import ModalHeader from 'react-bootstrap/ModalHeader'
import { Modal } from "react-bootstrap"
import {Navbar,NavItem,Nav,Button} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import SignIn from '../../components/auth/signIn';


export class Header extends Component {
  
  
   
    
   
    render() {
        return (
   
            <div>
            <SignIn  ></SignIn>
              <Navbar  collapseOnSelect>
                <Nav>
                  <NavItem>
                    <Button >Login</Button>
                  </NavItem>
                 </Nav>
               </Navbar>
 
         </div>  
    );
}

}
export default Header;
