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

function Ourstaff() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isHovered1, setIsHovered1] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    joiningDate: '',
    role: '',
    image: [],
  });

  const [staffList, setStaffList] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      console.log(id);
      const response = await fetch(`http://localhost:5000/api/staff/staff/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccessMessage("✅ Staff deleted successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);

        setStaffList((prev) => prev.filter((staff) => staff._id !== id));
      } else {
        alert("Failed to delete staff");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting");
    }
  };

  const [editingStaffId, setEditingStaffId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/staff/getstaff")
      .then(res => res.json())
      .then(data => {
        setStaffList(data);
      })
      .catch(err => console.error("Error fetching staff:", err));
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (!editingStaffId) {
      data.append('password', formData.password);
    }
    data.append('phone', formData.phone);
    data.append('joiningDate', formData.joiningDate);
    data.append('role', formData.role);
    if (formData.image) {
      data.append('image', formData.image[0]);
    }

    try {
      let response;
      if (editingStaffId) {
        response = await fetch(`http://localhost:5000/api/staff/staff/${editingStaffId}`, {
          method: 'PUT',
          body: data,
        });
      } else {
        response = await fetch("http://localhost:5000/api/staff/addstaff", {
          method: "POST",
          body: data,
        });
      }

      if (response.ok) {
        const savedStaff = await response.json();
        setSuccessMessage(editingStaffId ? "✅ Staff updated successfully!" : "✅ Staff added successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);

        if (editingStaffId) {
          setStaffList(prevList => prevList.map(staff => (staff._id === editingStaffId ? savedStaff : staff)));
        } else {
          setStaffList(prevList => [...prevList, savedStaff]);
        }

        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          joiningDate: '',
          role: '',
          image: [],
        });
        setEditingStaffId(null);
      } else {
        alert("Failed to save staff");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  const handleEditClick = (staff) => {
    setEditingStaffId(staff._id);
    setFormData({
      name: staff.name || '',
      email: staff.email || '',
      password: '',
      phone: staff.phone || '',
      joiningDate: staff.joiningDate ? new Date(staff.joiningDate).toISOString().split('T')[0] : '',
      role: staff.role || '',
      image: staff.image,
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4 " style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start"> Staff</h4>

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

              <h6 style={{ display: "inline", marginLeft: "10px", opacity: 0.6, fontSize: "13px" }}>
                &#8226; Category List
              </h6>
            </div>
          </div>

          <div className="container" style={{
            width: "100%",
            backgroundColor: "#f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "0px",
            gap: "10px",
            marginTop: "20px",
          }}>
            {/* Left Div */}
            <div style={{
              width: "35%",
              backgroundColor: "white",
              padding: "15px",
              border: "0px solid #ddd",
              borderRadius: "5px",
            }}>
              <h6 style={{ marginTop: "20px" }}>Upload Image</h6>

              <div style={{ marginBottom: "10px" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: Array.from(e.target.files)})}
                  style={{ display: "none" }}
                />
                <img
                  src={formData.image.length===0 ? Uploadimage:formData.image}
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
                  padding: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  display: "block",
                  textAlign: "center",
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

              <div style={{ marginBottom: "10px" }}>
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input-light-border"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label>email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="enter email"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  className="input-light-border"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label>password</label>
                <input
                  type="text"
                  name="password"
                  placeholder="enter password"
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  className="input-light-border"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label>phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="enter phone "
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  className="input-light-border"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: "5px", position: "relative", width: "100%" }}>
                <label>joining date</label>
                <input
                  type="date"
                  name="joiningDate"
                  placeholder="dd-mm-yy"
                  style={{
                    width: "100%",
                    padding: "8px 30px 8px 8px",
                    marginTop: "5px",
                    boxSizing: "border-box",
                  }}
                  className="input-light-border"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <label style={{ marginBottom: "5px", display: "block" }}> Admin Role</label>
                <style>
                  {`
                    .input-highlight:focus {
                      border: 1px solid blue !important;
                      outline: none;
                    }
                  `}
                </style>
                <select
                  className="input-highlight"
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "8px",
                    borderRadius: "4px",
                    outline: "none",
                    border: "1px solid #ebedef",
                  }}
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="" style={{ color: "#6c757d" }}>Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <button className="my-button" onClick={handleSubmit}>
                {editingStaffId ? "Update Staff" : "Add Staff"}
              </button>
            </div>

            {/* Right Div */}
            <div style={{ width: "65%", backgroundColor: "#fff" }}>
              <div style={{
                backgroundColor: "#fff",
                padding: "10px",
                border: "0px solid #ddd",
                overflow: "auto",
                maxHeight: "400px",
                width: "90%",
                marginLeft: "20px"
              }}>
                <table style={{
                  minWidth: "1000px",
                  borderCollapse: "collapse",
                  width: "100%",
                }}>
                  <thead>
                    <tr style={{ opacity: 0.2, fontSize: "12px" }}>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "10px" }}>NAME</th>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "100px" }}>EMAIL</th>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "100px" }}>CONTACT</th>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "100px" }}>STATUS</th>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "100px" }}>ROLE</th>
                      <th style={{ textAlign: "left", padding: "10px", paddingLeft: "100px" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.map((staff) => (
                      <tr key={staff._id}>
                        <td style={{ paddingLeft: "10px" }}>{staff.name}</td>
                        <td style={{ paddingLeft: "100px" }}>{staff.email}</td>
                        <td style={{ paddingLeft: "100px" }}>{staff.phone}</td>
                        <td style={{ paddingLeft: "100px" }}>{staff.status || "Active"}</td>
                        <td style={{ paddingLeft: "100px" }}>{staff.role}</td>
                        <td style={{ paddingLeft: "100px", display: "flex", gap: "10px" }}>
                          <button
                            style={{ backgroundColor: "blue", color: "white", borderRadius: "5px", border: "none", padding: "5px 10px", cursor: "pointer" }}
                            onClick={() => handleEditClick(staff)}
                          >
                            Edit
                          </button>
                          <button
                            style={{ backgroundColor: "red", color: "white", borderRadius: "5px", border: "none", padding: "5px 10px", cursor: "pointer" }}
                            onClick={() => handleDelete(staff._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {staffList.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No staff found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "10px", fontSize: "14px", marginLeft: "20px" }}>
                Showing 1–{staffList.length} of {staffList.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,128,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px 40px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "green",
            }}
          >
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default Ourstaff;
