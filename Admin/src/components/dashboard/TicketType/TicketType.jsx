import React, { useState, useEffect } from "react";
import AreaCard from "./AreaCard";
import { DollarOutlined } from "@ant-design/icons";
import "./TicketType.css";
import { fetchTicketTypeAPI } from "../../../services/API/Dashboard";

const TicketType = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const res = await fetchTicketTypeAPI();
      setData(res);
    } catch (error) {
      console.error("Error fetching ticket type data:", error);
      setData(null);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    loadData(); // Fetch data on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Placeholder while loading
  }

  if (!data) {
    return <div>Error loading data</div>; // Placeholder for errors or empty data
  }

  return (
    <section className="content-area-cards">
      <AreaCard
        icon={<DollarOutlined style={{ fontSize: 24, color: "#475be8" }} />}
        title="Total Bookings"
        value={`${data.total} Tickets`}
      />
      <AreaCard
        icon={<DollarOutlined style={{ fontSize: 24, color: "#4ce13f" }} />}
        title="One-Way"
        value={`${data.oneWay} Bookings`}
      />
      <AreaCard
        icon={<DollarOutlined style={{ fontSize: 24, color: "#4ce13f" }} />}
        title="Round-Trip"
        value={`${data.roundTrip} Bookings`}
      />
    </section>
  );
};

export default TicketType;
