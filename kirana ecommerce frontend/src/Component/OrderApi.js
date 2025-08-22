import React, { useState, useEffect } from 'react';

// Define the API base URL
const API_URL = "/api/user-order";  // Adjust based on your API path

const OrderApi = () => {
  const [dashboardAmount, setDashboardAmount] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [mostSellingCategory, setMostSellingCategory] = useState(null);
  const [recentOrders, setRecentOrders] = useState(null);
  const [allOrders, setAllOrders] = useState(null);
  const [singleOrder, setSingleOrder] = useState(null);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch Dashboard Data
  useEffect(() => {
    fetchData(`${API_URL}/dashboard-amount`, setDashboardAmount);
    fetchData(`${API_URL}/sales-report`, setSalesReport);
    fetchData(`${API_URL}/most-selling-category`, setMostSellingCategory);
    fetchData(`${API_URL}/dashboard-recent-order`, setRecentOrders);
  }, []);  // Empty dependency array to run on component mount

  // Fetch All Orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch("/api/order/orders");
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("Error fetching all orders: ", error);
    }
  };

  // Fetch Single Order
  const fetchSingleOrder = async (id) => {
    try {
      const response = await fetch(`/api/order/${id}`);
      const data = await response.json();
      setSingleOrder(data);
    } catch (error) {
      console.error("Error fetching single order: ", error);
    }
  };

  // Update Status (mutation equivalent)
  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/order/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
      const data = await response.json();
      // You can re-fetch data here if needed
      console.log("Order status updated", data);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Dashboard Amount</h2>
        <pre>{JSON.stringify(dashboardAmount, null, 2)}</pre>
      </div>
      <div>
        <h2>Sales Report</h2>
        <pre>{JSON.stringify(salesReport, null, 2)}</pre>
      </div>
      <div>
        <h2>Most Selling Category</h2>
        <pre>{JSON.stringify(mostSellingCategory, null, 2)}</pre>
      </div>
      <div>
        <h2>Recent Orders</h2>
        <pre>{JSON.stringify(recentOrders, null, 2)}</pre>
      </div>

      <div>
        <button onClick={fetchAllOrders}>Fetch All Orders</button>
        {allOrders && (
          <div>
            <h2>All Orders</h2>
            <pre>{JSON.stringify(allOrders, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => fetchSingleOrder("order_id")}>Fetch Single Order</button>
        {singleOrder && (
          <div>
            <h2>Single Order</h2>
            <pre>{JSON.stringify(singleOrder, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => updateOrderStatus("order_id", { status: "Shipped" })}>
          Update Order Status
        </button>
      </div>
    </div>
  );
};

export default OrderApi;
