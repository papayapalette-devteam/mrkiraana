// ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api'
import { useCart } from "../user/context/cartcontext";
import '../user/css/productdetails.css'
import Header from "./header";
import Footer from "./footer";
import Swal from 'sweetalert2';


export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);


 useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      // Replace this with your real API endpoint!
      const res = await api.get(`api/product/products/${id}`);
      console.log(res);
      
      const data = await res.data
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const { cartItems,setCartItems, removeFromCart } = useCart();

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
        text: `${product.title} has been added to your cart.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    };

 

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 40 }}>Product not found.</div>;

  return (
    <>
  <Header/>
    <div className="product-detail-container">
 
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <a href="/products">Products</a> &gt; <span>{product.title}</span>
      </div>
  
      <div className="product-detail-main">
   
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
     
        <div className="product-detail-info">
          <div className="product-detail-stock">{product.inStock} In Stock</div>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-desc">{product.description}</div>
          <div className="product-detail-price-row">
            <span className="product-detail-price">₹{product.price.toFixed(2)}</span>
            <span className="product-detail-discount">-0%</span>
          </div>
      
          <div className="product-detail-cart-row">
            <button className="cart-btn" onClick={()=>addtocart(product)}>Add to Cart</button>
            {/* <button className="fav-btn" title="Add to wishlist">♡</button> */}
          </div>
          <div className="product-detail-meta">
              <div>Weight: {product.quantity} {product.unit}</div>
            <div>SKU: {product.sku}</div>
            <div>Categories: {product.categories.join(", ")}</div>
            <div>
              Tags: {product.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    
    </div>
    <Footer/>
        </>
  );
}
