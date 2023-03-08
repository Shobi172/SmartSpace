import React from "react";
import Navbar from "../../components/admin/navbar/Navbar";
import SideBar from "../../components/admin/sidebar/Sidebar";
import Users from "../../components/admin/users/Users";

const users = () => {
  return (
    <div>
      <SideBar />
      <Navbar />
      <Users />
    </div>
  );
};

export default users;
