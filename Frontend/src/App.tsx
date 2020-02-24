import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/layout';
import { Route } from 'react-router-dom';
import  Home  from "./components/auth/register";

function App() {
  return (
    <div className="App">
     <Layout>
     </Layout>
    </div>
  );
}

export default App;
