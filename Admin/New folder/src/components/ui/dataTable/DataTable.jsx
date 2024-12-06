import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DataTable.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const DataTable = ({ columns, fetchData, onDelete, editUrl }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true); // Start loading
    const res = await fetchData();
    setData(res);
    setLoading(false); // End loading once data is fetched
  };

  const handleRemove = async (id) => {
    const res = await onDelete(id);
    if (res?.success) {
      loadData();
    }
  };

  if (loading) {
    return <div></div>; // You can replace with a skeleton loader
  }

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render
                    ? col.render(item[col.field], item, index)
                    : item[col.field]}
                </td>
              ))}
              <td className="action">
                <Link to={`${editUrl}/${item.id}`}>
                  <div className="icon-wrapper">
                    <FaRegEdit className="icon" />
                    <span className="tooltip">Edit</span>
                  </div>
                </Link>
                <div
                  className="icon-wrapper"
                  onClick={() => handleRemove(item.id)}
                >
                  <MdDeleteOutline className="icon" />
                  <span className="tooltip">Remove</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
