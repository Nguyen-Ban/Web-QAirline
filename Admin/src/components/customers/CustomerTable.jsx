import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchCustomersAPI } from "../../services/API/Customers";

const CustomerTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
    },
    {
      title: "Seat Number",
      dataIndex: "seatNumber",
      key: "seatNumber",
    },
    {
      title: "Ticket Class",
      dataIndex: "ticketClass",
      key: "ticketClass",
    },
    {
      title: "Booking Time",
      dataIndex: "bookingTime",
      key: "bookingTime",
      render: (text) => new Date(text).toLocaleString(), // Định dạng thời gian
    },
  ];

  return (
    <DataTable
      columns={columns}
      apiData={fetchCustomersAPI} // API lấy danh sách khách hàng
      //   onDelete={deleteCustomerAPI} // API xóa khách hàng
      //   editUrl="/customers/edit" // URL chỉnh sửa thông tin khách hàng

      hideActions={true}
    />
  );
};

export default CustomerTable;
