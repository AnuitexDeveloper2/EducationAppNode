import React from "react";
import './App.css';
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Register from "./components/auth/register"
import Header from "./shared/header/header"
import LogIn from "./components/auth/signIn";
import Test from "./components/auth/test";
import Store from "redux";
import { Provider } from "react-redux";

//const store = Store<RootState>()

function App() {
  return (
    <div>
    <BrowserRouter>
    <Header></Header>
      <div>
       <Route exact path='/register' component={Register} />
       <Route path='test' component={Test}></Route>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
