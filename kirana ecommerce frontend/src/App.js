import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addproduct from "./Component/Addproduct";
import Productlist from "./Component/Productlist";
import Productgrid from "./Component/Productgrid";
import Category from "./Component/Category";
import Order from "./Component/Order";
import Brand from "./Component/Brand";
import Coupons from "./Component/Coupons";
import Profile from "./Component/Profile";
import Ourstaff from "./Component/Ourstaff";
import RegisterForm from "./Component/Register";
import LoginForm from "./Component/LoginForm";
import ResetPassword from "./Component/ResetPassword";
import EditProduct from "./Component/EditProduct";
import DeleteProduct from "./Component/DeleteProduct";
import SetNewPassword from "./Component/SetNewPassword";
import Header from "./Component/user/header";
import Userhomepage from "./Component/user/userhomepage";
import ViewCart from "./Component/user/viewcart";
import Checkout from "./Component/user/checkout";
import Sidebar from "./Component/sidebar";
import UserProfileUpdate from "./Component/user/userprofileupdate";
import MyOrders from "./Component/user/myorders";
import ProductDetailPage from "./Component/user/productdetails";
import CategoryProductsList from "./Component/user/allproducts";
import AuthGuard from "./Component/user/authguard";
import CustomerList from "./Component/allcustomerslist";
import AboutUs from "./Component/user/aboutus";




function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Userhomepage />}></Route>
           <Route path="/registration" element={<RegisterForm />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Addproduct" element={<Addproduct />}></Route>
          <Route path="/Productlist" element={<Productlist />}></Route>
          <Route path="/Home" element={<AuthGuard><Dashboard /></AuthGuard>}></Route>
          <Route path="/Productgrid" element={<Productgrid />}></Route>
          <Route path="/Category" element={<Category />}></Route>
          <Route path="/Order" element={<Order />}></Route>
          <Route path="/Brand" element={<Brand />}></Route>
          <Route path="/Coupons" element={<Coupons />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/Ourstaff" element={<Ourstaff />}></Route>
          <Route path="/RegisterForm" element={<RegisterForm />}></Route>
          <Route path="/LoginForm" element={<LoginForm />}></Route>
          <Route path="/ResetPassword" element={<ResetPassword />}></Route>
          <Route path="/EditProduct" element={<EditProduct />}></Route>
          <Route path="/DeleteProduct" element={<DeleteProduct />}></Route>
          <Route path="/Setpassword" element={<SetNewPassword />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/updateuserprofile" element={<UserProfileUpdate />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/productdetails/:id" element={<ProductDetailPage />} />
          <Route path="/allproducts/:category" element={<CategoryProductsList />} />
          <Route path="/allcustomers" element={<CustomerList />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>  
  
      </BrowserRouter>
    </div>
  );
}

export default App;
