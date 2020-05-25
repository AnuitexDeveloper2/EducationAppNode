import { connect } from "react-redux";
import { Register } from "../../components/auth/register";
import { showSignInAction, hideRegisterAction, showConfirmEmail} from "../../Redux/header/actions";

const mapDispatcToProps = {
    showSignInAction,
    hideRegisterAction,
    showConfirmEmail
}


export default connect(null,mapDispatcToProps)(Register)