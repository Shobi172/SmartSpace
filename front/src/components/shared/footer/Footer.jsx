import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src="../images/logo_footer.png" alt="" />
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="legal">
          <span>
            © 2023 Smart Space Solutions Pvt ltd. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
