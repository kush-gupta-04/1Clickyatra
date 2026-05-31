import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import "./App.css";
import WhatsAppCTA from "./component/layout/WhatsappCTA.jsx";

import Home from "./pages/Home.jsx";
import Packages from "./pages/Packages.jsx";
import Blogs from "./pages/Blogs.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

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

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* WhatsApp Call To Action */}
        <WhatsAppCTA />
      </div>
    </Router>
  );
}

export default App;
