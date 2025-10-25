import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import {Toaster} from "sonner"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import ProductDetails from "./components/Products/ProductDetails.jsx";
import CheckOut from "./components/Cart/CheckOut.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import MyOrderPage from "./pages/MyOrderPage.jsx";
import Notfound from "./pages/Notfound.jsx";
import AdminHomePage from "./components/Admin/AdminHomePage.jsx";
import UserManagement from "./components/Admin/UserManagement.jsx";

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout/>} >
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/collections/:collection" element={<CollectionPage/>} />
            <Route path="product/:id" element={<ProductDetails/>} />
            <Route path="/checkout" element= {<CheckOut/>} />
            <Route path="/order-confirmation" element={<OrderConfirmation/>}/>
            <Route path="/order/:id" element={<OrderDetailsPage/>} />
            <Route path="/my-orders" element={<MyOrderPage/>}/>

        </Route>
            <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<AdminHomePage/>}/>
                <Route path="users" element={<UserManagement/>}/>
            </Route>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
