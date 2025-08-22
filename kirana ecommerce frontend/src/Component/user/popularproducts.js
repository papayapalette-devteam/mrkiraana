import React, { useState } from "react";
import "../user/css/popularproducts.css";
import { useCart } from "./context/cartcontext";
import Swal from 'sweetalert2';

const CATEGORIES = [
  { key: "topRated", label: "Top Rated" },
  { key: "bestSelling", label: "Best Selling" },
  { key: "latestProduct", label: "Latest Product" },
];

 const products = [
  { _id: 1, name: "Wireless Headphones", price: 99.99, image: "https://www.leafstudios.in/cdn/shop/files/1_a43c5e0b-3a47-497d-acec-b4764259b10e_1024x1024.png?v=1750486829", category: "topRated" },
  { _id: 2, name: "Bluetooth Speaker", price: 39.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9cYWSaBNIhOPF2gguIun1olGtIYrHAlOO7w&s", category: "bestSelling" },
  { _id: 3, name: "Smart Watch", price: 149.99, image: "https://www.gonoise.com/cdn/shop/files/1_c95e5561-4f66-413d-b143-42d31821e554.webp?v=1721392308", category: "latestProduct" },
  { _id: 4, name: "Mini Earbuds", price: 59.99, image: "https://avstore.in/cdn/shop/files/1.AVStore-Denon-AH-C630-W-Front-View-With-Charging-Case-Black.jpg?v=1708340888", category: "topRated" },
  { _id: 5, name: "Kids Headphones", price: 29.99, image: "https://m.media-amazon.com/images/I/613hj+40W9L.jpg", category: "bestSelling" },
  { _id: 6, name: "Noise Cancelling", price: 120.0, image: "https://m.media-amazon.com/images/I/51ZR4lyxBHL.jpg", category: "latestProduct" },
];

const Popularproducts = () => {
  const [activeTab, setActiveTab] = useState("topRated");

  const filteredProducts = products.filter(
    (prod) => prod.category === activeTab
  );
  
const { setCartItems, cartItems } = useCart();

const addtocart = (product) => {
  const existingItem = cartItems.find((item) => item._id === product._id);
  if (existingItem) {
    // If already in cart, increment quantity
    setCartItems(
      cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  } else {
    // If not in cart, add with quantity 1
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
  Swal.fire({
    title: 'Added to Cart!',
    text: `${product.name} has been added to your cart.`,
    icon: 'success',
    confirmButtonText: 'OK'
  });
};



  
  return (
    <section className="popular-products-section">
      <h2>
        <span className="section-accent"></span>
        Popular Products
      </h2>
      <div className="product-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`tab-btn${activeTab === cat.key ? " active" : ""}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="products-list">
        {filteredProducts.map((prod) => (
         <div className="product-card" key={prod.id}>
            <div className="product-image-wrapper">
                <img src={prod.image} alt={prod.name} className="product-img" />
            </div>
            <div className="product-info">
                <div className="product-name">{prod.name}</div>
                <div className="product-price">${prod.price}</div>
            </div>
            <div className="buy-now-wrapper">
                <button className="buy-now-btn" onClick={()=>addtocart(prod)}>Add to cart</button>
            </div>
            </div>

        ))}
        {filteredProducts.length === 0 && (
          <div className="product-error">No products in this category.</div>
        )}
      </div>
    </section>
  );
};

export default Popularproducts;
