import React, { Component, useState } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import {Navbar,NavItem,Nav,Button, ButtonToolbar} from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import SignIn from '../../components/auth/signIn';
import bookLogo from "../../assets/Book_Logo_svg.png"

export class Header extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  state= {showModal:false}
  
  handleAdd= () =>{
    this.setState({ isModalOpen: true });
  }
   
    render() {
      let addModalClose=() =>this.setState({addModalClose:false})
        return (
            <div className="header">
           
          <ButtonToolbar>
            
            <Allows/>
          </ButtonToolbar>
         </div>  
    );
}

}
export default Header;

export const Allows = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <ButtonToolbar>
    <div className="bookLogo">
      <img src={bookLogo} alt=""/>
    </div>
      <div className="signIn">
         SignIn
      </div>
      <Button className="signInButton" variant="primary" onClick={() => setModalShow(true)}>
        <img src={signIn} alt=""/>
      </Button>

      <SignIn show={modalShow} onHide={() => setModalShow(false)} />
    </ButtonToolbar>
  );



};