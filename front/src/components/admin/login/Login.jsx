import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/features/authSlice";
import { MDBSpinner } from "mdb-react-ui-kit";
import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      dispatch(login({ formValue, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    if (name === "email") {
      validateEmail(value);
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <img className="img" src="images/banner8.jpg" alt="BigCo Inc. logo" />
        </div>
        <div className="right">
          <form
            className="form_container"
            method="post"
            onSubmit={handleSubmit}
          >
            <h1>Admin Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onInputChange}
              className="input"
              required
              invalid={!!emailError}
              validation={emailError}
            />
            {emailError && <span className="error-text">{emailError}</span>}
            <div className="password_input_container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange}
                required
                invalid={!!passwordError}
                validation={passwordError}
                className="input password_input"
              />
              <i
                className={`password_toggle_icon fa ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
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
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
