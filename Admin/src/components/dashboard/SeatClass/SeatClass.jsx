import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./SeatClass.css"; // Đảm bảo bạn liên kết file CSS
import { useState } from "react";
import { fetchSeatClassAPI } from "../../../services/API/Dashboard";

const SeatClass = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchSeatClassAPI();
      setData(res);
    } catch (error) {
      console.error("Error fetching seat class data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error loading data. Please try again later.</div>;
  }

  const ticketData = [
    { type: "First Class", count: data.first },
    { type: "Business", count: data.business },
    { type: "Economy", count: data.economy },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const totalTickets = ticketData.reduce(
    (sum, ticket) => sum + ticket.count,
    0
  );

  return (
    <div className="seatclass-container">
      {/* Pie Chart */}
      <div className="chart-container">
        <h3 style={{ textAlign: "center" }}>Seat Class Distribution</h3>
        <ResponsiveContainer height={400}>
          <PieChart>
            <Pie
              data={ticketData}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={(entry) =>
                `${entry.type}: ${((entry.count / totalTickets) * 100).toFixed(
                  1
                )}%`
              }
            >
              {ticketData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="table-container">
        <h3 style={{ textAlign: "center" }}>Detailed Ticket Count</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Ticket Type
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Count
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {ticket.type}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {ticket.count}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {((ticket.count / totalTickets) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatClass;
