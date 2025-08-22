import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from './api';
import logo from './USER SIGN IN .jpg';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [successMessage, setSuccessMessage] = useState("");
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

    if (formData.email === "admin@gmail.com" && formData.password === "admin123") {
      navigate('/dashboard');
      return;
    }

    try {
      const response = await api.post("api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);

        setSuccessMessage("✅ Login successful!");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          padding: 40px 20px;
        }

        .login-box {
          display: flex;
          background-color: #fff;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
          width: 800px;
          max-width: 100%;
          height:500px;
        }

        .left-section {
          width: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }

        .left-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .right-section {
          padding: 40px;
          width: 400px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        h2 {
          margin-bottom: 10px;
          text-align: center;
        }

        p {
          text-align: center;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .signin-link {
          color: #0d6efd;
          text-decoration: none;
          cursor: pointer;
        }

        .signin-link:hover {
          text-decoration: underline;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        label {
          font-weight: 600;
          font-size: 14px;
          display: flex;
          flex-direction: column;
        }

        input[type="email"],
        input[type="password"] {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          border-color: #0d6efd;
          outline: none;
        }

        .checkbox-remember {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          gap: 10px;
        }

        .checkbox-remember label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 400;
        }

        .checkbox-remember a {
          color: #0d6efd;
          text-decoration: none;
          cursor: pointer;
        }

        .checkbox-remember a:hover {
          text-decoration: underline;
        }

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

        /* Responsive styles */
        @media (max-width: 900px) {
          .login-box {
            flex-direction: column;
            width: 100%;
            max-width: 400px;

            margin-top:-320px
           
       


          }

          .left-section {
            display: none;
          }

          .right-section {
            width: 100%;

            padding: 40px 20px;

            padding: 30px 20px;
            margin-bottom: 350px;
          }
        }

        @media (max-width: 500px) {
          h2 {
            font-size: 24px;
          }

          label {
            font-size: 13px;
          }

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

      <div className="login-container">
        {successMessage && (
          <div className="success-overlay">
            <div className="success-message">{successMessage}</div>
          </div>
        )}

        <div className="login-box">
          <div className="left-section">
            <img src={logo} alt="Login Illustration" />
          </div>

          <div className="right-section">
            <h2>Login Now.</h2>
            <p>
              Don't have an account?{" "}
              <span className="signin-link" onClick={() => navigate("/RegisterForm")}>
                Sign Up
              </span>
            </p>

            <form onSubmit={handleSubmit}>
              <label>
                Email<span style={{ color: "red" }}>*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Password<span style={{ color: "red" }}>*</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="checkbox-remember">
                <label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  Remember Me
                </label>
                <a onClick={() => navigate("/ResetPassword")}>Forgot Password ?</a>
              </div>

              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
