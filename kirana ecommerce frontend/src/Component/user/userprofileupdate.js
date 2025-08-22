import React, { useEffect, useState } from "react";
import Header from "./header";
import api from '../api'
import Footer from "./footer";

const UserProfileUpdate = () => {

      const user = localStorage.getItem("userEmail");

      
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    fatherName: "",
    motherName: "",
    houseNo: "",
    landmark: ""
  });

  const getproile=async()=>
      {
        try {
          const resp=await api.get(`api/user/getuserprofile/${user}`)
          setFormData(resp.data.user)
          
        } catch (error) {
          console.log(error);
          
        }
      }
useEffect(()=>
{
  getproile()

},[user])

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pin code is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pin code must be 6 digits";
    }
    // if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    // if (!formData.motherName.trim()) newErrors.motherName = "Mother's name is required";
    if (!formData.houseNo.trim()) newErrors.houseNo = "House number is required";
    if (!formData.landmark.trim()) newErrors.landmark = "Landmark is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSuccessMsg("");
    if (validate()) {
      const resp= await api.put(`api/user/updateuser/${user}`,formData)
      console.log(resp);
      
      setSuccessMsg("Profile updated successfully!");
    }
  };

  return (
    <>
    <Header/>
    <div className="profile-update-container">
      <h2>Update Your Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Phone Number
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit phone number" />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Address
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Street address" rows={2} />
          {errors.address && <span className="error">{errors.address}</span>}
        </label>
        <label>
          House No.
          <input type="text" name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="House or Flat Number" />
          {errors.houseNo && <span className="error">{errors.houseNo}</span>}
        </label>
        <label>
          Landmark
          <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark near your location" />
          {errors.landmark && <span className="error">{errors.landmark}</span>}
        </label>
        <label>
          City
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          {errors.city && <span className="error">{errors.city}</span>}
        </label>
        <label>
          State
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          {errors.state && <span className="error">{errors.state}</span>}
        </label>
        <label>
          Country
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          {errors.country && <span className="error">{errors.country}</span>}
        </label>
        <label>
          Pin Code
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit Pin Code" />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </label>
        <label>
          Father’s Name
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name" />
          {errors.fatherName && <span className="error">{errors.fatherName}</span>}
        </label>
        <label>
          Mother’s Name
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's Name" />
          {errors.motherName && <span className="error">{errors.motherName}</span>}
        </label>
        <button type="submit" className="update-btn">Update Profile</button>
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
      <style jsx>{`
        .profile-update-container {
          max-width: 520px;
          margin: 20px auto;
          padding: 18px 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        h2 {
          text-align: center;
          color: #222b45;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 600;
          color: #333;
        }

        input, textarea {
          margin-top: 4px;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border 0.3s;
        }

        input:focus, textarea:focus {
          border-color: #0070f3;
          outline: none;
        }

        .error {
          color: #d62828;
          font-size: 0.87rem;
          margin-top: 2px;
        }

        .update-btn {
          padding: 12px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.07rem;
        }

        .update-btn:hover {
          background: #005bb5;
        }

        .success-msg {
          margin-top: 16px;
          color: #2a9d8f;
          text-align: center;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .profile-update-container {
            margin: 10px;
            padding: 14px;
          }
        }
      `}</style>
    </div>
    <Footer/>
    </>
  );
};

export default UserProfileUpdate;
