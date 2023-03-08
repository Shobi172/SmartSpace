import React from "react";
import "./Sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function SideBar() {
  const [isActive, setIsActive] = useState(true);
//   const [value, setValue] = useState("");
  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

//   const handleActive = () => {
//     setIsActive(true);
//   };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsActive(false);
    }
  }, []);
  return (
    <>
      <div className={isActive ? "sidebar active" : "sidebar"}>
        <div className="logo_content">
          <div className="logo">
            <div className="logo_name">Smart Space.</div>
          </div>
          <i
            className="bx bx-menu cursor-pointer"
            id="btn"
            onClick={handleButtonClick}
          ></i>
        </div>
        <div className="nav_list">
          <li>
            <Link to="/admin/dashboard">
              <i class="bx bx-grid-alt bx-tada bx-flip-horizontal"></i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link to="/admin/propertyType">
              <i class="bx bx-store bx-tada"></i>
              <span className="links_name">Property Type</span>
            </Link>
            <span className="tooltip">Property Type</span>
          </li>
          <li>
            <a href="/admin/Properties">
              <i class="bx bx-building-house bx-tada bx-flip-horizontal"></i>
              <span className="links_name">Properties</span>
            </a>
            <span className="tooltip">Properties</span>
          </li>
          <li>
            <a href="/admin/sales">
              <i class="bx bx-pie-chart-alt-2 bx-tada bx-flip-horizontal"></i>
              <span className="links_name">Sales</span>
            </a>
            <span className="tooltip">Sales</span>
          </li>

          <li>
            <a href="/admin/users">
              <i class="bx bx-user bx-tada bx-flip-horizontal"></i>
              <span className="links_name">Users</span>
            </a>
            <span className="tooltip">Users</span>
          </li>
        </div>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_details">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                alt=""
                className="adminlogo"
              />
              <div className="name_job">
                <div className="name">Admin</div>
                <div className="job">Log out</div>
              </div>
            </div>
            <a
              href="/admin"
              // style="color: white;"
            >
              <i className="bx bx-log-out" id="log_out"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
