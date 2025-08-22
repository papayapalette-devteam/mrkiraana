import React from "react";
import "../user/css/aboutus.css"
import Footer from "./footer";
import Header from "./header";

const AboutUs = () => {
  return (
    <>
  <Header/>
    <div className="about-container">
      {/* About Us Section */}
      <section className="about-section">
        <h1 className="about-title">
          Welcome to MR.KIRAANA – Your Trusted Indian Grocery Store
        </h1>
        <p className="about-text">
          At MR.KIRAANA, we bring the rich flavors and traditions of Indian dry groceries right to your doorstep.
          Founded with a passion for quality and authenticity, our mission is to provide premium, authentic Indian grocery products that cater to the tastes of every household.
        </p>
        <p className="about-text">
          We specialize in a wide range of dry groceries including rice, pulses, spices, oils, teas, and traditional snacks—curated from trusted local producers and renowned brands.
          Our commitment to quality, timely delivery, and excellent customer service makes us your go-to online kirana store.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="why-section">
        <h2 className="section-title">Why Choose MR.KIRAANA?</h2>
        <ul className="why-list">
          <li>Authentic products sourced from trusted suppliers</li>
          <li>Competitive pricing with special bulk order offers</li>
          <li>Convenient online shopping experience with secure payments</li>
          <li>Fast and reliable delivery within Ghaziabad and nearby areas</li>
          <li>Dedicated customer support to assist you at every step</li>
        </ul>
      </section>

      {/* Store Locations */}
      <section className="store-section">
        <h2 className="section-title">Visit Our Stores</h2>
        <p className="about-text">
          While MR.KIRAANA primarily caters online, we also have physical stores to serve you directly.
        </p>
        <div className="store-card">
          <h3 className="store-title">
            MR.KIRAANA Ghaziabad Store (Harish Kumar Ved Prakash)
          </h3>
          <p className="store-address">
            160, Prem Nagar,<br />
            Ghaziabad, Uttar Pradesh, 201001
          </p>
          <p className="store-timings">
            <strong>Store Timings:</strong> Monday to Sunday – 9:00 AM to 9:00 PM
          </p>
          <p className="store-contact">
            For location assistance or queries, call us at{" "}
            <a href="tel:+919891103211">+91 98911 03211</a> or email{" "}
            <a href="mailto:iamnishantraheja@gmail.com">iamnishantraheja@gmail.com</a>.
          </p>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
