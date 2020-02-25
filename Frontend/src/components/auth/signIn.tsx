import * as Auth from "./auth";
import { RouteComponentProps, Link } from "react-router-dom";
import React from "react";
import { Form, Field } from "react-final-form";
import { Modal } from "react-bootstrap";
import * as Header from "../../shared/header/header"


export interface UserParameters {
    email: string;
    password: string;
}

type UserProps = UserParameters & Auth.UserProps 
 //typeof Auth.actionCreators & 
 

 
 
 export class SignIn extends React.Component {

    onSubmit() {
        
     }

    render() {
        return (
            <Modal >

            <div className="SignIn_form">
                <div>
                <Form
                        onSubmit={this.onSubmit}
                        
                        render={({handleSubmit,form,submitting,pristine,values}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">Email</label>
                                        <Field type="text" name="email" className="form-control" component="input"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">Password</label>
                                        <Field type="text" name="passwordHash" className="form-control" component="input"/>
                                    </div>
                                  </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <button type="submit" disabled={submitting || pristine} className="btn btn-dark addButton btn-block" value="register">Sign Up</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/BookList" className="btn btn-secondary btn-block"><i className="fa fa-table"></i> Back to Book List</Link>
                                    </div>
                                </div>
                            </form>
                        )}

                        />
                </div>
            </div>
                        </Modal>
        )
    }

 }

 export default SignIn

