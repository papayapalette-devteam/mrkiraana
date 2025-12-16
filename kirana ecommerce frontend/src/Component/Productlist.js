import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import api from './api'
import Header from "./Header";
import Sidebar from "./sidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

function Productlist() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isHovered1, setIsHovered1] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);



const [page, setPage] = useState(1);
const [limit] = useState(10);
const [totalPages, setTotalPages] = useState(1);


  const fetchProducts = async () => {
    try {
      const response = await api.get(
      `api/product/getproduct?page=${page}&limit=${limit}`
    );
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

    useEffect(() => {
    fetchProducts();
  }, [page,limit]);

  const promptDelete = (product) => {
    setProductToDelete(product);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await api.delete(`api/product/products/${productToDelete._id}`);

      // if (!response.ok) {
      //   throw new Error("Failed to delete product");
      // }

      // Update UI
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setShowConfirmModal(false);
      setProductToDelete(null);

      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Failed to delete product.");
      setShowConfirmModal(false);
    }
  };

    // ================= Export to Excel =================
  const exportToExcel = () => {
    if (products.length === 0) {
      alert("No products to export!");
      return;
    }

    // Prepare data for export
    const exportData = products.map(p => ({
      Title: p.title,
      sku: p.sku,
      Quantity: p.quantity,
      Description:p.description,
      Unit: p.unit,
      Price: p.price,
      Discount: p.discount,
      Brand: p.brand,
      Categories: p.categories || "",    // as string
      Tags: (p.tags || []).flat().join(", "),
      Colors: (p.colors || []).flat().join(", "),
      CreatedAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    try {
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), "products.xlsx");
    } catch (e) {
      console.error(e);
    }
  };

  // ================= Import from Excel =================
  const[loading,setloading]=useState(false)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Map Excel rows to your product schema data
      const productsToUpload = jsonData.map(item => ({
        title: item.Title,
        description:item.Description,
        sku: item.Sku,
        quantity: Number(item.Quantity) || 0,
        unit: item.Unit || "",
        price: Number(item.Price) || 0,
        discount: Number(item.Discount) || 0,
        brand: item.Brand || "",
        categories: item.Categories || "",   // string

        // Convert comma separated tags/colors string to array of arrays
        tags: item.Tags
          ? item.Tags.split(",").map(s => [s.trim()])
          : [],
        colors: item.Colors
          ? item.Colors.split(",").map(s => [s.trim()])
          : [],
      }));

      try {
        setloading(true)
        const response = await api.post("api/product/bulkupload", { products: productsToUpload });

        if (response.status === 200) {
          Swal.fire({
            icon:"success",
            title:"product imported",
            text:"product imported successfully...",
            showConfirmButton:true
          }).then(()=>
          {
            window.location.reload()
          })
          
          fetchProducts();
        } else {
          alert("Failed to import products.");
        }
      } catch (error) {
        console.error("Import error:", error);
        alert("Error importing products.");
      }
      finally
      {
        setloading(false)
      }
    };
    reader.readAsArrayBuffer(file);
  };


  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start">Product</h4>

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
                  }}
                >
                  Home
                </h6>
              </a>
              <h6
                style={{
                  display: "inline",
                  marginLeft: "10px",
                  opacity: 0.6,
                  fontSize: "13px",
                }}
              >
                • Product List
              </h6>
            </div>
          </div>

      <div style={{display:"flex"}}>
    {/* Import / Export Buttons */}
          <div className="mb-3">
            <button className="btn btn-success me-2" onClick={exportToExcel}>
              <i className="fas fa-file-export me-2"></i>Export to Excel
            </button>
            
          </div>

               {/* Hidden file input */}
               <div>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="upload-excel"
            />
         <label
  htmlFor="upload-excel"
  className="btn btn-primary me-2 d-inline-flex align-items-center justify-content-center"
  style={{ cursor: loading ? "not-allowed" : "pointer" }}
>
  {loading ? (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      ></span>
      Importing...
    </>
  ) : (
    <>
      <i className="fas fa-file-import me-2"></i>
      Import from Excel
    </>
  )}
</label>

          </div>
          </div>

          <div
            className="container"
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginTop: "20px",
            }}
          >
           <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  }}
>
  <thead>
    <tr style={{ backgroundColor: "#f5f7fa" }}>
      {["S. No", "Product", "SKU", "QTY", "Unit", "Price", "Action"].map(
        (header) => (
          <th
            key={header}
            style={{
              padding: "12px 10px",
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "600",
              color: "#555",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            {header}
          </th>
        )
      )}
    </tr>
  </thead>

  <tbody>
    {products.length === 0 ? (
      <tr>
        <td
          colSpan="7"
          style={{
            padding: "14px",
            fontSize: "13px",
            textAlign: "center",
            color: "#888",
          }}
        >
          No products available.
        </td>
      </tr>
    ) : (
      products.map((product, index) => (
        <tr
          key={product._id || index}
          style={{
            borderBottom: "1px solid #f0f0f0",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f9fafb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          {/* S. No */}
          <td style={{ padding: "10px", fontSize: "13px", color: "#555" }}>
            {index + 1}
          </td>

          <td style={{ padding: "10px", fontSize: "13px" }}>
            {product.title}
          </td>
          <td style={{ padding: "10px", fontSize: "13px" }}>
            {product.sku}
          </td>
          <td style={{ padding: "10px", fontSize: "13px" }}>
            {product.quantity}
          </td>
          <td style={{ padding: "10px", fontSize: "13px" }}>
            {product.unit}
          </td>
          <td style={{ padding: "10px", fontSize: "13px", fontWeight: "600" }}>
            ₹{product.price}
          </td>

          {/* Actions */}
          <td style={{ padding: "10px", fontSize: "13px" }}>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/EditProduct", { state: { product } })}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => promptDelete(product)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
  <button
    className="btn btn-sm btn-secondary"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span className="align-self-center">
    Page {page} of {totalPages}
  </span>

  <button
    className="btn btn-sm btn-secondary"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

      </div>
      

      {/* Full-Screen Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h5>Are you sure?</h5>
            <p>This action will delete the product.</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Success Message */}
      {showSuccessMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 128, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px 40px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "green",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
            }}
          >
            ✅ Product deleted successfully
          </div>
        </div>
      )}
    </div>
  );
}

export default Productlist;
