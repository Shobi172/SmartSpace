import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../redux/features/authSlice";
import decode from "jwt-decode";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const [navbarClass, setNavbarClass] = useState("navbar transparent");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setNavbarClass("navbar scroll");
      } else {
        setNavbarClass("navbar transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={navbarClass}>
        <div className="container flex">
          <div className="logo">
            {navbarClass === "navbar transparent" ? (
              <Link to="/">
                <img src="./images/logo_footer.png" alt="" />
              </Link>
            ) : (
              <Link to="/">
                <img src="./images/logo2.png" alt="" />
              </Link>
            )}
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li
                  key={index}
                  className={navbarClass === "navbar scroll" ? "active" : ""}
                >
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {user?.result?._id ? (
            <div className="button flex">
              <Link to="/signin">
                <button
                  className="btn1"
                  style={{ backgroundColor: "#193441" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div className="button flex">
              <Link to="/signin">
                <button className="btn1" style={{ backgroundColor: "#193441" }}>
                  Signin
                </button>
              </Link>
            </div>
          )}

          <div className="toggle">
            <button
              style={{ backgroundColor: "#193441" }}
              onClick={() => setNavList(!navList)}
            >
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
