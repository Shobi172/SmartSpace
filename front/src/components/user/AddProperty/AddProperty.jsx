import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AddProperty() {
  const user = localStorage.getItem("profile");
  const [propertyName, setPropertyName] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [configuration, setConfiguration] = useState([]);
  const [rentalPrice, setRentalPrice] = useState("");
  const [images, setImages] = useState([]);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableFor, setAvailableFor] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getPropertyType");
        setPropertyTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPropertyTypes();
  }, []);

  const handleImageChange = (e) => {
    const newImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newImages.push(e.target.files[i]);
    }
    setImages(newImages);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    const data = {
      propertyName,
      propertyType,
      address,
      street,
      state,
      pincode,
      configuration,
      rentalPrice,
      availableFrom,
      availableFor,
      area,
      description,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    [...images].forEach(image => {
      formData.append("image", image);
  });
    formData.append("user", user);
    axios
      .post("http://localhost:5000/addproperty", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Property added successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Error adding property");
      });
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="propertyName">Property Name:</label>
          <input
            type="text"
            className="form-control"
            id="propertyName"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="propertyType">Property Type</label>
          <select id="propertyType" name="propertyType" onChange={(e)=> setPropertyType(e.target.value)} required>
            <option value="">Select a Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            className="form-control"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            className="form-control"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="number"
            className="form-control"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="configuration">Configuration:</label>
          <input
            type="text"
            className="form-control"
            id="configuration"
            value={configuration}
            onChange={(e) => setConfiguration(e.target.value.split(","))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentalPrice">Rental Price:</label>
          <input
            type="number"
            className="form-control"
            id="rentalPrice"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableFrom">Available From:</label>
          <input
            type="date"
            className="form-control"
            id="availableFrom"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableFor">Available For:</label>
          <input
            type="number"
            className="form-control"
            id="availableFor"
            value={availableFor}
            onChange={(e) => setAvailableFor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            type="number"
            className="form-control"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddProperty;
