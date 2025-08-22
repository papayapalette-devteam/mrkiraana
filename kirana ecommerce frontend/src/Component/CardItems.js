
import React, { useState, useEffect } from "react";
import { MonthSale, Received, Sales, TotalOrders } from "../Component/Icons";
import ErrorMsg from "../Component/ErrorMsg";

// The DashboardOrderAmount type and IPropType type are removed because they are TypeScript-specific.

// CardItem component accepts props without type annotations
function CardItem({ title, amount, icon, clr2 }) {
  return (
    <div className="widget-item bg-white p-6 flex justify-between rounded-md">
      <div>
        <h4 className="text-xl font-semibold text-slate-700 mb-1 leading-none">
          {amount}
        </h4>
        <p className="text-tiny leading-4">{title}</p>
      </div>
      <div>
        <span
          className={`text-lg text-white rounded-full flex items-center justify-center h-12 w-12 shrink-0 ${clr2}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

// Main component that fetches and displays the dashboard order amount
const CardItems = () => {
  const [dashboardOrderAmount, setDashboardOrderAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDashboardAmount = async () => {
      try {
        const response = await fetch("/api/user-order/dashboard-amount");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDashboardOrderAmount(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching dashboard amount:", error);
      }
    };

    fetchDashboardAmount();
  }, []);

  let content = null;

  if (isLoading) {
    content = <div className="spinner">Loading...</div>; // Add a spinner or loading indicator here
  }

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error fetching the data." />;
  }

  if (!isLoading && !isError && dashboardOrderAmount) {
    content = (
      <>
        <CardItem
          title="Today Orders"
          amount={dashboardOrderAmount.todayOrderAmount || 0}
          icon={<Received />}
          clr2="bg-success"
        />
        <CardItem
          title="Yesterday Orders"
          amount={dashboardOrderAmount.yesterdayOrderAmount || 0}
          icon={<Sales />}
          clr2="bg-purple"
        />
        <CardItem
          title="Monthly Orders"
          amount={dashboardOrderAmount.monthlyOrderAmount || 0}
          icon={<MonthSale />}
          clr2="bg-info"
        />
        <CardItem
          title="Total Orders"
          amount={dashboardOrderAmount.totalOrderAmount.toFixed(2)}
          icon={<TotalOrders />}
          clr2="bg-warning"
        />
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {content}
    </div>
  );
};

export default CardItems;
