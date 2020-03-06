import React from 'react';
import { Form, Field } from "react-final-form";
import * as Auth from "./auth";
import { RouteComponentProps, Link } from 'react-router-dom';
import "./CSS/register.scss";
import { Modal, ButtonToolbar } from 'react-bootstrap';
import close from "../../assets/close.svg";

export interface UserParameters {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string
}

type UserProps = UserParameters & Auth.UserProps &
 //typeof Auth.actionCreators & 
 RouteComponentProps<{}>;


export class Register extends React.Component<any> {
    constructor(props: any){
        super(props)
    }
    
   
    /*openForm() {
        this.setState({
            closed: false,
        });
    }

    closeForm() {
        this.setState({
            closed: true,
        });
    }*/

    redirect = () => {
        this.props.history.push('/bookList');
    }

    onSubmit = async (values: any) => {
        debugger;
        console.log(values)
        Auth.register(values,this.redirect)
    }

    render() {
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

export default Register;
