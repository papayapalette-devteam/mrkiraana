import React, { useState, useRef, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
import Uploadimage from "../Uploadimage.png";
import ProductVariations from "./Addimage";
import Lottie from "lottie-react";
import axios from "axios";
import api from './api'

function Addproduct() {


       const [isLoading1, setIsLoading1] = useState(false);
         const [animationData, setAnimationData] = useState(null);
         useEffect(() => {
           fetch("https://assets6.lottiefiles.com/packages/lf20_usmfx6bp.json")
             .then((res) => res.json())
             .then((data) => setAnimationData(data));
         }, []);



           useEffect(() => {
    fetchCategories();
  }, []);

  const [categories,setCategories]=useState([])
  const fetchCategories = async () => {
    try {
      const response = await api.get("api/category/getcategory");
      console.log(response);
      
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  

    const [brands, setBrands] = useState([]);
  
 

useEffect(() => {
  const fetchBrands = async () => {
    try {
      const response = await api.get("api/brand/getbrands");
      setBrands(response.data);  // assuming your API returns data in response.data
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  fetchBrands();
}, []);


  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Single state for all product fields
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
    quantity: "",
    discount: "",
    brand: "",
    unit: "",
    categories:"",
    tags: [],
    colors: [],
    image: [],
  });

  // UI states
  const [imagePreview, setImagePreview] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = Array.from(e.target.files);
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file[0]));
    }
  };

  // Tag management
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!product.tags.includes(tagInput.trim())) {
        setProduct((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Color management
  const handleColorKeyDown = (e) => {
    if (e.key === "Enter" && colorInput.trim()) {
      e.preventDefault();
      if (!product.colors.includes(colorInput.trim())) {
        setProduct((prev) => ({
          ...prev,
          colors: [...prev.colors, colorInput.trim()],
        }));
      }
      setColorInput("");
    }
  };
  const removeColor = (colorToRemove) => {
    setProduct((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading1(true)
    // Prepare multipart form data
    const formData = new FormData();
   for (const key in product) {
    if (key === "tags" || key === "colors") {
      formData.append(key, (product[key]));
    } else if (key === "image" && product?.image.length > 0) {
      product.image.forEach((file) => {
        formData.append("image", file); // match backend field name
      });
    } else {
      formData.append(key, product[key]);
    }
  }

   try {
  const response = await api.post("api/product", formData);
  console.log(response);
  const data = response.data;

  // Optional: check if backend explicitly sends error
  if (!data || data.error) {
    throw new Error("Failed to submit product");
  }

  setSuccessMessage("✅ Product added successfully!");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => setSuccessMessage(""), 3000);

  // Reset form
  setProduct({
    title: "",
    description: "",
    price: "",
    sku: "",
    quantity: "",
    discount: "",
    brand: "",
    unit: "",
    categories:"",
    tags: [],
    colors: [],
    image: null,
  });
  setImagePreview(null);
  setTagInput("");
  setColorInput("");
} catch (error) {
  console.error(error);
  alert("Error submitting product. Please try again.");
} finally {
  setIsLoading1(false);
}

  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start" style={{ marginLeft: "20px" }}>Add Product</h4>
              <a
                onClick={() => navigate("/Dashboard")}
                style={{ cursor: "pointer", textDecoration: "none" }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <h6
                  style={{
                    display: "inline",
                    color: isHovered1 ? "blue" : "black",
                    margin: 0,
                    opacity: 0.6,
                    fontSize: "13px",
                    marginLeft: "20px",
                  }}
                >
                  Home
                </h6>
              </a>
              <h6
                style={{
                  display: "inline",
                  marginLeft: "20px",
                  opacity: 0.6,
                  fontSize: "13px",
                }}
              >
                &#8226; Add Product
              </h6>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="container" style={{ backgroundColor: "#f1f5f9" }}>
              <div className="left">
                <div className="box" style={{ height: "300px", padding: "20px" }}>
                  <h4 style={{ fontWeight: 500 }}>General</h4>
                  <label htmlFor="titleInput">
                    Title<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    id="titleInput"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    className="input-highlight"
                    style={{
                      width: "100%",
                      height: "45px",
                      border: "1px solid #ebedef",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                    placeholder="Product title"
                    required
                  />
                  <p style={{ marginTop: "15px" }}>
                    <label htmlFor="descriptionInput">Description</label>
                    <br />
                    <textarea
                      id="descriptionInput"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      className="textarea-highlight"
                      style={{
                        width: "100%",
                        height: "100px",
                        padding: "8px",
                        boxSizing: "border-box",
                        resize: "none",
                        border: "1px solid #ebedef",
                        borderRadius: "4px",
                      }}
                      placeholder="Your description"
                    />
                  </p>
                </div>

                <div className="box" style={{ height: "250px", padding: "15px" }}>
                  <div style={{ display: "inline-flex", gap: "15px" }}>
                    <div>
                      <label htmlFor="priceInput">
                        Price<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        id="priceInput"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={handleChange}
                        className="input-price"
                        style={{
                          width: "95%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                        }}
                        placeholder="Product Price"
                        required
                      />
                      <br />
                      <span style={{ fontSize: "13px" }}>Set the base price of the product</span>
                    </div>
                    <div>
                      <label htmlFor="skuInput">
                        Sku<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        id="skuInput"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        className="input-sku"
                        style={{
                          width: "95%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                        }}
                        placeholder="SKU"
                        required
                      />
                      <br />
                      <span style={{ fontSize: "13px", marginLeft: "5px" }}>
                        Enter the product SKU.
                      </span>
                    </div>
                    <div>
                      <label htmlFor="quantityInput">
                        Quantity<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        id="quantityInput"
                        name="quantity"
                        type="number"
                        value={product.quantity}
                        onChange={handleChange}
                        className="input-quantity"
                        style={{
                          width: "100%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                        }}
                        placeholder="Quantity"
                        required
                      />
                      <br />
                      <span style={{ fontSize: "13px" }}>
                        Enter the product quantity.
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "15px" }}>
                    <label htmlFor="discountInput">Discount</label>
                    <br />
                    <input
                      id="discountInput"
                      name="discount"
                      type="number"
                      value={product.discount}
                      onChange={handleChange}
                      className="input-discount"
                      style={{
                        width: "30%",
                        height: "45px",
                        border: "1px solid #ebedef",
                        borderRadius: "4px",
                        padding: "8px",
                        boxSizing: "border-box",
                      }}
                      placeholder="Discount"
                    />
                    <br />
                    <span style={{ fontSize: "13px" }}>
                      Set the discount percentage
                    </span>
                  </div>
                </div>

                <div className="box" style={{ height: "150px", padding: "15px" }}>
                  <div style={{ display: "inline-flex", gap: "15px", width: "50%" }}>
                    <div>
                      <label htmlFor="brandSelect">Brands</label>
                      <br />
                      <select
                        id="brandSelect"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        className="select-brand"
                        style={{
                          width: "200%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select</option>
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                        <option value="puma">Puma</option>
                        <option value="reebok">Reebok</option>
                        <option value="reebok">Other</option>
                        {
                          brands.map((item)=>
                          (
                            <option>{item.name}</option>
                          ))
                        }
                      </select>
                      <br />
                      <span style={{ fontSize: "13px" }}>Set the product Brand.</span>
                    </div>
                  </div>
                  <div style={{ display: "inline-flex", width: "50%" }}>
                    <div>
                      <label htmlFor="unitInput">
                        Unit<span style={{ color: "red" }}> *</span>
                      </label>
                      <br />
                      <input
                        id="unitInput"
                        name="unit"
                        value={product.unit}
                        onChange={handleChange}
                        className="input-unit"
                        style={{
                          width: "150%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                        }}
                        placeholder="Product unit"
                        required
                      />
                      <br />
                      <span style={{ fontSize: "13px" }}>Set the unit of product.</span>
                    </div>
                  </div>
                </div>

                {/* <div className="box" style={{ height: "auto", padding: "15px" }}>
                  <ProductVariations />
                </div> */}

                <button type="submit" className="submit-button" style={{ marginTop: 20 }}>
                  Submit Product
                </button>
              </div>

              {/* Right side */}
              <div className="right">
                <div
                  className="box"
                  style={{ width: "270px", height: "310px", textAlign: "center" }}
                >
                  Upload image <br /> <br />
                  <img
                    src={imagePreview || Uploadimage}
                    alt="Upload Preview"
                    style={{ maxWidth: "75px" }}
                  />{" "}
                  <br />
                  <button
                    type="button"
                    style={{
                      backgroundColor: isHovered ? "blue" : "white",
                      color: isHovered ? "white" : "black",
                      borderRadius: "5px",
                      border: "1px solid #ebedef",
                      padding: "10px 20px",
                      marginTop: "10px",
                      width: "100%",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload Image
                  </button>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>

                <div
                  className="box"
                  style={{ width: "270px", height: "200px", textAlign: "center" }}
                >
                  Product Category

                     <div>
                
                      <br />
                      <select
                        id="brandSelect"
                        name="categories"
                        value={product.categories}
                        onChange={handleChange}
                        className="select-brand"
                        style={{
                          width: "100%",
                          height: "45px",
                          border: "1px solid #ebedef",
                          borderRadius: "4px",
                          padding: "8px",
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select</option>
                     {
                      categories.map((item)=>
                      (
                        <option>{item.name}</option>
                      ))
                     }
                      </select>
                      <br />
                      <span style={{ fontSize: "13px" }}>Set the product Category.</span>
                    </div>
                </div>

                <div
                  className="box"
                  style={{ width: "270px", height: "350px", textAlign: "Left" }}
                >
                  Product Tags
                  <br />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="input-tags"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      height: "45px",
                      border: "1px solid #ebedef",
                      borderRadius: "4px",
                      padding: "8px",
                      boxSizing: "border-box",
                    }}
                    placeholder="enter tags"
                  />
                  <br />
                  <i>press enter to add new tag</i>
                  <div style={{ marginTop: 8 }}>
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#007bff",
                          color: "white",
                          borderRadius: "12px",
                          padding: "5px 10px",
                          marginRight: "8px",
                          marginTop: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeTag(tag)}
                        title="Click to remove tag"
                      >
                        {tag} &times;
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="box"
                  style={{ width: "270px", height: "250px", textAlign: "Left" }}
                >
                  Product Color
                  <br />
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyDown={handleColorKeyDown}
                    className="input-color"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      height: "45px",
                      border: "1px solid #ebedef",
                      borderRadius: "4px",
                      padding: "8px",
                      boxSizing: "border-box",
                    }}
                    placeholder="enter color"
                  />
                  <br />
                  <i>press enter to add new color</i>
                  <div style={{ marginTop: 8 }}>
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        style={{
                          display: "inline-block",
                          backgroundColor: color.toLowerCase(),
                          color: color.toLowerCase() === "yellow" ? "black" : "gray",
                          borderRadius: "12px",
                          padding: "5px 10px",
                          marginRight: "8px",
                          marginTop: "8px",
                          cursor: "pointer",
                          border: "1px solid #ccc",
                        }}
                        onClick={() => removeColor(color)}
                        title="Click to remove color"
                      >
                        {color} &times;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {successMessage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "20px 40px",
                backgroundColor: "#e6ffe6",
                color: "green",
                border: "2px solid green",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              {successMessage}
            </div>
          </div>
        )}

        {/* Global styles for focus */}
        <style>{`
          .input-highlight:focus,
          .textarea-highlight:focus,
          .input-price:focus,
          .input-sku:focus,
          .input-quantity:focus,
          .input-discount:focus,
          .select-brand:focus,
          .input-unit:focus,
          .input-tags:focus,
          .input-color:focus {
            border: 1px solid blue !important;
            outline: none;
          }
        `}</style>
      </div>


      <>
  {isLoading1 && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(40,80,220,0.4) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        transition: "background 0.4s",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.10)",
          borderRadius: "24px",
          padding: "48px 72px",
          boxShadow: "0 12px 36px 0 rgba(0,0,0,0.35), 0 1.5px 8px 0 rgba(70,140,255,0.18)",
          border: "2.5px solid rgba(100,160,255,0.18)",
          borderImage: "linear-gradient(120deg, #6a82fb, #fc5c7d) 1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glowing border effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 1,
            boxShadow: "0 0 32px 8px #6a82fb55, 0 0 24px 6px #fc5c7d44",
            animation: "glow 2.2s ease-in-out infinite alternate",
          }}
        />
        {/* Lottie animation */}
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            height: "120px",
            width: "120px",
            marginBottom: "28px",
            filter: "drop-shadow(0 0 16px #6a82fb88)",
            zIndex: 2,
          }}
        />
        <div
          style={{
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "1.2px",
            color: "#fff",
            textShadow: "0 2px 12px #6a82fb77",
            zIndex: 2,
          }}
        >
          Uploading Product...
        </div>
        {/* Keyframes for glowing border */}
        <style>
          {`
            @keyframes glow {
              0% { box-shadow: 0 0 32px 8px #6a82fb55, 0 0 24px 6px #fc5c7d44; }
              100% { box-shadow: 0 0 48px 16px #fc5c7d77, 0 0 36px 12px #6a82fb66; }
            }
          `}
        </style>
      </div>
    </div>
  )}
</>


    </div>
  );
}

export default Addproduct;
