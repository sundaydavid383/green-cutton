import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css'; // optional: for custom styling

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-home">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;