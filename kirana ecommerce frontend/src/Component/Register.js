import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from './api'

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptedTerms) {
      alert("Please accept the terms of service and privacy policy.");
      return;
    }

    try {
      const response = await api.post("api/user/registration", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        localStorage.setItem("isRegistered", "true");
        localStorage.setItem("userEmail", formData.email);

        setSuccessMessage("✅ Registered successfully! ");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/LoginForm");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Try again."
      );
    }
  };

  return (
    <>
      <style>{`
        /* Responsive container */
        .register-container {
          display: flex;
          min-height: 100vh;
          font-family: Poppins, sans-serif;
          padding: 50px 10vw;
          background-color: #f0f0f0;
          overflow-y: auto;
          margin-bottom: 50px;
          gap: 30px;
          box-sizing: border-box;
        }

        /* Responsive Left section */
        .left-section {
          flex: 1;
          background-color: gray;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 100px;
          margin-bottom: 100px;
          min-width: 0;
        }

        /* Responsive Right/form section */
        .right-section {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          margin-bottom: 100px;
          min-width: 0;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
          width: 100%;
          max-width: 400px;
        }

        label {
          font-weight: 600;
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus {
          border-color: #0d6efd;
          outline: none;
        }

        /* Checkbox label tweaks */
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 400;
        }

        /* Submit button style */
        button[type="submit"] {
          background-color: #0d6efd;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
        }
        button[type="submit"]:hover {
          background-color: #084cd6;
        }

        /* Success overlay */
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-message {
          padding: 20px 40px;
          background-color: #e6ffe6;
          color: green;
          border: 2px solid green;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        /* Link style */
        .signin-link {
          color: #0d6efd;
          text-decoration: none;
          cursor: pointer;
          font-weight: 500;
        }
        .signin-link:hover {
          text-decoration: underline;
        }

        /* Responsive adjustments */

<<<<<<< HEAD
      @media (max-width: 900px) {
  .register-container {
    flex-direction: column;
    padding: 20px 10px;
    margin-bottom: 300px;
  }

  /* Hide left section completely on mobile */
  .left-section {
    display: none !important;
  }

  .right-section {
    width: 100% !important; /* full width */
    margin-bottom: 0;
    padding-bottom: 40px;
  }

  form {
    max-width: 100%;
  }
}


        @media (max-width: 500px) {
        .left-section {
          flex: 1;
          background-color: gray;
          display: none;
          align-items: center;
          justify-content: center;
          padding-bottom: 100px;
          margin-bottom: 100px;
          min-width: 0;
        }
=======
        @media (max-width: 900px) {
          .register-container {
            flex-direction: column;
            padding: 20px 10px;
            margin-bottom: 30px;
          }
          .left-section
          {
          display:none;
          }
        .right-section {
            width: 100%;
            margin-bottom: 30px;
            padding-bottom: 40px;
            margin-bottom: 320px;
          }

          form {
            max-width: 100%;
          }
        }

        @media (max-width: 500px) {
>>>>>>> 360dcc1d5 (responsive done)
          h2 {
            font-size: 24px;
          }

          label {
            font-size: 13px;
          }

          input[type="text"],
          input[type="email"],
          input[type="password"] {
            font-size: 14px;
          }

          button[type="submit"] {
            font-size: 14px;
            padding: 10px;
          }

          .success-message {
            font-size: 16px;
            padding: 15px 30px;
          }
        }
      `}</style>

      <div className="register-container">
        {successMessage && (
          <div className="success-overlay">
            <div className="success-message">{successMessage}</div>
          </div>
        )}

        {/* Left side gray section */}
        <div className="left-section">
          {/* You can put a responsive image or illustration here */}
        </div>

        {/* Right side form section */}
        <div className="right-section">
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Register Now.
          </h2>
          <p style={{ textAlign: "center", marginBottom: "30px" }}>
            Already have an account?{" "}
            <span
              className="signin-link"
              onClick={() => navigate("/LoginForm")}
            >
              Sign In
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <label>
              Your Name <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            {/* Email */}
            <label>
              Your Email <span style={{ color: "red" }}>*</span>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            {/* Password */}
            <label>
              Password <span style={{ color: "red" }}>*</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            {/* Terms */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                required
              />
              I accept the{" "}
              <a
                href="/terms"
                style={{ color: "#0d6efd", marginLeft: "4px", textDecoration: "none" }}
              >
                terms of the Service & Privacy Policy
              </a>
              .
            </label>

            {/* Submit */}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
