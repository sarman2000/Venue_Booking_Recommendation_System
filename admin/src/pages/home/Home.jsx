import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import BookingList from "../../components/booking/booking_list";
import { AdminContext } from "../../context/adminAuthContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";

const Home = () => {
  const [venueData, setVenueData] = useState({});
  const { admin } = useContext(AdminContext);
  const param = admin?.admin_id;
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const formdata = new FormData();
  formdata.append("file", file);

  const handleUpload = async () => {
    try {
      const url = `/upload?param=${param}`;
      const response = await axios.post(url, formdata);
      setFile(null);
      toast.success("Uploaded Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      const url = `/remove?param=${param}`;
      const response = await axios.post(url);
      setFile(null);
      toast.success("Removed Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/get_venue?param=${param}`;
        const response = await axios.get(url);
        setVenueData(response.data || {}); 
      } catch (error) {
        console.log(error);
      }
    };

    if (param) {
      fetchData();
    }
  }, [param]);

  return (
    <div>
      <Navbar />
      {param && (
        <div className="table-container">
          <table className="venue-table">
            <thead>
              <tr>
                <th>Venue ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Add/Remove Image</th>
              </tr>
            </thead>
            <tbody>
              <tr className="venue-row">
                <td>{venueData.venue_id || ""}</td>
                <td>{venueData.name || ""}</td> 
                <td>{venueData.address || ""}</td> 
                <td className="upload-cell">
                  <div className="file-input-container">
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="file-input" />
                    <button onClick={handleUpload} className="upload-button">Add Image</button>
                    <button onClick={handleRemove} className="upload-button">Remove</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <BookingList />
    </div>
  );
};

export default Home;
