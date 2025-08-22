import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";






import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BootstrapToast from "bootstrap/js/dist/toast";

import Sidebar from "./sidebar";
import Header from "./Header";

import Uploadimage from "../Uploadimage.png";

function Coupons() {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const toastRef = useRef(null);


  // Form state
  const [couponName, setCouponName] = useState("");
  const [productType, setProductType] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [endTime, setEndTime] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [minimumAmount, setMinimumAmount] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [coupons, setCoupons] = useState([]);
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [successMessage, setSuccessMessage] = useState("");

  const hiddenFileInputRef = useRef(null);

  const handleUploadClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const fileUploaded = Array.from(event.target.files);
    setImageFile(fileUploaded[0]);
  };

  const showToast = () => {
    if (toastRef.current) {
      const toastEl = toastRef.current;
      toastEl.classList.remove("slide-in", "slide-out");

      setTimeout(() => {
        toastEl.classList.add("slide-in");
        const toast = BootstrapToast.getOrCreateInstance(toastEl, {
          autohide: false,
        });
        toast.show();
      }, 10);
    }
  };

  const handleAddCoupon = async () => {
    try {
      const formData = new FormData();
      formData.append("name", couponName);
      formData.append("productType", productType);
      formData.append("code", couponCode);
      formData.append("endTime", endTime);
      formData.append("discountPercentage", discountPercentage);
      formData.append("minimumAmount", minimumAmount);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("http://localhost:5000/api/coupon/addcoupon", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Coupon added:", data);
        alert("Coupon added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error adding coupon:", errorData);
        alert("Failed to add coupon.");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred.");
    }
  };

const handleDeleteCoupon = async (couponId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/api/coupon/${couponId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponId));
      setSuccessMessage("Coupon deleted successfully.");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      const errorData = await response.json();
      console.error("Failed to delete coupon:", errorData);
      alert("Failed to delete coupon.");
    }
  } catch (error) {
    console.error("Error deleting coupon:", error);
    alert("An error occurred while deleting the coupon.");
  }
};



  useEffect(() => {
  const fetchCoupons = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/coupon/getcoupons"); // Replace with your actual endpoint
      if (response.ok) {
        const data = await response.json();
        setCoupons(data); // Assuming your backend returns an array of coupons
      } else {
        console.error("Failed to fetch coupons");
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  fetchCoupons();
}, []);


  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start">Coupon</h4>

              <a
                onClick={() => navigate("/Dashboard")}
                style={{ cursor: "pointer", textDecoration: "none" }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <h6
                  style={{
                    display: "inline",
                    color: isHovered1 ? "blue" : "black",
                    margin: 0,
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  Home
                </h6>
              </a>

              <h6
                style={{
                  display: "inline",
                  marginLeft: "10px",
                  opacity: 0.6,
                  fontSize: "13px",
                }}
              >
                • Coupon List
              </h6>
            </div>
          </div>

          <div
            className="container"
            style={{
              width: "100%",
              backgroundColor: "#f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div
                className="container"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <div
                  className="search-box"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: isFocused ? "1px solid blue" : "1px solid rgba(210, 206, 206, 0.3)",
                    borderRadius: "4px",
                    padding: "6px 10px",
                    width: "250px",
                    backgroundColor: "#fff",
                    marginTop: "20px",
                  }}
                >
                  <i className="fas fa-search" style={{ marginRight: "8px", color: "#666" }}></i>
                  <input
                    type="text"
                    placeholder="Search by Invoice no"
                    style={{ border: "none", outline: "none", width: "100%" }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
                  <button type="button" className="btn btn-primary" onClick={showToast}>
                    Add Coupon
                  </button>

                  <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div
                      ref={toastRef}
                      className="toast fade"
                      role="alert"
                      aria-live="assertive"
                      aria-atomic="true"
                    >
                      <div className="toast-header">
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={(e) => {
                            e.preventDefault();
                            const toastEl = toastRef.current;
                            toastEl.classList.remove("slide-in");
                            toastEl.classList.add("slide-out");
                            setTimeout(() => {
                              const toast = BootstrapToast.getOrCreateInstance(toastEl);
                              toast.hide();
                            }, 500);
                          }}
                        ></button>
                        <strong style={{ marginLeft: "8px" }}>Enter coupons Details</strong>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          backgroundColor: "white",
                          padding: "15px",
                          borderRadius: "5px",
                          maxHeight: "580px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          paddingBottom: "70px",
                        }}
                      >
                        <h6 style={{ marginTop: "10px" }}>Upload Image</h6>
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src={Uploadimage}
                            alt="upload-img"
                            style={{
                              width: "30%",
                              height: "auto",
                              objectFit: "cover",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                          <small style={{ display: "block", textAlign: "center" }}>
                            (Only png, jpg, jpeg, webp will be accepted)
                          </small>
                        </div>

                        <button
                          style={{
                            marginBottom: "15px",
                            width: "100%",
                            height: "40px",
                            border: "0.5px solid rgba(97, 94, 94, 0.09)",
                            backgroundColor: "transparent",
                            color: "gray",
                            cursor: "pointer",
                            borderRadius: "4px",
                          }}
                          onClick={handleUploadClick}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "blue";
                            e.currentTarget.style.color = "white";
                            e.currentTarget.style.borderColor = "blue";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "black";
                            e.currentTarget.style.borderColor = "rgba(97, 94, 94, 0.09)";
                          }}
                        >
                          <p style={{ opacity: 0.6, margin: 0 }}>Upload Image</p>
                        </button>

                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg, image/webp"
                          ref={hiddenFileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />

                        <div style={{ marginBottom: "10px" }}>
                          <label>Name</label>
                          <input
                            type="text"
                            placeholder="name"
                            className="input-light-border"
                            value={couponName}
                            onChange={(e) => setCouponName(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                          <label>Product Type</label>
                          <select
                            className="input-light-border"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                          >
                            <option value="" disabled>Select</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            <option value="furniture">Furniture</option>
                          </select>
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                          <label>Code</label>
                          <input
                            type="text"
                            placeholder="Code"
                            className="input-light-border"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                          <label>End Time</label>
                          <input
                            type="date"
                            className="input-light-border"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                          <label>Discount Percentage</label>
                          <input
                            type="text"
                            placeholder="discount percentage"
                            className="input-light-border"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                          />
                        </div>

                        <div style={{ marginBottom: "5px" }}>
                          <label>Minimum Amount</label>
                          <input
                            type="text"
                            placeholder="minimum amount"
                            className="input-light-border"
                            value={minimumAmount}
                            onChange={(e) => setMinimumAmount(e.target.value)}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "20px",
                            position: "fixed",
                            bottom: "0px",
                            zIndex: 1000,
                            backgroundColor: "white",
                            padding: "0px 0",
                            boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.05)",
                            height: "50px",
                          }}
                        >
                          <button className="btn-blue" onClick={handleAddCoupon}>
                            Add Coupon
                          </button>

                          <button
                            className="cancel-button"
                            style={{
                              backgroundColor: "white",
                              border: "1px solid rgba(128, 128, 128, 0.2)",
                              color: "black",
                              width: "150px",
                              height: "40px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Table Placeholder */}
              <div style={{ backgroundColor: "#fff", padding: "10px" }}>
                <table style={{ width: "100%", fontSize: "12px" }}>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CODE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>START</th>
                      <th>END</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                 <tbody>
  {coupons.length > 0 ? (
    coupons.map((coupon, index) => (
      <tr key={index}>
        <td>{coupon.name}</td>
        <td>{coupon.code}</td>
        <td>{coupon.discountPercentage}%</td>
        <td>{coupon.status || "Active"}</td>
        <td>{coupon.startTime ? new Date(coupon.startTime).toLocaleDateString() : "N/A"}</td>
        <td>{new Date(coupon.endTime).toLocaleDateString()}</td>
        <td>
          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCoupon(coupon._id)}>
  Delete
</button>

        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No coupons available</td>
    </tr>
  )}
</tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {showSuccessMessage && (
      <div className="success-overlay">
        <div className="success-message">
          {successMessage}
        </div>
      </div>
    )}
    </div>
  );
}

export default Coupons;
