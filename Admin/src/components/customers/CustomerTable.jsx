import React from "react";
import DataTable from "../ui/dataTable/DataTable";
import { fetchCustomersAPI } from "../../services/API/Customers";

const CustomerTable = () => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Booking Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (status) => {
        if (status === "confirmed") {
          return "Confirmed"; // Hiển thị 'Confirm' thay cho 'confirmed'
        } else if (status === "cancelled") {
          return "Cancelled"; // Hiển thị 'Cancel' thay cho 'cancelled'
        }
        return status; // Trả về trạng thái gốc nếu không phải 'confirmed' hoặc 'cancelled'
      },
    },
    {
      title: "Booking Time",
      dataIndex: "bookingTime",
      key: "bookingTime",
      render: (text) => new Date(text).toLocaleString(), // Format the booking time
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
