import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  Heart,
  Compass,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3.5 shadow-sm border-slate-100"
          : "bg-white py-4.5 border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-brand-dark flex items-center">
                1Click<span className="text-primary">yatra</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
