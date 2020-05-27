import React, { Component } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import bookLogo from "../../assets/Book_Logo_svg.png"
import cart from "../../assets/shopping_cart_icon.png"
import  PopUpManager  from '../auth/popUpManager';
import { HeaderState } from '../../Redux/header/types';
import { connect} from "react-redux"
import { showSignInAction, showCartAction, showConfirmEmail } from "../../Redux/header/actions";

 class Header extends Component<any, HeaderState> {

  state:HeaderState = {
    showLogIn: false,
    showRegister: false,
    showCart: false,
    showConfirm:false,
    user: null
  }

  showSigInForm=(event:any) => {
      this.props.showSignInAction()
  }

  showCart = () => {
    this.props.showCartAction()
  }

  logOut = () => {
    localStorage.clear();
    this.setState({user:null})
    window.location.assign('/main')
  }

  UNSAFE_componentWillMount = () => {
    const user = JSON.parse(localStorage.getItem('User'))
    this.setState({user: user})
  } 
    render() {
        return (
          <div>
            
      <div className="header">
          <div className="bookLogo">
            <a href="/main"> <img src={bookLogo} alt="to Main paige"/> </a>
          </div>

           {/* eslint-disable-next-line */}
          <a className="move-signin" >

          <div className="signIn" onClick={this.showSigInForm.bind(this)}>
              {this.state.user===null&& <div>SignIn</div>}
          </div>
          <div className="logOut" >
              {this.state.user!==null&& <div onClick={this.logOut.bind(this)}>LogOut</div>}
          </div>
          </a>
          <div className="signInButton">
              {this.state.user!==null&&<div>
              {this.state.user.role==="User"&&<img src={cart} alt="cart" className="shopping-cart" onClick={this.showCart}/>}
              <nav>
                <ul>
                  <li>
                    
                    <img src={signIn} alt="menu" />
                      {this.state.user.role==="Admin"&&<AdminMenu/>}
                      {this.state.user.role==="User"&&<UserMenu/>}
                  </li>
                </ul>
              </nav>
        </div>
    }
            </div>
      
            
      </div>  
              <PopUpManager/>
    </div>
    );
}
}

const UserMenu =() => {
  return(
    <div className="option-menu">
        <ul className="option-item">

      <li> <a href="/profile"> <option>MyProfile</option> </a></li>
      <li> <a href="/myOrders"> <option>MyOrders</option> </a></li>
        </ul>
      </div>
  )
}

const AdminMenu = () => {
    return(
      <div className="option-menu">
        <ul className="option-item">

      <li> <a href="/users"> <option>Users</option> </a></li>
      <li> <a href="/books"> <option>Products</option> </a></li>
      <li> <a href="/authors"> <option value="">Authors</option></a></li>
      <li> <a href="/orders"> <option value="">Orders</option> </a></li>
        </ul>
      </div>
    )
}



const mapStateToProps = (state:any) => {
  return {
        headerState: state
      }
 }  

const mapDispatchToProps = {
  showSignInAction,
  showCartAction,
  showConfirmEmail
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);

