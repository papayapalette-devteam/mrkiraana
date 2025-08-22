import React, { useState,useEffect } from "react";
import { useCart } from "../user/context/cartcontext";
import "../user/css/checkout.css"; 
import Footer from "./footer";
import Header from "./header";
import api from '../api'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

   const user=  localStorage.getItem("userEmail");
  const { cartItems,setCartItems } = useCart();


    // Calculate subtotal and totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.product_quantity || 1),
    0
  );

  const[userdata,setuserdata]=useState([])
   const getprofile=async()=>
      {
        try {
          const resp=await api.get(`api/user/getuserprofile/${user}`)
          setuserdata(resp.data.user)
          
        } catch (error) {
          console.log(error);
          
        }
      }
useEffect(()=>
{
  getprofile()

},[user])

  // Basic state for form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    email: "",
    phone: "",
    notes: "",
    shipping: "today", // default selection
    payment: "bank",   // default selection
    cardNumber: "",
    order_details:cartItems,
    total_amount:subtotal
  });

 useEffect(() => {
  if (userdata && Object.keys(userdata).length > 0) {
    setForm(prevForm => ({
      ...prevForm,
      address: userdata.address || "",
      city: userdata.city || "",
      state: userdata.state || "",
      postcode: userdata.pincode || "",
      email: userdata.email || "",
      phone: userdata.phone || "",
    }));
  }
}, [userdata]);



  const shippingCost = form.shipping === "today" ? 0 : 0;
  const total = subtotal + shippingCost;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // useEffect(()=>
  // {
  //   if(subtotal>100)
  //   {
  //     setForm({ ...form, : e.target.value });
  //   }

  // },[subtotal])

const navigate=useNavigate()
      const createorder=async()=>
      {
        try {
          if(!user)
          {
            return Swal.fire({
              icon:"error",
              title:"user not logged In",
              text:"please log in you id for place order",
              showConfirmButton:true
            })
          }
          const resp=await api.post('api/user/customerorder',form)
      
       if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Order created",
          text: "Order created successfully",
          showConfirmButton: true
        }).then(() => {
          navigate('/');
          setCartItems([]) // navigate after alert is closed
        });
      }
          
        } catch (error) {
          console.log(error);
          
        }
      }

  return (
    <>
   <Header/>
    <div className="checkout-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> <span>&gt;</span> <span>Checkout</span>
      </div>

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-form">
        <div className="billing-section">
          <h2>Billing Details</h2>
          <div className="billing-fields">
            <div>
              <label>First Name *</label>
              <input name="firstName" required value={form.firstName} onChange={handleChange} />
            </div>
            <div>
              <label>Last Name *</label>
              <input name="lastName" required value={form.lastName} onChange={handleChange} />
            </div>
            <div>
              <label>Address *</label>
              <input name="address" required value={form.address} onChange={handleChange} />
            </div>
            <div>
              <label>Town / City *</label>
              <input name="city" required value={form.city} onChange={handleChange} />
            </div>
            <div>
              <label>State / County *</label>
              <input name="state" required value={form.state} onChange={handleChange} />
            </div>
            <div>
              <label>Postcode / Zip *</label>
              <input name="postcode" required value={form.postcode} onChange={handleChange} />
            </div>
            <div>
              <label>Email Address *</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label>Phone *</label>
              <input name="phone" required value={form.phone} onChange={handleChange} />
            </div>
            <div className="full-width">
              <label>Order Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                placeholder="Notes about your order, e.g. special notes for delivery."
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="order-summary-section">
          <h2>Your order</h2>
          <table className="order-summary-table">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.title}({item.quantity}{item.unit}) × <strong>{item.product_quantity || 1}</strong>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    ₹{((item.price || 0) * (item.product_quantity || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Cart Subtotal</td>
                <td style={{ textAlign: "right" }}>₹{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                {/* <td style={{ textAlign: "right" }}>
                  <label>
                    <input
                      type="radio"
                      name="shipping"
                      value="today"
                      checked={form.shipping === "today"}
                      onChange={handleChange}
                    />{' '}
                    Delivery: Today   ₹60.00
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={form.shipping === "free"}
                      onChange={handleChange}
                    />{' '}
                    delivery free on order above INR 2000 and within 5km
                  </label>
                </td> */}
              </tr>
              <tr>
                <td><strong>Total Order</strong></td>
                <td style={{ textAlign: "right", color: "#ff0879", fontWeight: "bold" }}>
                    ₹{total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* <div className="payment-section">
            <strong>Direct Bank Transfer</strong>
            <div className="card-fields">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={form.cardNumber}
                onChange={handleChange}
              />
              <input
                type="text"
                name="exp"
                placeholder="MM / YY"
                style={{ width: "70px", marginLeft: "10px" }}
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                style={{ width: "50px", marginLeft: "10px" }}
              />
            </div>
            <button  className="place-order-btn" onClick={createorder}>Place order</button>
          </div> */}
        </div>
      </div>
    </div>
    <Footer/>
     </>
  );
};

export default Checkout;
