import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./DataTable.css";

const DataTable = ({ columns, apiData, onDelete, editUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true); // Start loading
    try {
      const res = await apiData();
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRemove = async (id) => {
    const res = await onDelete(id);
    console.log(res);
    if (res) {
      console.log(res);
      loadData();
    }
  };

  // Add row number calculation
  const rowNumberColumn = {
    title: "No",
    render: (_, __, index) =>
      (pagination.current - 1) * pagination.pageSize + index + 1,
    width: 60,
  };

  // Extend columns to include action buttons and row number
  const extendedColumns = [
    rowNumberColumn,
    ...columns,
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <Link to={`${editUrl}/${record.id}`}>
              <Button icon={<FaRegEdit />} />
            </Link>
          </Tooltip>
          <Tooltip title="Remove">
            <Button
              icon={<MdDeleteOutline />}
              onClick={() => handleRemove(record.id)}
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={extendedColumns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: pagination.pageSize,
        current: pagination.current,
        onChange: (page) => setPagination({ ...pagination, current: page }),
      }}
      className="data-table"
    />
  );
};

export default DataTable;
