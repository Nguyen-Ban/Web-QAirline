import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchMostRoutesAPI } from "../../../services/API/Dashboard";

const MostRoutes = () => {
  const [routeBookingData, setRouteBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchMostRoutesAPI();
      setRouteBookingData(data);
    } catch (err) {
      setError("Failed to fetch route data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Sort and get the top 10 most booked routes
  const topRoutes = routeBookingData
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 10);

  return (
    <div>
      <h2>Top Booked Routes</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topRoutes} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="route" width={150} />
          <Tooltip />
          <Bar dataKey="bookings" fill="#8884d8" name="Bookings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MostRoutes;
