import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SalesStatistics({ orders = [] }) {
  // State for selected time range
  const [timeRange, setTimeRange] = useState("day"); // "day" | "week" | "month"
  const [chartData, setChartData] = useState([]);

  // Helper: format date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().slice(0, 10);

  // Aggregate orders sales by day
  const aggregateByDay = (orders) => {
    const salesMap = {};

    orders.forEach(order => {
      const dateKey = formatDate(new Date(order.createdAt));
      const orderAmount = Number(order.total_amount) || 0;
      salesMap[dateKey] = (salesMap[dateKey] || 0) + orderAmount;
    });

    return Object.entries(salesMap)
      .map(([date, sales]) => ({
        date,
        sales: +((Number(sales) || 0).toFixed(2))
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Helper: get week number + year for a given date (ISO week number)
  const getWeekYear = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return [
      d.getFullYear(),
      1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
    ];
  };

  // Aggregate by ISO week
  const aggregateByWeek = (orders) => {
    const salesMap = {};

    orders.forEach(order => {
      const dateObj = new Date(order.createdAt);
      const [year, week] = getWeekYear(dateObj);
      const key = `${year}-W${week.toString().padStart(2, "0")}`;
      const orderAmount = Number(order.total_amount) || 0;
      salesMap[key] = (salesMap[key] || 0) + orderAmount;
    });

    return Object.entries(salesMap)
      .map(([week, sales]) => ({
        week,
        sales: +((Number(sales) || 0).toFixed(2))
      }))
      .sort((a, b) => {
        const [y1, w1] = a.week.split("-W").map(Number);
        const [y2, w2] = b.week.split("-W").map(Number);
        return y1 !== y2 ? y1 - y2 : w1 - w2;
      });
  };

  // Aggregate by month (YYYY-MM)
  const aggregateByMonth = (orders) => {
    const salesMap = {};

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      const orderAmount = Number(order.total_amount) || 0;
      salesMap[monthKey] = (salesMap[monthKey] || 0) + orderAmount;
    });

    return Object.entries(salesMap)
      .map(([month, sales]) => ({
        month,
        sales: +((Number(sales) || 0).toFixed(2))
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1));
  };

  // Update chart data based on timeRange
  useEffect(() => {
    if (!orders || orders.length === 0) {
      setChartData([]);
      return;
    }

    if (timeRange === "day") {
      const data = aggregateByDay(orders);
      setChartData(data.map(({ date, sales }) => ({ label: date, sales })));
    } else if (timeRange === "week") {
      const data = aggregateByWeek(orders);
      setChartData(data.map(({ week, sales }) => ({ label: week, sales })));
    } else if (timeRange === "month") {
      const data = aggregateByMonth(orders);
      setChartData(data.map(({ month, sales }) => ({ label: month, sales })));
    }
  }, [orders, timeRange]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "100%",
        backgroundColor: "white",
        marginTop: "30px",
        borderRadius: "6px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h5 style={{ textAlign: "left" }}>Sales Statistics</h5>

      {/* Time Range Selector */}
      <div style={{ marginBottom: "15px" }}>
        {["day", "week", "month"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            style={{
              marginRight: "10px",
              padding: "6px 14px",
              cursor: "pointer",
              backgroundColor: timeRange === range ? "#4F46E5" : "#E5E7EB",
              color: timeRange === range ? "#fff" : "#111",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Responsive Area Chart */}
      {chartData.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No sales data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              interval={Math.max(Math.floor(chartData.length / 7), 0)}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              fillOpacity={1}
              fill="url(#colorSales)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SalesStatistics;
