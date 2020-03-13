import React from "react";
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Register from "./components/auth/register"
import Header from "./shared/header/header"
import LogIn from "./components/auth/signIn";
import Test from "./components/auth/test";
import {Store} from "redux";
import { Provider } from "react-redux";
// import { RootState } from "./redux/rootReducer";
// import  configureStore  from "./redux/store";
import PrintingEditionsForAdmin from "./components/printingEditions/printingEditionsForAdmin";

// const store: Store<RootState> = configureStore();

function App() {
  return (
    <div>
    {/* <Provider store={store}> */}
      <Router>
    <Header></Header>
      <div>
       <Route path='/books' component={PrintingEditionsForAdmin}></Route>
       <Route path='/register' component={Test}></Route>
      </div>
      </Router>
    {/* </Provider> */}
    </div>
  );
}

export default App;
