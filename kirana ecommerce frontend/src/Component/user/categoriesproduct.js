import React, { useState,useEffect } from "react";
import { useCart } from "./context/cartcontext";
import Swal from 'sweetalert2';
import '../user/css/categoryproduct.css'
import api from '../api'
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowRight, FaStar } from "react-icons/fa";

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


   useEffect(() => {
    fetchProducts_categories();
  }, []);

  const[categories,setcategories]=useState([])
  const fetchProducts_categories = async () => {
    try {
      const response = await api.get("api/product/get-categories");
      setcategories(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  


  const [selectedCategory, setSelectedCategory] = useState("");
useEffect(() => {
  if (categories.length > 0 && selectedCategory === "") {
    setSelectedCategory(categories[0]);
  }
}, [categories, selectedCategory]);

const[products,setproducts]=useState([])
const[loading,setloading]=useState(false)

  const fetchProducts = async () => {
  try {
    setloading(true)
    const response = await api.get(
      `api/product/get-categories-products/${selectedCategory}`
    );
    
    setproducts(response.data.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  finally
  {
    setloading(false)
  }
};

useEffect(()=>
{
  fetchProducts()

},[selectedCategory])

  




  return (
    <>
     
 <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">
  <div className="max-w-7xl mx-auto px-4 md:px-6">

    {/* Section Header */}
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
        Fresh & Authentic
      </span>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Shop by <span className="text-green-600">Categories</span>
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Explore our wide range of authentic Indian groceries, handpicked for quality and freshness
      </p>
    </div>

    {/* Category Tabs */}
  <div className="flex gap-3 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide px-1">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all
        ${
          selectedCategory === category
            ? "bg-green-600 text-white shadow-md"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-green-50"
        }`}
    >
      {category}
    </button>
  ))}

  {/* Optional ALL */}
  <button
    onClick={() => setSelectedCategory("all")}
    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
  >
    All
  </button>
</div>


    {/* Products */}
    {loading ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
     {loading ? (
  <div className="bg-white rounded-xl p-6 text-center animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-40 mx-auto mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-28 mx-auto"></div>
  </div>
) : products.length === 0 ? (
  <div className="bg-white rounded-xl p-6 text-center">
    <p className="text-gray-500 text-sm">No products available</p>
  </div>
) : null}


      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition"
          >
            {/* Image */}
            <div
              onClick={() => navigate(`/productdetails/${product._id}`)}
              className="relative aspect-square overflow-hidden cursor-pointer bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />

              {/* Add to cart */}
       <button
  onClick={(e) => {
    e.stopPropagation();
    addtocart(product);
  }}
  className="
    absolute bottom-3 right-3
    w-10 h-10 rounded-full
    bg-primary text-white
    flex items-center justify-center
    shadow-lg
    opacity-100 md:opacity-0
    md:group-hover:opacity-100
    translate-y-0 md:translate-y-4
    md:group-hover:translate-y-0
    transition-all duration-300
    hover:scale-110 active:scale-95
  "
>
  <FaShoppingCart className="w-4 h-4" />
</button>

            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 truncate">
                {product.title}
              </h3>

              <p className="text-gray-500 text-xs mb-2">
                {product.quantity} {product.unit}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold text-lg">
                  ₹{product.price.toFixed(2)}
                </span>

                <button
                  onClick={() => addtocart(product)}
                  className="text-sm text-green-600 font-medium md:hidden"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* View All */}
    {products.length > 4 && (
      <div className="flex justify-center mt-12">
        <button
          onClick={() =>
            navigate(`/allproducts/${encodeURIComponent(selectedCategory)}`)
          }
          className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition"
        >
          View All Products <FaArrowRight />
        </button>
      </div>
    )}
  </div>
</section>

    </>
  );
};

export default ProductCategories;
