// src/components/common/AlertBox.jsx
import React from 'react';

const AlertBox = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert-box ${type}`}>
      <span>{message}</span>
      <button className="btn" onClick={onClose}>OK</button>
    </div>
  );
};

export default AlertBox;