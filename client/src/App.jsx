import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout.jsx";
import AdminLayout from "./components/Layout/adminLayout.jsx";
import {Toaster} from "sonner"
function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* User Layout */}
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Admin Layout */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
