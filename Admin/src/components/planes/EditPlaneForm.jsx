import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get the id from the URL
import { fetchPlaneByIdAPI, updatePlaneAPI } from "../../services/API/Planes"; // Plane APIs
import PlaneForm from "./PlaneForm"; // Reuse PlaneForm for editing
import { notification } from "antd";

const EditPlaneForm = () => {
  const [planeData, setPlaneData] = useState(null); // State to store fetched plane data
  const { id } = useParams(); // Get the plane ID from URL parameters
  const navigate = useNavigate(); // To navigate back after successful update

  // Fetch the plane data by id
  useEffect(() => {
    fetchPlane();
  }, []);

  const fetchPlane = async () => {
    try {
      const res = await fetchPlaneByIdAPI(id); // API call to fetch the plane by id
      if (res) {
        console.log(res);
        setPlaneData(res); // Set the plane data to state
      } else {
        console.error("Plane not found.");
      }
    } catch (error) {
      console.error("Error fetching plane data:", error);
    }
  };

  // Handle form submission for updating the plane
  const onFinish = async (values) => {
    try {
      values.id = id; // Add id to the values object
      const res = await updatePlaneAPI(values); // Call API to update the plane

      Notification("success", "Plane Updated Successfully!");

      navigate("/planes"); // Redirect to planes list or plane details page
    } catch (error) {
      console.error("Error updating plane:", error);
      Notification("error", "Failed to Update Plane");
    }
  };

  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  if (!planeData) {
    return <div>Loading...</div>; // Show loading indicator until plane data is fetched
  }

  return (
    <PlaneForm
      onFinish={onFinish} // Pass the form submission handler
      initialValues={planeData} // Set the fetched plane data as initial values for editing
      submitText="Update Plane" // Change the button text for updating plane
    />
  );
};

export default EditPlaneForm;
