import * as Auth from "./auth";
import { RouteComponentProps, Link } from "react-router-dom";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import * as Header from "../../shared/header/header"
import './CSS/signIn.css'
import close from "../../assets/close.svg"
import anonymus from "../../assets/anonymus.png"


export interface UserParameters {
    email: string;
    password: string;
}

type UserProps = UserParameters & Auth.UserProps 
 //typeof Auth.actionCreators & 
 

 
 
 export class SignIn extends React.Component<any> {

    redirect = () => {
        this.props.history.push('/bookList');
    }

    onSubmit = async (values: any) =>  {
        debugger;
        Auth.signIn(values,this.redirect)
     }

    render() {
        debugger;
        return (


     <Modal
         {...this.props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         <div className="modalWindow">
             <div className="modalContent">
                 <Modal.Header closeButton >
                   <div className="modalHeader">
                       <div className="close">
                           <img src={close} onClick={this.props.onHide}/>
                        </div>
                     </div>
                 </Modal.Header>
                 <Modal.Body>
                     <div className="userImg">
                         <img src={anonymus} alt=""/>
                     </div>
                     <div className="LogIn">
                        SignIn
                     </div>
                    <div className="SignIn_form">
                        <div>
                            <Form
                                onSubmit={this.onSubmit}
                             render={({handleSubmit,form,submitting,pristine,values}) => (
                            <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label className="emailLabel">Email</label>
                                    <Field type="text" name="email" className="emailForm" component="input"/>
                                  </div>
                                 <div className="form-group col-md-6">
                                     <label className="passwordLabel ">Password</label>
                                      <Field type="text" name="passwordHash" className="passworForm" component="input"/>
                                    </div>
                                 </div>
                                </div>
                                <div className="form-row">
                                     <div className="form-group col-md-6">
                                         <button className="submit" type="submit" disabled={submitting || pristine}  value="register">Sign In</button>
                                     </div>
                                     <div>
                                         <input type="checkbox" className="checkbox"/>
                                     </div>
                                     <div className="rememberMe">
                                         Remember me
                                     </div>
                                     <div className="signUpLabel">
                                         New to Book Publishing Company?
                                     </div>
                                     <div className="form-group col-md-6">
                                         <ButtonToolbar>
                                         <Allows />
                                         </ButtonToolbar>
                                         <div className="sign_up_button_name">
                                         SignUp
                                         </div>
                                       
                                     </div>
                                </div>
                            </form>
                            )}
                                />
                        </div>
                    </div>
                 </Modal.Body>
            <Modal.Footer>
       
            </Modal.Footer>
            </div>
        </div>
    </Modal>
        )
    }

 }

 
 export const Allows = () => {
     const [modalShow, setModalShow] = useState(false);
     return (
         <ButtonToolbar>
     
        <Button className="signInButton" variant="primary" onClick={() => setModalShow(true)}> 
        
        </Button>
  
        <SignIn show={modalShow} onHide={() => setModalShow(false)} />
      </ButtonToolbar>
    );
}
export default SignIn