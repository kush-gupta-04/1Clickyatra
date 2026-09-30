import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

//Layout Component
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer.jsx";
import WhatsAppCTA from "./component/layout/WhatsappCTA.jsx";

//Pages
import Home from "./pages/Home.jsx";
import Packages from "./pages/Packages.jsx";
import Blogs from "./pages/Blogs.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./component/routing/ProtectedRoute.jsx";

import CreatePackage from "./pages/admin/CreatePackage.jsx";
import CreateBlog from "./pages/admin/CreateBlog.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-luxury-dark text-slate-100 font-sans selection:bg-primary selection:text-luxury-dark">
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/packages/create" element={<CreatePackage />} />
              <Route path="/admin/blogs/create" element={<CreateBlog />} />
            </Route>

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* WhatsApp Call To Action */}
        <WhatsAppCTA />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
