import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

// User Pages
import Home from "./pages/Home";
import AddRating from "./pages/AddRating";
import ViewRatings from "./pages/ViewRatings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import UpdatePassword from "./pages/UpdatePassword";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import AddUser from "./pages/admin/AddUser";
import UserDetails from "./pages/admin/UserDetails";
import ManageStores from "./pages/admin/ManageStores";
import AddStore from "./pages/admin/AddStore";



// System Admin Pages
import SystemAdminDashboard from "./pages/systemAdmin/SystemAdminDashboard";
import SAManageUsers from "./pages/systemAdmin/ManageUsers";
import SAAddUser from "./pages/systemAdmin/AddUser";
import SAManageStores from "./pages/systemAdmin/ManageStores";
import SAAddStore from "./pages/systemAdmin/AddStore";

// Store Owner Pages
  import StoreOwnerDashboard from "./pages/storeOwner/StoreOwnerDashboard";

import StoreOwnerUpdatePassword from "./pages/storeOwner/StoreOwnerUpdatePassword";

// Login Pages
import AdminLogin from "./pages/AdminLogin";
import SystemAdminLogin from "./pages/SystemAdminLogin";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const admin = JSON.parse(localStorage.getItem("admin") || "null");
  const systemAdmin = JSON.parse(localStorage.getItem("systemAdmin") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("systemAdmin");
    navigate("/login");
  };

  let dashboardLink = null;
  if (systemAdmin) dashboardLink = "/system-admin/dashboard";
  else if (admin) dashboardLink = "/admin/dashboard";
  else if (user) dashboardLink = "/dashboard";

  return (
    <nav
      style={{
        display: "flex",
        gap: "15px",
        padding: "10px 20px",
        background: "#333",
        color: "#fff",
        alignItems: "center"
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/add" style={{ color: "#fff", textDecoration: "none" }}>Add Rating</Link>
      <Link to="/view" style={{ color: "#fff", textDecoration: "none" }}>View Ratings</Link>
      <Link to="/stores" style={{ color: "#fff", textDecoration: "none" }}>Stores</Link>

      {!(user || admin || systemAdmin) && (
        <>
          <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
        </>
      )}

      {(user || admin || systemAdmin) && (
        <>
          <Link to={dashboardLink} style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
          <button
            onClick={handleLogout}
            style={{
              background: "#ff4444",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRating />} />
          <Route path="/view" element={<ViewRatings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/user/:id" element={<UserDetails />} />
          <Route path="/admin/manage-stores" element={<ManageStores />} />
          <Route path="/admin/add-store" element={<AddStore />} />

          {/* System Admin Routes */}
          <Route path="/system-admin/dashboard" element={<SystemAdminDashboard />} />
          <Route path="/system-admin/manage-users" element={<SAManageUsers />} />
          <Route path="/system-admin/add-user" element={<SAAddUser />} />
          <Route path="/system-admin/manage-stores" element={<SAManageStores />} />
          <Route path="/system-admin/add-store" element={<SAAddStore />} />

          {/* Store Owner Routes */}
         
<Route path="/storeOwner/StoreOwnerDashboard" element={<StoreOwnerDashboard />} />
          <Route path="/store-owner/update-password" element={<StoreOwnerUpdatePassword />} />


        


          {/* Login Pages */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/system-login" element={<SystemAdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
