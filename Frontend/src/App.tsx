import React, { useState, useMemo } from "react";
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/store";
import Header from "./components/header/header"
import PrintingEditionsForAdmin from "./components/printingEditions/printingEditionsForAdmin";
import AuthorsForAdmin from "./components/author/authors";
import UsersForAdmin from "./components/users/userForAdmin";
import  MainPaige, { ProductContext }  from "./components/main/main";
import Product from "./components/selectedProduct/product";
import Cart from "./components/cart/cart";
import { MyProfile } from "./components/profile/myProfile";


const store = configureStore()

function App() {
  return (
    <div>
    <Provider store={store}>
      <Router>
    <Header></Header>
      <div className="app-body">
        <Route path="/Cart" component={Cart}/>
        <Route path="/books" component={PrintingEditionsForAdmin}/>
        <Route path="/authors" component={AuthorsForAdmin}/>
        <Route path="/users" component ={UsersForAdmin}/>
        <Route path="/main" component={MainPaige}/>
        <Route path="/book" component ={Product}/>
        <Route path="/profile" component={MyProfile}/>
      </div>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
