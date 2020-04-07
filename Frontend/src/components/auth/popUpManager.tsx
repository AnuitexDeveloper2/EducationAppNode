import  React  from "react";
import { connect } from "react-redux";
import  SignIn  from "../../containers/signIn/signInContainers";
import  Register  from "../../containers/register/registerConteiner";

const PopUpManager: React.FC<any>= ({popupState}) => {
    if (popupState.popUpmanager.showLogIn) {
        
        return(
            <div>
            <SignIn></SignIn>
        </div>
    )
}
    if (popupState.popUpmanager.showRegister) {
        return(
            <div>
            <Register></Register>
        </div>
            )
    }
    return(
        <div></div>
    )
}

const mapStateToProps = (state:any) => {
    return {
          popupState: state
        }
   }
  
  export default connect(mapStateToProps,null)(PopUpManager)