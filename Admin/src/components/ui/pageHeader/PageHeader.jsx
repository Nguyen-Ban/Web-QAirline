import React from "react";
import { Link } from "react-router-dom";
import "./PageHeader.css";

const PageHeader = ({ title, buttonText, buttonLink }) => {
  return (
    <div className="page-header">
      <div className="page-header-title">{title}</div>
      <Link to={buttonLink}>
        <div className="page-header-btn">{buttonText}</div>
      </Link>
    </div>
  );
};

export default PageHeader;
