import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Property.css";

const RecentCard = () => {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState({});
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/properties");
        const propertiesWithUsers = res.data.properties.map((property) => {
          const user = res.data.users.find(
            (user) => user._id[0] === property.postedBy
          );
          const userName = user ? user.userName[0] : "";
          return { ...property, userName };
        });
        console.log(propertiesWithUsers);
        setProperties(propertiesWithUsers);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPropertyTypes = async () => {
      try {
        const res = await axios.get("/getPropertyType");
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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `/search?location=${location}&propertyType=${propertyType}&priceRange=${priceRange}`
      );
      const propertiesWithUsers = res.data.properties.map((property) => {
        const user = res.data.users.find(
          (user) => user._id[0] === property.postedBy
        );
        const userName = user ? user.userName[0] : "";
        return { ...property, userName };
      });
      setProperties(propertiesWithUsers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "100px", marginBottom: "10px" }}
      >
        <h1>Search</h1>
        <form className="flex">
          <div className="box">
            <span>City/Street</span>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="box">
            <span>Property Type</span>
            <input
              type="text"
              placeholder="Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
          </div>
          <div className="box">
            <span>Price Range</span>
            <input
              type="text"
              placeholder="Price Range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
          <div className="box">
            <h4>Advance Filter</h4>
          </div>
          <button className="btn1" style={{ backgroundColor: "#193441" }}>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div
        className="content grid3 mtop"
        style={{ marginTop: "100px", marginBottom: "50px" }}
      >
        {properties.map((property, index) => {
          const { images, propertyName, propertyType, rentalPrice } = property;
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
                        propertyType === "For Sale" ? "#25b5791a" : "#ff98001a",
                      color:
                        propertyType === "For Sale" ? "#25b579" : "#ff9800",
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
                <span>{property.userName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
