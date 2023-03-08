import React, { useEffect } from "react";
import "./Users.css";
import axios from "axios";
import { useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/admin/users");
    console.log(response);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const toggleBlockStatus = async (userId, blocked) => {
    const response = await axios.put(
      `http://localhost:5000/admin/users/${userId}`,
      { blocked: !blocked }
    );
    console.log(response);
    if (response.status === 200) {
      getUsers();
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {item.blocked ? (
                    <button
                      className="btn btn-unblock"
                      onClick={() => toggleBlockStatus(item._id, item.blocked)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn btn-block"
                      onClick={() => toggleBlockStatus(item._id, item.blocked)}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
