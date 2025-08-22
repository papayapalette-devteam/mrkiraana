import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, Button,Dropdown, ButtonGroup } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./Header";
import api from './api';
import Swal from "sweetalert2";

function Order() {
  const navigate = useNavigate();

  const [allorders, setAllorders] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order details

    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;


  // Fetch all orders
  const getallorders = async () => {
    try {
      const resp = await api.get('api/user/viewallorders');
      setAllorders(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallorders();
  }, []);

  // Open offcanvas and set selected order
  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowOffcanvas(true);
  };

  // Close offcanvas
  const handleClose = () => {
    setShowOffcanvas(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (order) => {
  // Example: Prompt to update status - you can implement a modal or any UI here
  const newStatus = prompt(`Update status for Order ${order.order_id}`, order.status || 'Pending');
  if (newStatus) {
    // Make API call to update status (example)
    // await api.post('/api/user/updatestatus', { orderId: order._id, status: newStatus });

    // For demo, just alert success
    alert(`Order ${order.order_id} status updated to "${newStatus}"`);

    // Optionally refresh order list to show update after API call
  }
};

 // Pagination calculations
  const totalPages = Math.ceil(allorders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = [...allorders]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(indexOfFirstOrder, indexOfLastOrder);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };


  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
const [invoiceOrder, setInvoiceOrder] = useState(null);

const handleGenerateInvoice = (order) => {
  setInvoiceOrder(order);
  setShowInvoiceModal(true);
};

const handleCloseInvoiceModal = () => {
  setShowInvoiceModal(false);
  setInvoiceOrder(null);
};

// For Print
const handlePrintInvoice = () => {
  window.print();
};

const COMPANY_INFO = {
  name: "Mr. Kiraana",
  address: "123, Main Street, City, State - 123456",
  email: "contact@company.com",
  phone: "+91-12345-67890",
  gst: "27AAECS1234F1ZH"
};


// const [lastOrderCheck, setLastOrderCheck] = useState(Date.now());
const [newOrderNotification, setNewOrderNotification] = useState(null);
const [showToast, setShowToast] = useState(false);

useEffect(() => {
  const interval = setInterval(checkForNewOrders, 15000); // 15 seconds
  return () => clearInterval(interval);
}, [allorders]);

const checkForNewOrders = async () => {
  try {
    const resp = await api.get('api/user/viewallorders');
    // Compare new fetched orders with previous orders
    if (resp.data.length > allorders.length) {
      // Detect the new orders
      const existingIds = new Set(allorders.map(order => order._id));
      const newOrder = resp.data.find(order => !existingIds.has(order._id));
      if (newOrder) {
        setNewOrderNotification(newOrder);
        setShowToast(true);
      }
    }
    // Optionally update your orders, or leave for main fetch
    setAllorders(resp.data);
  } catch (err) {
   console.log(err);
   
  }
};

const handleRemoveOrder = async (orderId) => {
  try {
    const resp =await api.delete(`api/user/deleteorder/${orderId}`);
    if(resp.status===200)
    {
      Swal.fire({
        icon:"success",
        title:"order deleted",
        text:"order deleted successfully",
        showConfirmButton:true
      }).then(()=>
      {
        window.location.reload()
      })
    }
  } catch (error) {
    console.error('Failed to remove order:', error);
  }
};



  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start"> Orders</h4>
              <a
                onClick={() => navigate("/Dashboard")}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <h6 style={{ display: "inline", color: "black", margin: 0, opacity: 0.6, fontSize: "13px" }}>
                  Home
                </h6>
              </a>
              <h6 style={{ display: "inline", marginLeft: "10px", opacity: 0.6, fontSize: "13px" }}>
                &#8226; Order List
              </h6>
            </div>
          </div>

          <div className="container" style={{ width: "100%", backgroundColor: "#f1f5f9", marginTop: "20px" }}>

            {/* Orders Table */}
            <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
              <div style={{ padding: "10px", marginTop: "20px", }}>
                <table
                  style={{
                    minWidth: "1000px",
                    borderCollapse: "collapse",
                    width: "100%",
                    borderBottom: "0px solid rgba(0, 0, 0, 0.2)",
                    marginTop: "10px",
                    marginLeft: "10px",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        opacity: 0.6,
                        fontSize: "12px",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <th style={{ textAlign: "left", whiteSpace: "nowrap" }}>ORDER NO</th>
                      <th style={{ textAlign: "left", paddingLeft: "0px" }}>CUSTOMER</th>
                      <th style={{ textAlign: "left", paddingLeft: "0px" }}>QTY</th>
                      <th style={{ textAlign: "left", paddingLeft: "0px" }}>TOTAL</th>
                      <th style={{ textAlign: "left", paddingLeft: "0px" }}>STATUS</th>
                      <th style={{ textAlign: "left", paddingLeft: "0px" }}>ACTION</th>
                      {/* <th style={{ textAlign: "left", paddingLeft: "0px" }}>INVOICE</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      currentOrders.sort().map((item) => (
                        <tr key={item._id} style={{ fontSize: "16px" }}>
                          <td>{item.order_id}</td>
                          <td>{item.firstName} {item.lastName}</td>
                          <td>
                            {/* Sum of quantities in order_details */}
                            {item.order_details?.reduce((acc, curr) => acc + curr.product_quantity, 0)}
                          </td>
                          <td>{item.total_amount}</td>
                          <td>{item.status || 'Pending' /* or your status field */}</td>
                     



<td>
  <Dropdown as={ButtonGroup} >
    <Dropdown.Toggle variant="primary" size="sm" id={`dropdown-${item._id}`}>
      Actions
    </Dropdown.Toggle>

    <Dropdown.Menu style={{ marginTop: '-5px' }}>
      <Dropdown.Item onClick={() => handleViewClick(item)}>
        <i className="fas fa-eye me-2"></i>View
      </Dropdown.Item>

      <Dropdown.Item onClick={() => handleUpdateStatus(item)}>
        <i className="fas fa-edit me-2"></i>Update Status
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleGenerateInvoice(item)}>
        <i className="fas fa-file-invoice me-2"></i>Generate Invoice
      </Dropdown.Item>
     <Dropdown.Item onClick={() => handleRemoveOrder(item._id)}>
  <i className="fas fa-trash me-2"></i>Remove Order
  </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</td>

                          {/* <td>{item.invoice || "-"}</td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

              </div>
             
            </div>
            
          </div>
        </div>
            <nav aria-label="Order pagination" className="d-flex justify-content-center mt-3" style={{marginLeft:"70%"}}>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={goToPrevPage} aria-label="Previous">
                        &laquo;
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button className="page-link" onClick={() => paginate(page)}>
                            {page}
                          </button>
                        </li>
                      );
                    })}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={goToNextPage} aria-label="Next">
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
      </div>

      {/* Offcanvas for order details */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="end"
        scroll={true}
        backdrop={true}
        style={{ width: "420px", maxWidth: "100vw" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Order Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!selectedOrder ? (
            <p>Loading...</p>
          ) : (
            <div>
              {/* Customer & Shipping Info */}
              <h5>Customer Info</h5>
              <p><strong>Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
              <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.postcode}</p>
              <p><strong>Email:</strong> {selectedOrder.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
              <p><strong>Shipping:</strong> {selectedOrder.shipping}</p>
              <p><strong>Payment:</strong> {selectedOrder.payment}</p>

              <hr />

              {/* Products Ordered */}
              <h5>Order Items</h5>
              {selectedOrder.order_details && selectedOrder.order_details.length > 0 ? (
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.order_details.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{item.product_quantity}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td>₹{(item.price * item.product_quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No products found.</p>
              )}

              <hr />
              <h5>Total Amount: ₹{selectedOrder.total_amount}</h5>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>



<Modal
  show={showInvoiceModal}
  onHide={handleCloseInvoiceModal}
  size="lg"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Invoice</Modal.Title>
    <button className="btn btn-outline-secondary btn-sm ms-3 d-print-none" onClick={handlePrintInvoice}>
      <i className="fas fa-print"></i> Print
    </button>
  </Modal.Header>
  <Modal.Body>
    {/* Render invoice only if invoiceOrder is truthy */}
    {invoiceOrder && (
      <div style={{ padding: 30, background: "#fdfdfd", color: "#222" }}>
        {/* Company Details */}
        <div style={{ borderBottom: "2px solid #4F46E5", marginBottom: 16, paddingBottom: 12 }}>
          <h3 style={{ color: "#4F46E5" }}>{COMPANY_INFO.name}</h3>
          <div style={{ fontSize: 13 }}>{COMPANY_INFO.address}</div>
          <div style={{ fontSize: 13 }}>GST: {COMPANY_INFO.gst}</div>
          <div style={{ color: "#606060", fontSize: 13 }}>{COMPANY_INFO.email} | {COMPANY_INFO.phone}</div>
        </div>
        {/* Bill To (Customer) */}
        <div style={{ marginBottom: 24 }}>
          <h5 style={{ fontWeight: 600 }}>Bill To:</h5>
          <div><strong>{invoiceOrder.firstName} {invoiceOrder.lastName}</strong></div>
          <div>{invoiceOrder.address}, {invoiceOrder.city}, {invoiceOrder.state} - {invoiceOrder.postcode}</div>
          <div>{invoiceOrder.email} | {invoiceOrder.phone}</div>
        </div>
        <div style={{ marginBottom: 12, display: "flex", gap: 40, fontSize: 13 }}>
          <span><strong>Invoice #:</strong> INV-{invoiceOrder.order_id}</span>
          <span><strong>Date:</strong> {invoiceOrder.createdAt ? invoiceOrder.createdAt.split('T')[0] : ''}</span>
          {/* <span><strong>Status:</strong> {invoiceOrder.status || "Pending"}</span> */}
        </div>
        {/* Products */}
        <table className="table table-bordered mt-3" style={{ fontSize: 14, background: "#fff" }}>
          <thead style={{ background: "#ddd" }}>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceOrder.order_details && invoiceOrder.order_details.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.product_quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{(item.price * item.product_quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Totals */}
        <div style={{ textAlign: "right", marginTop: 10, fontSize: 16 }}>
          <strong>Grand Total: ₹{invoiceOrder.total_amount}</strong>
        </div>
        {/* Footer/Notes */}
        <div style={{ borderTop: "1px dashed #bbb", marginTop: 30, paddingTop: 12, fontSize: 13, color: "#767676" }}>
          Thank you for your order!<br />
          For help, contact us at {COMPANY_INFO.email}
        </div>
      </div>
    )}
  </Modal.Body>
</Modal>


<ToastContainer position="top-end" className="p-3">
  <Toast
    onClose={() => setShowToast(false)}
    show={showToast}
    bg="success"
    delay={6000}
  >
    <Toast.Header>
      <strong className="me-auto">New Order Received</strong>
    </Toast.Header>
    <Toast.Body>
      {newOrderNotification ? (
        <div>
          <b>Order #{newOrderNotification.order_id}</b> received from {newOrderNotification.firstName} {newOrderNotification.lastName}.
        </div>
      ) : null}
    </Toast.Body>
  </Toast>
</ToastContainer>

    </div>
  );
}

export default Order;
