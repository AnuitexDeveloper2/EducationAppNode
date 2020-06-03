import { connect } from "react-redux";
import { SignIn } from "../../components/auth/signIn";
import {
  hideSignInAction,
  showRegisterAction,
  signInAction,
} from "../../Redux/header/actions";

const mapDispatchToProps = {
  hideSignInAction,
  showRegisterAction,
  signInAction,
};

export default connect(null, mapDispatchToProps)(SignIn);
