import { connect } from "react-redux";
import { Register } from "../../components/auth/register";
import { showSignInAction, hideRegisterAction, showConfirmEmail, showErrorAction} from "../../Redux/header/actions";

const mapDispatcToProps = {
    showSignInAction,
    hideRegisterAction,
    showConfirmEmail,
    showErrorAction
}


export default connect(null,mapDispatcToProps)(Register)