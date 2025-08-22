import React, { useState,useEffect } from "react";
import { useCart } from "./context/cartcontext";
import Swal from 'sweetalert2';
import '../user/css/categoryproduct.css'
import api from '../api'
import { useNavigate } from "react-router-dom";

const ProductCategories = () => {

const navigate=useNavigate()
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
      text: `${product.title} has been added to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };


 

  const[allproducts,setallproducts]=useState([])
   useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("api/product/getproduct");
      setallproducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Group products by category
  const categoriesMap = allproducts.reduce((acc, product) => {
    if (!acc[product.categories]) acc[product.categories] = [];
    acc[product.categories].push(product);
    return acc;
  }, {});
  
  
  const categories = Object.keys(categoriesMap);

  const [selectedCategory, setSelectedCategory] = useState("");
useEffect(() => {
  if (categories.length > 0 && selectedCategory === "") {
    setSelectedCategory(categories[0]);
  }
}, [categories, selectedCategory]);


console.log(categories);


  



  return (
    <>
     
       <section className="popular-products-section">
      <h2>
        <span className="section-accent"></span>
        Categories Products
      </h2>
      <div className="tabs" role="tablist">
     
        {categories.map((category) => (
          <div
            key={category}
            role="tab"
            tabIndex={0}
            aria-selected={selectedCategory === category}
            className={`tab ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCategory(category);
              }
            }}
          >
            {category}
          </div>
        ))}
      </div>

      {selectedCategory ? (
        <div className="products-grid">
          {categoriesMap[selectedCategory].slice(0, 4).map((prod, index) => (
            <div className="product-card" key={index} >
              <img
              onClick={()=>navigate(`/productdetails/${prod._id}`)}
                className="product-image"
                src={prod.image}
                alt={prod.title}
                loading="lazy"
              />
              <div className="product-name">{prod.title}</div>
              <div className="product-name">{prod.quantity} {prod.unit}</div>
              <div className="product-price">₹{prod.price.toFixed(2)}</div>
              <button
                className="add-to-cart-btn"
                onClick={()=>addtocart(prod)}
              >
                Add to Cart
              </button>
            </div>
          ))}
           { categoriesMap[selectedCategory].length > 4 && (
              <div style={{ textAlign: "center", marginTop: "5rem" }}>
                <button
                  className="view-all-btn"
                  onClick={() => navigate(`/allproducts/${encodeURIComponent(selectedCategory)}`)}
        >
              
                  View All
                </button>
              </div>
            )}
        </div>
        
      ) : (
        <p>No category selected.</p>
      )}
      </section>
    </>
  );
};

export default ProductCategories;
