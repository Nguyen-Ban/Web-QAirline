import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams to get the id from the URL
import {
  fetchFlightByIdAPI,
  updateFlightAPI,
} from "../../services/API/Flights"; // Flight APIs
import FlightForm from "./FlightForm"; // Reuse FlightForm for editing
import { notification } from "antd";

const EditFlightForm = () => {
  const [flightData, setFlightData] = useState(null); // State to store fetched flight data
  const { id } = useParams(); // Get the flight ID from URL parameters
  const navigate = useNavigate(); // To navigate back after successful update

  // Fetch the flight data by id when component mounts
  useEffect(() => {
    fetchFlight();
  }, []);

  // Function to fetch flight data by id
  const fetchFlight = async () => {
    try {
      const res = await fetchFlightByIdAPI(id); // API call to fetch the flight by id
      if (res) {
        console.log(res);
        setFlightData(res); // Set the flight data to state
      } else {
        console.error("Flight not found.");
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
    }
  };

  // Handle form submission for updating the flight
  const onFinish = async (values) => {
    try {
      values.id = id; // Add id to the values object
      const res = await updateFlightAPI(values); // API call to update the flight

      Notification(
        "success",
        "Flight Updated Successfully!",
        "The flight has been updated."
      );

      navigate("/flights"); // Redirect to the flights list or flight details page
    } catch (error) {
      console.error("Error updating flight:", error);
      Notification(
        "error",
        "Failed to Update Flight",
        "An error occurred while updating the flight."
      );
    }
  };

  // Custom notification function to handle success/error messages
  const Notification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  // Show loading until flight data is fetched
  if (!flightData) {
    return <div>Loading...</div>;
  }

  return (
    <FlightForm
      onFinish={onFinish} // Pass the form submission handler
      initialValues={flightData} // Set the fetched flight data as initial values for editing
      submitText="Update Flight" // Change the button text for updating flight
    />
  );
};

export default EditFlightForm;
