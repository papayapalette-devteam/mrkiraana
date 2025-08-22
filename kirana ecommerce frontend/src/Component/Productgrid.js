import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./sidebar";
import api from './api'

function Productgrid() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered1, setIsHovered1] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("api/product/getproduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start"> Product</h4>

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
                • Product Grid
              </h6>
            </div>
          </div>

          {/* Search and Controls */}
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
            {/* Search Box */}
            <div
              className="search-box"
              style={{
                display: "flex",
                alignItems: "center",
                border: isFocused
                  ? "1px solid blue"
                  : "1px solid rgba(210, 206, 206, 0.3)",
                borderRadius: "4px",
                padding: "6px 10px",
                width: "250px",
                backgroundColor: "#fff",
                marginTop: "10px",
              }}
            >
              <i
                className="fas fa-search"
                style={{ marginRight: "8px", color: "#666" }}
              ></i>
              <input
                type="text"
                placeholder="Search by product name"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            {/* Right Side Controls */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginLeft: "auto",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "15px", marginTop: "20px" }}>Status:</p>

              <select
                style={{
                  padding: "6px 10px",
                  borderRadius: "4px",
                  border: "0px solid #ccc",
                }}
              >
                <option>Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              {/* KEEPING ORIGINAL BUTTON STYLE */}
              <button
                className="custom-button"
                onClick={() => navigate("/Addproduct")}
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              marginTop: "20px",
            
            }}
          >
            <thead>
              <tr>
                {["Product", "SKU", "QTY", "Price", "Status", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        opacity: 0.2,
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                        fontSize: "15px",
                      
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: "8px", fontSize: "13px" }}>
                    No matching products.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td style={{ padding: "10px", fontSize: "13px" }}>{product.title}</td>
                    <td style={{ padding: "10px", fontSize: "13px" }}>{product.sku}</td>
                    <td style={{ padding: "10px", fontSize: "13px" }}>{product.quantity}</td>
                    <td style={{ padding: "10px", fontSize: "13px" }}>₹{product.price}</td>
                    <td style={{ padding: "10px", fontSize: "13px" }}>
                      {product.quantity > 0 ? "Active" : "Inactive"}
                    </td>
                    <td style={{ padding: "10px", fontSize: "13px" }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate("/EditProduct", { state: { product } })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productgrid;
