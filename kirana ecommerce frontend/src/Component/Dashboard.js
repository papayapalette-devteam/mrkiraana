import React, { useState,useEffect,useMemo } from "react";
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
import SalesStatistics from "./Sales";
import api from './api';


function Dashboard() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navigate = useNavigate();

   const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    todayOrders: 0,
    yesterdayOrders: 0,
    monthlyOrders: 0,
    totalOrders: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndCalculateStats = async () => {
      try {
        const response = await api.get("api/user/viewallorders");
        const allOrders = response.data;  // assuming array of orders

        setOrders(allOrders);

        // Initialize counters
        let todayOrders = 0;
        let yesterdayOrders = 0;
        let monthlyOrders = 0;

        // Get now and calculate date ranges for today, yesterday, this month
        const now = new Date();

        // Start and end of today
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

        // Start and end of yesterday
        const yesterdayDate = new Date(startOfToday);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const startOfYesterday = new Date(yesterdayDate.getFullYear(), yesterdayDate.getMonth(), yesterdayDate.getDate());
        const endOfYesterday = new Date(yesterdayDate.getFullYear(), yesterdayDate.getMonth(), yesterdayDate.getDate(), 23, 59, 59, 999);

        // Start and end of this month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // For sales data (last 7 days), create array with date and sales sum
        const salesLast7Days = [];
        for (let i = 6; i >= 0; i--) {
          const day = new Date(startOfToday);
          day.setDate(day.getDate() - i);
          salesLast7Days.push({
            date: day.toISOString().split("T")[0], // yyyy-mm-dd
            sales: 0,
          });
        }

        // Iterate all orders to accumulate stats
        allOrders.forEach(order => {
          const createdAt = new Date(order.createdAt);

          // Check if order in today
          if (createdAt >= startOfToday && createdAt <= endOfToday) {
            todayOrders++;
          }

          // Check if order in yesterday
          if (createdAt >= startOfYesterday && createdAt <= endOfYesterday) {
            yesterdayOrders++;
          }

          // Check if order in this month
          if (createdAt >= startOfMonth && createdAt <= endOfMonth) {
            monthlyOrders++;
          }

          // Add sales for last 7 days
          for (let dayData of salesLast7Days) {
            if (dayData.date === createdAt.toISOString().split("T")[0]) {
              dayData.sales += order.total_amount || 0;
              break;
            }
          }
        });

        setStats({
          todayOrders,
          yesterdayOrders,
          monthlyOrders,
          totalOrders: allOrders.length,
        });

        setSalesData(salesLast7Days);
      } catch (error) {
        console.error("Failed to fetch or process orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndCalculateStats();
  }, []);



function MostSellingProducts() {
  const mostSelling = useMemo(() => {
    const productMap = {};

    orders.forEach((order) => {
      if (Array.isArray(order.order_details)) {
        order.order_details.forEach((item) => {
          const title = item.title || "Unknown Product";
          const qty = Number(item.product_quantity) || 0;
          const price = Number(item.price) || 0;

          if (!productMap[title]) {
            productMap[title] = { totalQuantity: 0, totalSales: 0 };
          }
          productMap[title].totalQuantity += qty;
          productMap[title].totalSales += qty * price;
        });
      }
    });

    return Object.entries(productMap)
      .map(([title, stats]) => ({
        title,
        totalQuantity: stats.totalQuantity,
        totalSales: stats.totalSales,
      }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10);
  }, [orders]);

  if (orders.length === 0) {
    return <p>No orders data available to show most selling products.</p>;
  }

  if (!mostSelling.length) {
    return <p>No product sales found.</p>;
  }

  return (
    <div className="table-responsive">
      <h4>Most Selling Products</h4>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product Title</th>
            <th>Total Quantity Sold</th>
            <th>Total Sales (₹)</th>
          </tr>
        </thead>
        <tbody>
          {mostSelling.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.totalQuantity}</td>
              <td>{product.totalSales.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




  return (
    <div className="d-flex">
    <Sidebar/>

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-20px" }}>
        <div className="body-content px-4 py-4 "  style={{ backgroundColor: '#f1f5f9' }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              {/* <Header /> */}
              <h3 className="mb-0 text-start">Dashboard</h3>
              <p className="text-muted m-0 text-start">
                Welcome to your dashboard
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="d-flex gap-3">
            {/* Card 1 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{stats.todayOrders}</h5>
                  <img src={Icon1} alt="Icon1" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Today's order
                </h6>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{stats.yesterdayOrders}</h5>
                  <img
                    src={Graphimage}
                    alt="Graph"
                    style={{ maxWidth: "40px" }}
                  />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Yesterday orders
                </h6>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{stats.monthlyOrders}</h5>
                  <img src={User} alt="User" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Monthly orders
                </h6>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{stats.totalOrders}</h5>
                  <img src={Cube} alt="Cube" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Total orders
                </h6>
              </div>
            </div>
          </div>

          {/* Sales Statistics Section */}
         <div
  style={{
    fontFamily: "Arial, sans-serif",
    paddingBottom: "30px",
    maxWidth: "100%",
    height: "20%",
    backgroundColor: "white",
    marginTop: "10px",
    borderRadius: "6px",
    overflow: "hidden",      // <--- clip children inside rounded corners
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"  // optional, to better see the edges
  }}
>
 <SalesStatistics orders={orders} />

</div>


       

              {MostSellingProducts()}

        </div>


        {/* <div className="recent-orders"style={{
    backgroundColor: "white", borderRadius:"10px",marginLeft:"20px"
  
  }} overflow="auto">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="mb-0" style={{ marginLeft: "10px",padding:"5px" }}>Recent Orders</h5>

    <a href="#" className="text-primary">View All</a>
  </div>

  {/* Scrollable container 
  <div style={{ maxHeight: "100px", overflow: "auto" ,fontSize:'12px',marginLeft:"20PX",opacity:"0.3"}}>
   <table 
  className="table table-hover" 
  style={{ 
    borderTop: "none", 
    borderLeft: "none", 
    borderRight: "none", 
    borderBottom: "1px solid black", 
    minWidth: "900px" 
  }}
>
      <thead className="table-light" style={{  top: 0, backgroundColor: "white", zIndex: 1 }}>
        <tr style={{backgroundColor:"white"}}>
          <th>INVOICE NO</th>
          <th>ORDER TIME</th>
          <th>CUSTOMER NAME</th>
          <th>PRICE</th>
          <th>STATUS</th>
          <th>ACTION</th>
          <th>INVOICE</th>
        </tr>
      </thead>
      <tbody>
       
      </tbody>
    </table>
  </div>

  <div className="text-start text-muted mt-2" style={{ marginLeft: "20px" }}>
  Showing 1–0 of 0
</div>

</div> */}


        
       
      </div>
    </div>
  );
}

export default Dashboard;
