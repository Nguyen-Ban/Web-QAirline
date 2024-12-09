import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./notification.css";

const Notification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <p>{message}</p>
      <button className="notification-close" onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Notification;
