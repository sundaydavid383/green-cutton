// AuthStatus.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './authstatus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTie,
  faShoppingCart,
  faScissors,
  faRulerCombined,
  faHeart,
  faTruck,
  faEnvelope,
  faGear,
  faBell,
  faLock
} from '@fortawesome/free-solid-svg-icons';

const AuthStatus = ({onUserIconClick}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 return (
  <div className="auth-status">
<i onClick={onUserIconClick} className="fa-solid fa-times close-icon"></i>
    <div className="greeting">
      <h3>Hello, {user.name?.split(' ')[0] || 'Friend'} <FontAwesomeIcon icon={faUserTie} /></h3>
      <p>Welcome back to <strong>GreenCutton</strong> — your home of premium custom wear.</p>
    </div>

    <div className="user-info">
      <div className="avatar">
        {user.avatar ? (
          <img src={user.avatar} alt="User Avatar" />
        ) : (
          <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
        )}
      </div>

      <div className="details">
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not added'}</p>
        <p><strong>Role:</strong> {user.role || 'Customer'}</p>
      </div>
    </div>

    <div className="quick-links">
      <h5>Quick Access</h5>
      <ul>
        <li onClick={() => navigate('/profile')}>
          <FontAwesomeIcon icon={faUserTie} /> My Profile
        </li>
        <li onClick={() => navigate('/orders')}>
          <FontAwesomeIcon icon={faShoppingCart} /> My Orders
        </li>
        <li onClick={() => navigate('/customizer')}>
          <FontAwesomeIcon icon={faScissors} /> Customize Suit
        </li>
        <li onClick={() => navigate('/measurements')}>
          <FontAwesomeIcon icon={faRulerCombined} /> Saved Measurements
        </li>
        <li onClick={() => navigate('/favorites')}>
          <FontAwesomeIcon icon={faHeart} /> Wishlist
        </li>
        <li onClick={() => navigate('/support')}>
          <FontAwesomeIcon icon={faEnvelope} /> Support Inbox
        </li>
        <li onClick={() => navigate('/settings')}>
          <FontAwesomeIcon icon={faGear} /> Account Settings
        </li>
        <li onClick={() => navigate('/notifications')}>
          <FontAwesomeIcon icon={faBell} /> Notifications
        </li>
        <li onClick={() => navigate('/security')}>
          <FontAwesomeIcon icon={faLock} /> Login & Security
        </li>
      </ul>
    </div>

    <div className="auth-actions">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div className="footer-note">
      <p><em>Powered by GreenCutton. Excellence in every thread</em></p>
    </div>
  </div>
);
};

export default AuthStatus;
