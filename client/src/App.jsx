import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import AdminLayout from "./components/Layout/adminLayout.jsx";
import Home from "./pages/Home.jsx";
import {Toaster} from "sonner"

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout/>} >
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Route>
            {/* <Route>Admin Layout</Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
