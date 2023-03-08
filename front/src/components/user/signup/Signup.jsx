import React, { useState, useEffect } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../../redux/features/authSlice";
import { MDBSpinner } from "mdb-react-ui-kit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const SignupPage = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, name, phone } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError && !emailError && !phoneError && !passwordError) {
      dispatch(register({ formValue, navigate, toast }));
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    switch (name) {
      case "name":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "phone":
        validatePhone(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      setNameError("Name can only contain alphabets");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      setPhoneError("Phone number is required");
    } else if (!/^[0-9]{10}$/.test(value)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <img className="img" src="images/banner3.jpg" alt="BigCo Inc. logo" />
        </div>
        <div className="right">
          <form
            className="form_container"
            method="post"
            onSubmit={handleSubmit}
          >
            <h1>Sign up</h1>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required
              onChange={onInputChange}
              className="input"
            />
            {nameError && <span className="error-text">{nameError}</span>}

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              required
              onChange={onInputChange}
              className="input"
            />
            {emailError && <span className="error-text">{emailError}</span>}

            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={phone}
              required
              onChange={onInputChange}
              className="input"
            />
            {phoneError && <span className="error-text">{phoneError}</span>}

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onInputChange}
              required
              className="input"
            />
            {passwordError && (
              <span className="error-text">{passwordError}</span>
            )}

            <button type="submit" className="green_btn">
              {loading && (
                <MDBSpinner
                  size="sm"
                  role="status"
                  tag="span"
                  className="me-2"
                />
              )}
              Sign up
            </button>

            <h1>Already a member ?</h1>
            <Link to="/signin">Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
