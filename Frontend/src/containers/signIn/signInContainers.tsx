import { connect } from "react-redux";
import { SignIn } from "../../components/auth/signIn";
import {
  hideSignInAction,
  showRegisterAction,
  signInAction,
  showForgot,
  hideForgot
} from "../../Redux/header/actions";

const mapDispatchToProps = {
  hideSignInAction,
  showRegisterAction,
  signInAction,
  showForgot,
  hideForgot
};

export default connect(null, mapDispatchToProps)(SignIn);
