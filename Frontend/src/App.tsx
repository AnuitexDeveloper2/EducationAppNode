import React from "react";
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Header from "./shared/header/header"
import { Provider } from "react-redux";
import PrintingEditionsForAdmin from "./components/printingEditions/printingEditionsForAdmin";
import { configureStore } from "./redux/store";


const store = configureStore()

function App() {
  return (
    <div>
    <Provider store={store}>
      <Router>
    <Header></Header>
      <div>
       <Route path='/books' component={PrintingEditionsForAdmin}></Route>
      </div>
      </Router>
    </Provider>
    </div>
  );
}

export default App;
