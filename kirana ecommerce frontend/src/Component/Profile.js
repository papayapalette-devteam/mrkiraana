import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import Sidebar from "./sidebar";
import { Button } from "bootstrap";

function Profile() {
  const [isHovered1, setIsHovered1] = useState(false);

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
              <h4 className="mb-0 text-start">My Profile</h4>
            </div>
          </div>

          {/* Page Container */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#f1f5f9",
              display: "flex",
              flexDirection: "column", // Stack children vertically
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {/* First Block */}
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div
  style={{
    width: "151px",
    height: "150px",
   backgroundColor: "#e0e0e0", // light gray
    borderRadius: "10px",
    position: "relative",
    marginTop: "-50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  }}
> 451x450
  {/* Camera Icon Button */}
 <label
  htmlFor="imageUpload"
  style={{
    position: "absolute",
    top: "0px",
    right: "0px",
    backgroundColor: "blue",
    borderRadius: "50%",
    padding: "8px", // Slightly larger circle
    cursor: "pointer",
    marginTop: "-10px",
    boxShadow: "0px 0px 5px hsla(0, 33.30%, 95.30%, 0.10)",
  }}
>
  <i className="fas fa-camera" style={{ fontSize: "16px", color: "white" }}></i>
</label>



  {/* Hidden File Input */}


  
  <input
  className="input-highlight"
    type="file"
    id="imageUpload"
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Selected file: ${file.name}`);
        // Optional: handle upload or preview
      }
    }}
  />
</div>
<h5>First Project</h5>

            </div>

            {/* Second Block */}
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h5>Basic Information</h5>
            

            <div style={{ width: "100%" }}>
  {/* Name */}
  <div style={{ marginTop: "10px" }}>


    <label style={{ marginBottom: "5px", display: "block" }}>Name</label>


    <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>
    <input
     className="input-highlight"
      type="text"
      placeholder="Name"
      style={{ width: "100%", height: "40px", padding: "8px",borderRadius:"4px",
        border: "1px solid #ebedef",
       }}
    />

    </>
  </div>

  {/* Email */}
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginBottom: "5px", display: "block" }}>Email</label>

     <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>
    <input

    className="input-highlight"
      type="email"
      placeholder="Email"
      style={{ width: "100%", height: "40px", padding: "8px",borderRadius:"4px",
        border: "1px solid #ebedef",}}
    />

    </>
  </div>

  {/* Phone */}
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginBottom: "5px", display: "block" }}>Phone</label>

     <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>
    <input
      className="input-highlight"
      type="tel"
      placeholder="Phone"
      style={{ width: "100%", height: "40px", padding: "8px" ,borderRadius:"4px",
        border: "1px solid #ebedef",}}
    /> 
    </>
  </div>

  <div style={{ marginTop: "10px" }}>
  <label style={{ marginBottom: "5px", display: "block" }}>Role</label>

   <>
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
      borderRadius:"4px",
        border: "1px solid #ebedef",
    }}
    defaultValue=""
  >
  <option value="" style={{ color: "#6c757d" }}>
  Admin
</option>


    <option value="admin">Admin</option>
    <option value="super-admin">Super Admin</option>
    <option value="manager">Manager</option>
    <option value="ceo">CEO</option>
  </select>
  </>
</div>

<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
  <button
    style={{
      backgroundColor: "blue",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "10px 20px",
      cursor: "pointer",
      height:"40px",
      width:"120px"
    }}
  >
    Save
  </button>
</div>

    
</div>





            </div>


             <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <h5>Security </h5>
            

            <div style={{ width: "100%" }}>
  {/* Name */}
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginBottom: "5px", display: "block" }}>Current Password</label>
     <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>


    <input
     className="input-highlight"
      type="text"
      placeholder="Current Password"
      style={{ width: "100%", height: "40px", padding: "8px",borderRadius:"4px",
        border: "1px solid #ebedef",}}
    />
    </>
  </div>
  

  {/* Email */}
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginBottom: "5px", display: "block" }}>New Password</label>

     <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>

    <input
    className="input-highlight"
      type="password"
      placeholder="Password"
      style={{ width: "100%", height: "40px", padding: "8px", borderRadius:"4px",
        border: "1px solid #ebedef", }}
    />
    </>
  </div>

  {/* Phone */}
  <div style={{ marginTop: "10px" }}>
    <label style={{ marginBottom: "5px", display: "block" }}>Conform Password</label>

      <>
  <style>
    {`
      .input-highlight:focus {
        border: 1px solid blue !important;
        outline: none;
      }
    `}
  </style>
    <input
    className="input-highlight"
      type="password"
      placeholder="Conform Password"
      style={{ width: "100%", height: "40px", padding: "8px", borderRadius:"4px",
        border: "1px solid #ebedef", }}
    />
    </>
  </div>

<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
  <button
    style={{
      backgroundColor: "blue",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "10px 20px",
      cursor: "pointer",
      height:"40px",
      width:"120px"
    }}
  >
    Save
  </button>
</div>

    
</div>





            </div>
          </div>





        </div>
      </div>
    </div>
  );
}

export default Profile;
