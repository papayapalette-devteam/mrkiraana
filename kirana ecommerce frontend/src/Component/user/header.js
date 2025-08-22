import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../user/context/cartcontext";
import "../user/css/header.css";
import logo from "../user/MR.KIRANA LOGO.png";

import CartSidebar from "../user/cartsidebar";
import Swal from "sweetalert2";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cartItems } = useCart();
  const navigate = useNavigate();
  const user = localStorage.getItem("userEmail");

  // Reference to dropdown container for outside click detection
  const dropdownRef = useRef(null);

  // Close dropdown if click outside (handling both mouse and touch for mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You are logged out successfully",
      showConfirmButton: true,
    });
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu & dropdown on nav link click
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className="main-header">
        <div className="container header-flex">
          <div className="logo">
            <Link to="/" onClick={handleNavLinkClick}>
              <img src={logo} alt="Kirana" />
            </Link>
          </div>

          {/* Hamburger menu button */}
          <button
            className={`hamburger-btn ${isMobileMenuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Navigation */}
          <nav className={`main-nav ${isMobileMenuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/" onClick={handleNavLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={handleNavLinkClick}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleNavLinkClick}>
                  Categories
                </Link>
              </li>
              {/* <li>
                <Link to="/pages" onClick={handleNavLinkClick}>
                  Pages
                </Link>
              </li> */}
              {/* <li>
                <Link to="/contact" onClick={handleNavLinkClick}>
                  Contact us
                </Link>
              </li> */}

              {user && (
                <li
                  ref={dropdownRef}
                  className={`dropdown${dropdownOpen ? " open" : ""}`}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen((prev) => !prev);
                    }}
                    style={{ cursor: "pointer", userSelect: "none" }}
                  >
                    {user} ▾
                  </span>
                  <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <li>
                      <Link to="/updateuserprofile" onClick={handleNavLinkClick}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/myorders" onClick={handleNavLinkClick}>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleNavLinkClick();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>

          {/* Search bar */}
          <div className="header-search">
            <input type="text" placeholder="Search for products..." />
            <i className="fa fa-search"></i>
          </div>

          {/* Header icons */}
          <div className="header-icons">
            <Link to="/registration" className="icon-btn">
              <i className="fa-regular fa-user"></i>
            </Link>
            <button
              className="icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="badge">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebars */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
