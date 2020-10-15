import React, { Component } from "react";
import "./header.css";
import signIn from "../../assets/SignUp.png";
import bookLogo from "../../assets/Book_Logo_svg.png";
import cart from "../../assets/shopping_cart_icon.png";
import PopUpManager from "../auth/popUpManager";
import { HeaderState } from "../../Redux/header/types";
import { connect } from "react-redux";
import {
  showSignInAction,
  showCartAction,
  showConfirmEmail,
} from "../../Redux/header/actions";

class Header extends Component<any, HeaderState> {
  state: HeaderState = {
    showLogIn: false,
    showRegister: false,
    showCart: false,
    showConfirm: false,
    showForgot: false,
    user: null,
    isHidden: false
  };

  showSigInForm = (event: any) => {
    this.props.showSignInAction();
  };

  showCart = () => {
    this.props.showCartAction();
  };

  logOut = () => {
    localStorage.clear();
    this.setState({ user: null });
    window.location.assign("/main");
  };

  componentDidMount() {
    if (typeof window == 'object') {
      window.addEventListener('scroll', this.hideBar);
    }
  }

  UNSAFE_componentWillMount = () => {
    if (typeof window == 'object') {
      window.removeEventListener('scroll', this.hideBar);
    }
    const user = JSON.parse(localStorage.getItem("User"));
    this.setState({ user: user });
  };

  hideBar = () => {
    const nav = document.querySelector(".header") as any

    if (window.scrollY > nav.offsetHeight) {
      window.scrollY > 100 ?
        this.setState({ isHidden: true })
        :
        this.setState({ isHidden: false });
    }
  }


  render() {
    const hideHeader = this.state.isHidden ? 'hidden' : ''
    return (
      <div>
        <div className={`header ${hideHeader}`}>
          <div className="bookLogo">
            <a href="/main">
              {" "}
              <img src={bookLogo} alt="to Main paige" />{" "}
            </a>
          </div>
          <div className="flex items-center mr-16">
            <div className="signInButton cursor-pointer">
              {this.state.user !== null && (
                <div className="flex items-center">
                  {this.state.user.role === 1 && (
                    <img
                      src={cart}
                      alt="cart"
                      className="shopping-cart cursor-pointer"
                      onClick={this.showCart}
                    />
                  )}
                  <nav>
                    <ul>
                      <li>
                        <img src={signIn} alt="menu" />
                        {this.state.user.role === 0 && <AdminMenu />}
                        {this.state.user.role === 1 && <UserMenu />}
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
            <div className="move-signin  cursor-pointer">
              <div className="signIn" onClick={this.showSigInForm.bind(this)}>
                {this.state.user === null && <div>SignIn</div>}
              </div>
            </div>
            <div className="logOut cursor-wait">

              {this.state.user !== null && (
                <div onClick={this.logOut.bind(this)}>LogOut</div>
              )}
            </div>
          </div>
        </div>
        <PopUpManager />
      </div>
    );
  }
}

const UserMenu = () => {
  return (
    <div className="option-menu">
      <ul className="option-item">
        <li>
          {" "}
          <a href="/profile">
            {" "}
            <option>MyProfile</option>{" "}
          </a>
        </li>
        <li>
          {" "}
          <a href="/myOrders">
            {" "}
            <option>MyOrders</option>{" "}
          </a>
        </li>
      </ul>
    </div>
  );
};

const AdminMenu = () => {
  return (
    <div>
      <div className="option-menu">
        <ul className="option-item">
          <li>
            <a href="/users">
              <option>Users</option>
            </a>
          </li>
          <li>
            <a href="/books">
              <option>Products</option>
            </a>
          </li>
          <li>
            <a href="/authors">
              <option value="">Authors</option>
            </a>
          </li>
          <li>
            <a href="/orders">
              <option value="">Orders</option>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    headerState: state,
  };
};

const mapDispatchToProps = {
  showSignInAction,
  showCartAction,
  showConfirmEmail,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
