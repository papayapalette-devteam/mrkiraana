import React, { useState } from "react";
import logo1 from "../MR.KIRANA LOGO.png";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navigate = useNavigate();

  const linkStyle = {
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Poppins, Fallba, sans-serif",
    fontWeight: 500,
    color: "#010F1C",
    
  };

  return (
 
      <div
        className="sidebar d-flex flex-column p-3"
        style={{ width: "270px", backgroundColor: "black" }}
      >
        <img
          src={logo1}
          alt="eBazar Logo"
          className="mb-4"
          style={{ maxWidth: "150px" }}
        />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" style={{ marginTop: "0px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/dashboard")}
              style={linkStyle}
            >
              <i className="fas fa-tachometer-alt me-2"></i> Dashboard
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              href="#"
              className="nav-link text-start d-flex align-items-center justify-content-between"
              style={linkStyle}
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <span>
                <i className="fas fa-boxes me-2"></i> Products
              </span>
              <i className="fas fa-angle-right"></i>
            </a>
            {productsOpen && (
              <div className="ps-4">
                <a
                  className="nav-link text-start"
                  onClick={() => navigate("/Productlist")}
                  style={linkStyle}
                >
                 <span className="sidebar-subitem">&#8226; Product List</span>

                </a>
                <a
                  className="nav-link text-start"
                  onClick={() => navigate("/Productgrid")}
                  style={linkStyle}
                >
                  <span className="sidebar-subitem">&#8226; Product Grid</span>
 
                </a>
                <a
                  className="nav-link text-start"
                  onClick={() => navigate("/Addproduct")}
                  style={linkStyle}
                >
                   <span className="sidebar-subitem">&#8226; Add Product</span>

                </a>
              </div>
            )}
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/Category")}
              style={linkStyle}
            >
              <i className="fas fa-th-large me-2"></i> Category
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/Order")}
              style={linkStyle}
            >
              <i className="fas fa-shopping-cart me-2"></i> Order
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/Brand")}
              style={linkStyle}
            >
              <i className="fas fa-tags me-2"></i> Brand
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/Coupons")}
              style={linkStyle}
            >
              <i className="fas fa-gift me-2"></i> Coupons
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              className="nav-link text-start d-flex align-items-center"
              onClick={() => navigate("/Profile")}
              style={linkStyle}
            >
              <i className="fas fa-user-circle me-2"></i> Profile
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              href="https://mrkiraana.com/"
              className="nav-link text-start d-flex align-items-center"
              style={linkStyle}
            >
              <i className="fas fa-store me-2"></i> Online Store
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            <a
              
              className="nav-link text-start d-flex align-items-center"
               onClick={() => navigate("/allcustomers")}
              style={linkStyle}
            >
              
              <i className="fas fa-users me-2"></i> Our Customers
            </a>
          </li>

          <li style={{ marginTop: "13px" }}>
            {/* <a
              href="#"
              className="nav-link text-start d-flex align-items-center justify-content-between"
              style={linkStyle}
              onClick={() => setPagesOpen(!pagesOpen)}
            >
              <span>
                <i className="fas fa-file-alt me-2"></i> Pages
              </span>
              <i className="fas fa-angle-right"></i>
            </a> */}
            {pagesOpen && (
              <div className="ps-4">
                <a  className="nav-link text-start"  onClick={() => navigate("/RegisterForm")} style={linkStyle}>
                   <span className="sidebar-subitem">&#8226;  Register</span>
                </a>
                <a href="#" className="nav-link text-start"  onClick={() => navigate("/LoginForm")}style={linkStyle}>
                  <span className="sidebar-subitem">&#8226;  Login</span>
                </a>
                <a href="#" className="nav-link text-start" onClick={() => navigate("/ResetPassword")} style={linkStyle}>
                   <span className="sidebar-subitem">&#8226;  Forget Password</span>
                </a>
              </div>
            )}
          </li>
        </ul>

        {/* Logout */}
       <div
  className="logout-btn"
  style={{
    borderRadius: "5px",
    paddingLeft: "5px",
    marginLeft: "30px",
    marginTop: "10px", // This now works as expected
  }}
>
  <a
    href="#"
    className="text-white text-start d-flex align-items-center" onClick={() => navigate("/LoginForm")}
    style={{
      textDecoration: "none",
    }}
  >
    <i className="fas fa-sign-out-alt me-2"></i> Logout
  </a>
</div>


      </div>

  );
}

export default Sidebar;
