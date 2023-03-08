import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Property.css";

const RecentCard = () => {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/properties");
        setProperties(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPropertyTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getPropertyType");
        const propertyTypesMap = res.data.reduce(
          (acc, cur) => ({ ...acc, [cur._id]: cur.name }),
          {}
        );
        setPropertyTypes(propertyTypesMap);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperties();
    fetchPropertyTypes();
  }, []);

  const getPropertyTypeName = (typeId) => {
    return propertyTypes[typeId] || typeId;
  };

  return (
    <>
      <div
        className="content grid3 mtop"
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        {properties.map((property, index) => {
          const {
            images,
            propertyName,
            propertyType,
            rentalPrice,
          } = property;
          const cover = images[0].url;

          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background:
                        propertyType === "For Sale"
                          ? "#25b5791a"
                          : "#ff98001a",
                      color:
                        propertyType === "For Sale"
                          ? "#25b579"
                          : "#ff9800",
                    }}
                  >
                    {getPropertyTypeName(propertyType)}
                  </span>

                  <i className="fa fa-heart">
                    &nbsp;&nbsp;&nbsp;
                    <i className="fa-solid fa-share-from-square"></i>
                  </i>
                </div>
                <h4>{propertyName}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {property.address}
                </p>
              </div>

              <div className="button flex">
                <div>
                  <button
                    className="btn2"
                    style={{ backgroundColor: "#193441" }}
                  >
                    {rentalPrice}
                  </button>{" "}
                  <label htmlFor=""></label>
                </div>
                <span>{propertyType}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
