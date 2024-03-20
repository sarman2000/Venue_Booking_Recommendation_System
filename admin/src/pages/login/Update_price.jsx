import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Add_venue.css";
import { toast } from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import { AdminContext } from "../../context/adminAuthContext";
import { useContext } from "react";

const UpdatePrice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    price_per_person: ""
  });
  const { admin } = useContext(AdminContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin_id = admin.admin_id;
    const {price_per_person } = formData;
    try {
      const response = await axios.post("/update_price", {
        admin_id,
        price_per_person
      });
      setFormData({});
      toast.success("Price Updated Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
  };

  return (
    <div>
      <Navbar />
      <div className="addvenue-container">
        <h2>Update Price</h2>
        <form onSubmit={handleSubmit} className="addvenue-form">
          <label>
            Price Per Person:
            <input
              type="text"
              name="price_per_person"
              value={formData.price_per_person}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Update Price</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePrice
