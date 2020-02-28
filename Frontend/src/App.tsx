import React from "react";
import './App.css';
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Register from "./components/auth/register"
import Header from "./shared/header/header"
import SignIn from "./components/auth/signIn";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Header></Header>
      <div>
       <Route exact path='/register' component={Register} />
       <Route path='signIn' componentz={SignIn}/>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
