import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo1 from "../logo3.png";
import Header from "./Header";
import Icon1 from "../Icon1 (1).png";
import Graphimage from "../Graphimage.png";
import User from "../User.png";
import Cube from "../Cube.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Uploadimage from "../Uploadimage.png";
import api from './api'

function Brand() {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [brands, setBrands] = useState([]);

  // useEffect(() => {
  //   const url = "http://localhost:5000/api/brand/getbrands";

  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setBrands(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch brands:", error);
  //     });
  // }, []);

    useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("api/brand/getbrands");
        setBrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    location: "",
    description: "",
    status: "",
    image: [],
  });

  const showModalWithMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const handleEditClick = (brand) => {
    setEditingBrandId(brand._id);
    setFormData({
      name: brand.name || "",
      email: brand.email || "",
      website: brand.website || "",
      location: brand.location || "",
      description: brand.description || "",
      status: brand.status || "",
      image:brand.image|| []
    });
    setSelectedImage(brand.image || null);
  };

 const handleUpdateBrand = async () => {
  if (!formData.name.trim()) {
    alert("Please enter a name");
    return;
  }

  if (!formData.status) {
    alert("Please select a status");
    return;
  }

  try {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("website", formData.website);
    form.append("location", formData.location);
    form.append("description", formData.description);
    form.append("status", formData.status);
    form.append("image", formData.image);

    const response = await api.put(`api/brand/${editingBrandId}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const updatedBrand = response.data;

    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand._id === updatedBrand._id ? updatedBrand : brand
      )
    );
    setEditingBrandId(null);
    setFormData({
      name: "",
      email: "",
      website: "",
      location: "",
      description: "",
      status: "",
    });
    setSelectedImage(null);
    fileInputRef.current.value = null;
    showModalWithMessage("Brand updated successfully!");
  } catch (error) {
    console.error("Error updating brand:", error);
    alert("Failed to update brand. Please try again.");
  }
};


  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    if (file) {
    setSelectedImage(file[0]);
    setFormData({...formData,image:file[0]})

  }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleAddBrand = async () => {
  if (!formData.name.trim()) {
    alert("Please enter a name");
    return;
  }

  if (!formData.status) {
    alert("Please select a status");
    return;
  }

  try {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("website", formData.website);
    form.append("location", formData.location);
    form.append("description", formData.description);
    form.append("status", formData.status);
    form.append("image", formData.image);

    const response = await api.post("api/brand/addbrand", form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const data = response.data;

    setBrands((prevBrands) => [...prevBrands, data]);
    setFormData({
      name: "",
      email: "",
      website: "",
      location: "",
      description: "",
      status: "",
    });
    setSelectedImage(null);
    fileInputRef.current.value = null;
    showModalWithMessage("Brand added successfully!");
  } catch (error) {
    console.error("Error adding brand:", error);
    alert("Failed to add brand. Please try again.");
  }
};


const handleDeleteBrand = async (id) => {
  if (window.confirm("Are you sure you want to delete this brand?")) {
    try {
      await api.delete(`api/brand/${id}`);

      setBrands((prevBrands) => prevBrands.filter((brand) => brand._id !== id));
      showModalWithMessage("Brand deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete brand.");
    }
  }
};


  return (
    <div className="d-flex">
      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h5 style={{ color: "green" }}>Success!</h5>
            <p>{successMessage}</p>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      
      <Sidebar />
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div
          className="body-content px-4 py-4 "
          style={{ backgroundColor: "#f1f5f9" }}
        >
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start"> Brands</h4>

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
                &#8226; Brands
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
            {/* Left Div */}
            <div
              style={{
                width: "35%",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h6 style={{ marginTop: "20px" }}>Upload Image</h6>

              <div style={{ marginBottom: "10px" }}>
                <img
                  src={formData.image || Uploadimage}
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

              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <button
                style={{
                  marginBottom: "15px",
                  width: "100%",
                  height: "40px",
                  border: "0.5px solid rgba(97, 94, 94, 0.09)",
                  backgroundColor: "transparent",
                  color: "gray",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "blue";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "gray";
                  e.currentTarget.style.borderColor = "rgba(97, 94, 94, 0.09)";
                }}
                onClick={handleUploadClick}
              >
                <p style={{ opacity: 0.6, margin: 0 }}>Upload Image</p>
              </button>

              {/* Form Inputs */}
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  placeholder="website"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="location"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="description"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="input-light-border"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                onClick={editingBrandId ? handleUpdateBrand : handleAddBrand}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: isButtonHovered ? "#0056b3" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {editingBrandId ? "Update Brand" : "Add Brand"}
              </button>
            </div>

            {/* Right Div - Brand Table */}
            <div
              style={{
                width: "60%",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: "10px",
                overflowX: "auto",
                maxHeight:"800px"
              }}
            >
              <table
                className="table table-bordered"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr style={{ opacity: 0.2 }}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand) => (
                    <tr key={brand._id}>
                      <td>{brand.name}</td>
                      <td>{brand.email}</td>
                      <td>{brand.website}</td>
                      <td>{brand.location}</td>
                      <td>{brand.description}</td>
                      <td>{brand.status}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                              borderRadius: "5px"
                            }}
                            onClick={() => handleEditClick(brand)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteBrand(brand._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brand;