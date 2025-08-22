import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo1 from "../logo3.png";
import Header from "./Header";
import Icon1 from "../Icon1 (1).png";
import Graphimage from "../Graphimage.png";
import User from "../User.png";
import Cube from "../Cube.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Uploadimage from "../Uploadimage.png";
import api from './api'
import ProductVariations from "./Addimage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function EditProduct() {
  const navigate = useNavigate();

  // Hover states for buttons/links
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);


  const [successMessage, setSuccessMessage] = useState(""); // ✅ For success message


  const location = useLocation();
const product = location.state?.product; // Safely access passed product


        useEffect(() => {
    fetchCategories();
  }, []);

  const [allcategories,setallcategories]=useState([])
  const fetchCategories = async () => {
    try {
      const response = await api.get("api/category/getcategory");
      setallcategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const[allbrands,setallbrands]=useState([])
    useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("api/brand/getbrands");
        setallbrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Image upload and preview
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
  if (product) {
    setTitle(product.title || "");
    setDescription(product.description || "");
    setPrice(product.price || "");
    setSku(product.sku || "");
    setQuantity(product.quantity || "");
    setDiscount(product.discount || "");
    setBrand(product.brand || "");
    setUnit(product.unit || "");
    setTags(product.tags || []);
    setColors(product.colors || []);
    // If image URL is passed
    setImagePreview(product.image || []);
    setcategories(product.categories || "")
    setImageFile(product.image || [])
  }
}, [product]);



  

 const handleFileChange = (event) => {
  const file = Array.from(event.target.files);
  if (file) {
    setImageFile(file[0]);
    setImagePreview(URL.createObjectURL(file[0]));
  }
};


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Controlled input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState("");
  const [unit, setUnit] = useState("");
 const [categories, setcategories] = useState("");
  // Tags management
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  console.log(product);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Colors management
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const handleColorKeyDown = (e) => {
    if (e.key === "Enter" && colorInput.trim()) {
      e.preventDefault();
      if (!colors.includes(colorInput.trim())) {
        setColors([...colors, colorInput.trim()]);
      }
      setColorInput("");
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  // Submit handler
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("sku", sku);
  formData.append("quantity", quantity);
  formData.append("discount", discount);
  formData.append("brand", brand);
  formData.append("unit", unit);
  formData.append("categories", categories);
  formData.append("tags", tags);
  formData.append("colors", colors);
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await api.put(`api/product/products/${product._id}`,formData);
console.log(response);

    // if (!response.ok) {
    //   throw new Error("Failed to submit product");
    // }

    const data = await response.data;
    console.log("Product saved:", data);
   





    

    // ✅ Show success message
   setSuccessMessage("✅The product was updated successfully.!");
window.scrollTo({ top: 0, behavior: "smooth" });
setTimeout(() => setSuccessMessage(""), 3000);

    // ✅ Reset form fields
    setTitle("");
    setDescription("");
    setPrice("");
    setSku("");
    setQuantity("");
    setDiscount("");
    setBrand("");
    setUnit("");
    setTags([]);
    setTagInput("");
    setColors([]);
    setColorInput("");
    setImageFile(null);
    setImagePreview(null);

    // Optional: navigate after delay
    // setTimeout(() => navigate("/Dashboard"), 1500);
  } catch (error) {
    console.error("Error submitting product:", error);
    alert("Error submitting product. Please try again.");
  }
};



  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
       {successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}



        <div
          className="body-content px-4 py-4"
          style={{ backgroundColor: "#f1f5f9" }}
        >
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start" style={{ marginLeft: "20px" }}>
                Update Product
              </h4>

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
                &#8226; Update Product
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                      <span style={{ fontSize: "13px" }}>
                        Set the base price of the product
                      </span>
                    </div>

                    <div>
                      <label htmlFor="skuInput">
                        Sku<span style={{ color: "red" }}> *</span>
                      </label>
                      <input
                        id="skuInput"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
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
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
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
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
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
                        <option>{brand}</option>
                        <option value="">Select</option>
                        <option value="nike">Nike</option>
                        <option value="adidas">Adidas</option>
                        <option value="puma">Puma</option>
                        <option value="reebok">Reebok</option>
                        {
                          allbrands.map((item)=>
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
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
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
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </button>

                  <input
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

                       <select
                        id="brandSelect"
                        name="categories"
                        value={categories}
                        onChange={(e)=>setcategories(e.target.value)}
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
                        <option value="">{categories}</option>
                     {
                      allcategories.map((item)=>
                      (
                        <option>{item.name}</option>
                      ))
                     }
                      </select>
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
                  <div style={{ marginTop: 8, }}>
                    {tags.map((tag) => (
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
                    {colors.map((color) => (
                      <span
                        key={color}
                        style={{
                          display: "inline-block",
                          // backgroundColor: color?.toLowerCase() || "transparent",
                          color: "gray",
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

      
    </div>
  );
}

export default EditProduct;
