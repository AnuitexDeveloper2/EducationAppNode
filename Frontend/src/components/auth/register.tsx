import React from 'react';
import { Form, Field } from "react-final-form";
import * as Auth from "./auth";
import { RouteComponentProps, Link } from 'react-router-dom';
import "./CSS/register.css";

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


export class Register extends React.Component<UserProps> {
    state = {
        closed: true,
    };

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
        //Arreglar que cuando no cambio el author no me lo setea bien
        Auth.register(values,this.redirect)
    }

    render() {
        return (
            <div className="RegisterForm">
                <div className="">
                  <Form
                        onSubmit={this.onSubmit}

                        render={({handleSubmit,form,submitting,pristine,values}) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="inputLabel">UserName</label>
                                    <Field type="text" name="userName" className="form-control" component="input" />
                                   <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">First Name</label>
                                        <Field type="text" name="firstName" className="form-control" component="input" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">Last Name</label>
                                        <Field type="text" name="lastName" className="form-control" component="input"/>
                                    </div>
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
    );
}
}

export default Register;
