export interface ApplicationState {
   
}

export interface AppAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

/*
  <div className="modalWindow">
         <div className="modalContent">
            <Modal.Header closeButton >
            <div className="modalHeader">
                   <div className="close">
                     <img src={close} alt="" onClick={this.props.onHide}/>
                    </div>
                 </div>
            </Modal.Header>
            <Modal.Body>
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
             </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
       </div>
     </div>
          
*/