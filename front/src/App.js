import "./App.css";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Property from "./pages/user/Property";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Properties from "./pages/admin/Properties";
import Sales from "./pages/admin/Sales";
import PropertyType from "./pages/admin/PropertyType";
import AdminLogin from "./pages/admin/Login";
import AddProperty from "./pages/user/AddProperty";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />

        <Routes>
          <Route path="/"  element={ <Home /> } />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/services" exact element={<Property />} />
          <Route path="/addproperty" element={user ? <AddProperty /> : <Navigate to="/signin"/>} />

          <Route exact path="/admin" element={<AdminLogin />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/users" element={<Users />} />
          <Route exact path="/admin/propertyType" element={<PropertyType />} />
          <Route exact path="/admin/properties" element={<Properties />} />
          <Route exact path="/admin/sales" element={<Sales />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}   

export default App;
