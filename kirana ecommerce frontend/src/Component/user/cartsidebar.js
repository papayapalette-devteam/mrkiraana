import React from "react";
import { useCart } from "../user/context/cartcontext";
import emptyCartImg from "../user/empty-cart.png";
import '../user/css/cartsidebar.css'
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ isOpen, onClose }) => {

  const navigate=useNavigate()
  const { cartItems,removeFromCart} = useCart();

  // Calculate subtotal
  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    ) || 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
      />

      <div className={`cart-sidebar${isOpen ? " open" : ""}`}>
        <div className="cart-sidebar-header">
          <span>SHOPPING CART</span>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart sidebar">
            &times;
          </button>
        </div>

        <div className="cart-sidebar-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <img src={emptyCartImg} alt="Empty cart" />
              <p>Your Cart is empty</p>
              <a className="cart-shop-btn" href="/shop">
                Go To Shop
              </a>
              <div className="cart-sidebar-summary">
                <div>
                  <span>Subtotal:</span>
                  <span className="subtotal-amount">$0.00</span>
                </div>
                <button className="cart-action-btn" disabled>View Cart</button>
                <button className="cart-action-btn" disabled>Checkout</button>
              </div>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img className="cart-item-img" src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.title}{item.quantity}{item.unit}</span>
                      <span className="cart-item-qty">x{item.product_quantity}</span> 
                    </div>
                    <div className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                        <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item._id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-sidebar-summary">
                <div>
                  <span>Subtotal:</span>
                  <span className="subtotal-amount">₹{subtotal.toFixed(2)}</span>
                </div>
                <a >
                  <button className="cart-action-btn" onClick={()=>navigate('/viewcart')}>View Cart</button>
                </a>
                <a >
                  <button className="cart-action-btn" onClick={()=>navigate('/checkout')}>Checkout</button>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
