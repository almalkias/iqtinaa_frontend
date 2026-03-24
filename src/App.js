import React from "react";
import './App.css';
import Router from './Router';
import Loader from "./components/Loader/Loader";



function App() {
  return (
    <div className="App">
      <Loader />
      <Router />
    </div>
  );
}

export default App;
