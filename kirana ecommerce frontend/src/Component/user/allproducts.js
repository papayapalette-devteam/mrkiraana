import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import React, { useState, useEffect } from "react";
import { useCart } from "./context/cartcontext";
import Swal from 'sweetalert2';
import Footer from './footer';
import Header from './header';

function CategoryProductsList() {

    const navigate=useNavigate()
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setCartItems, cartItems } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [decodedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/product/getproduct");
      const products = response.data || [];
      setAllProducts(products);

        const filtered = products.filter(p => p.categories===decodedCategory);
      setFilteredProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load products',
        text: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };


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
 

  return (
    <>
    <Header/>
    <div style={{ padding: 20, maxWidth: 1200, margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        {decodedCategory} Products
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No products found in this category.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
        }}>
          {filteredProducts.map(product => (
            <div key={product.id}
                 style={{
                   boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                   borderRadius: 8,
                   padding: 16,
                   textAlign: 'center',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'space-between',
                   backgroundColor: '#fff',
                   transition: 'transform 0.3s',
                   cursor: 'pointer',
                 }}
                 onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100%', height: 150, objectFit: 'contain', marginBottom: 12 }}
                onClick={()=>navigate(`/productdetails/${product._id}`)}
              />
              <h6 style={{ margin: '8px 0' }}>{product.title}</h6>
              <p style={{ margin: '4px 0', color: '#555' }}>{product.quantity} {product.unit}</p>
              <p style={{ margin: '4px 0', color: 'green', fontWeight: 'bold' }}>
                ₹{product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addtocart(product)}
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#157347',
                  color: 'white',
                  border: 'none',
                  padding: '10px 0',
                  borderRadius: 6,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default CategoryProductsList;
