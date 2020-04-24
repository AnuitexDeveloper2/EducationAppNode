import React, { Component } from 'react';
import './header.css';
import  signIn  from "../../assets/SignUp.png";
import bookLogo from "../../assets/Book_Logo_svg.png"
import  PopUpManager  from '../auth/popUpManager';
import { HeaderState } from '../../redux/popUp/types';
import { connect} from "react-redux"
import { showSignInAction } from "../../Redux/popUp/actions";
import { UserModel } from '../../shared/models/user/user';

 class Header extends Component<any, HeaderState> {
  constructor(props: any) {
    super(props);
  }

  state:HeaderState = {
    showLogIn: false,
    showRegister: false,
    user: null
  }

  showSigInForm=(event:any) => {
      const {showLogIn: showTest} = this.state
      this.props.showSignInAction()
  }

  logOut = () => {
    debugger
    localStorage.removeItem("User");
    this.setState({user:null})
  }

  UNSAFE_componentWillMount = () => {
    const user = JSON.parse(localStorage.getItem('User'))
    this.setState({user: user})
  } 
    render() {
        return (
      <div className="header">
          <div className="bookLogo">
            
              <img src={bookLogo} alt="" />
          </div>
          <a className="move-signin">

          <div className="signIn" onClick={this.showSigInForm.bind(this)}>
              {this.state.user===null&& <div>SignIn</div>}
          </div>
          <div className="logOut" >
              {this.state.user!==null&& <div onClick={this.logOut.bind(this)}>LogOut</div>}
          </div>
          </a>
          <div className="signInButton">
              {this.state.user!==null&&<div>
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
              <PopUpManager/>
            </div>
      
      </div>  
    );
}
}

const UserMenu =() => {
  return(
    <div>
      User
      <option value="">Author</option>
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
      <li> <a> <option value="">Orders</option> </a></li>
        </ul>
      </div>
    )
}



const mapStateToProps = (state:any) => {
  return {
        headerState: state
      }
 }  
export default connect(mapStateToProps,{showSignInAction})(Header);

