import React, { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center p-3"
      style={{ width: '1000px' }}
    >
      {/* Left-side search */}
      <div className="d-flex align-items-center" style={{ position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search here"
          style={{
            borderRadius: '20px',
            paddingLeft: '30px',
            width: '400px',
          }}
        />
        <FaSearch
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#888',
          }}
        />
      </div>

      {/* Right-side icons in a single row */}
      <div className="d-flex align-items-center" style={{ gap: '20px' }}>
        {/* Notification Icon */}
        {/* <FaBell style={{ fontSize: '24px', cursor: 'pointer' }} /> */}

        {/* User Icon and Dropdown */}
        <div className="dropdown" style={{ position: 'relative' }}>
          <FaUserCircle
            className="cursor-pointer"
            style={{ fontSize: '30px' }}
            onClick={handleUserIconClick}
          />
          {showDropdown && (
            <div
              className="dropdown-menu dropdown-menu-end show"
              style={{
                position: 'absolute',
                right: 0,
                top: '40px',
                display: 'block',
              }}
            >
              <div className="dropdown-item">User Name</div>
              <div className="dropdown-item">Mail ID</div>
              <div className="dropdown-item">Account Settings</div>
              <div className="dropdown-item">Dashboard</div>
              <div className="dropdown-item text-danger">Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
