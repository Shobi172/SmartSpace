import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navb">
      <div className="navb__left"></div>
      <div className="navb__middle">
        <input type="text" placeholder="Search" />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="navb__right">
        <i className="fa fa-user"></i>
      </div>
    </nav>
  );
}

export default Navbar;
