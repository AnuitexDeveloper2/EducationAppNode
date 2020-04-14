import React from "react";
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/header"
import { Provider } from "react-redux";
import PrintingEditionsForAdmin from "./components/printingEditions/printingEditionsForAdmin";
import { configureStore } from "./Redux/store";
import AuthorsForAdmin from "./components/author/authors";


const store = configureStore()

function App() {
  return (
    <div>
    <Provider store={store}>
      <Router>
    <Header></Header>
      <div className="app-body">
       <Route path='/books' component={PrintingEditionsForAdmin}></Route>
       <Route path="/authors" component={AuthorsForAdmin}/>
      </div>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
