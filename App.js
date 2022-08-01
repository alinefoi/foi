import react from "react";
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addContact" element={<AddEdit />}></Route>
          <Route exact path="/update/:id" element={<AddEdit/>}></Route>
          <Route exact path="/view/:id" element={<View/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
