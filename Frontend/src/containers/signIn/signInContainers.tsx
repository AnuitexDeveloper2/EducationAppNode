import { connect } from "react-redux";
import { SignIn } from "../../components/auth/signIn";
import { hideSignInAction, showRegisterAction } from "../../Redux/popUp/actions"

const mapDispatchToProps =  {
    hideSignInAction,
    showRegisterAction
};

export default connect(null,mapDispatchToProps)(SignIn)