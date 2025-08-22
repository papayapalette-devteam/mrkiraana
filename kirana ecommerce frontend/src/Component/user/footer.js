// Footer.jsx
import React from "react";
import '../user/css/footer.css'
import logo from '../user/MR.KIRANA LOGO.png'
import payment from '../user/images/footer-payment.png'
import { useNavigate } from "react-router-dom";
const Footer = () => {

  const navigate=useNavigate()
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section brand">
          <div className="logo">
            {/* Replace with your svg or img logo */}
            <img src={logo}></img>
            {/* <span className="logo-text">Papaya Palette</span> */}
          </div>
          <p className="desc">
            The home and elements needed to create beautiful products.
          </p>
          <div className="social">
            <a href="#"><i className="fab fa-facebook-f" aria-label="Facebook"></i></a>
            <a href="#"><i className="fab fa-twitter" aria-label="Twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in" aria-label="LinkedIn"></i></a>
            <a href="#"><i className="fab fa-youtube" aria-label="YouTube"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li onClick={()=>navigate('/aboutus')}>About us</li>
            <li>Store Locations</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Rice and Flours")}`)}>Rice & Grains</li>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Pulses/Dals")}`)}>Pulses & Dals</li>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Spices and Masalas")}`)}>Spices & Masalas</li>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Edible Oils and Ghee")}`)}>Oils & Ghee</li>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Beverages")}`)}>Beverages</li>
            <li  onClick={() => navigate(`/allproducts/${encodeURIComponent("Snacks and Namkeen")}`)}>Snacks and Namkeen</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Track Order</li>
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Returns & Refunds</li>
          </ul>
        </div>
        <div className="footer-section talk">
          {/* <h3>Talk To Us</h3> */}
          <p>HARISH KUMAR<br></br> VED PRAKASH <br></br>
            GSTIN/UIN : 09ADIPP2746H1Z9 <br></br>
            160, PREM NAGAR, GHAZIABAD, Ghaziabad, 
            Uttar Pradesh, 201001
            </p>
          <div className="footer-contact">
            <div className="phone">+919891103211</div>
            <div className="email">Iamnishantraheja@gmail.com</div>
          </div>
         
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Copyright © 2025 by <span className="footer-link">Kirana</span> All rights reserved.
        </span>
        <div className="payments">
          <img src={payment} alt="payment" />
        </div>
        <button className="backtotop" aria-label="Back to top">↑</button>
      </div>
    </footer>
  );
};

export default Footer;
