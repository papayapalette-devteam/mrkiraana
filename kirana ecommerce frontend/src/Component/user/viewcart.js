import React from "react";
import { useCart } from "../user/context/cartcontext"; // adjust path as needed
import "../user/css/viewcart.css"; // You need a dedicated CSS for cart page
import Header from './header'
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {

    const navigate=useNavigate()
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.product_quantity || 1),
    0
  );

  const handleQuantityChange = (item, delta) => {
    const newQuantity = (item.product_quantity || 1) + delta;
    if (newQuantity > 0) {
      updateQuantity(item._id, newQuantity);
    }
  };

  // Optional: handle empty cart separately
  if (cartItems.length === 0) {
    return (
        <>
             <Header/>
      <div className="cart-empty-container" style={{margin:"10%"}}>
        <h2>Your Cart is Empty</h2>
        <a href="/" className="shop-link">Continue Shopping</a>
      </div>
         <Footer/>
      </>
    );
  }

  return (
    <>
 <Header/>
    <div className="viewcart-container">
      <h1>My Cart</h1>
      <div className="cart-table-responsive">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Images</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                </td>
                <td>{item.title}{item.quantity}{item.unit}</td>
                <td>₹{item.price}</td>
                <td>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item, -1)}
                    >
                      −
                    </button>
                    <span className="cart-qty">{item.product_quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{(item.price * item.product_quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <h2>Cart Totals</h2>
        <div className="cart-summary-details">
          <div>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div>
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
        </div>
        <a  className="checkout-btn" onClick={()=>navigate('/checkout')}>
          Proceed to checkout
        </a>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ViewCart;
