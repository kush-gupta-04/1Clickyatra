import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
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
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Tours", path: "/packages" },
    { name: "Travel Blog", path: "/blogs" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3.0 shadow-sm border-slate-100"
          : "bg-white py-3.5 border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0 md:flex-1 md:flex md:justify-start">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-6.5 w-6.5 text-primary" />
              <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-tight text-brand-dark flex items-center">
                1Click<span className="text-primary">yatra</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:justify-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile / Auth Action */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {/* Wishlist Link */}
                <Link
                  to="/wishlist"
                  className="relative p-2 text-slate-600 hover:text-primary transition-colors duration-200"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  {user.wishlist && user.wishlist.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center h-4.5 w-4.5 text-[10px] font-bold leading-none text-white bg-brand-accent rounded-full">
                      {user.wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  >
                    {user.avatar ? (
                      <img
                        src={
                          user.avatar.startsWith("/uploads")
                            ? `http://localhost:5001${user.avatar}`
                            : user.avatar
                        }
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                        <User className="h-4 w-4 text-slate-500" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-slate-700 hover:text-primary max-w-[100px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white border border-slate-200 focus:outline-none">
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary font-medium"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2 text-slate-500" />
                          Admin Console
                        </Link>
                      )}
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary font-medium"
                      >
                        <User className="h-4 w-4 mr-2 text-slate-500" />
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50/40 font-medium cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-red-400" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/Login"
                  className="text-sm font-semibold text-slate-600 hover:text-primary hover:scale-110 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/Register"
                  className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-colors duration-200 rounded-md shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary focus:outline-none cursor-pointer"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 absolute w-full left-0 py-4 px-6 shadow-md">
          <div className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-semibold ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-4 flex flex-col space-y-3.5">
              {isAuthenticated && user ? (
                <>
                  <Link
                    to="/wishlist"
                    className="flex items-center text-base font-semibold text-slate-600 hover:text-primary"
                  >
                    <Heart className="h-5 w-5 mr-2 text-slate-400" />
                    Wishlist ({user.wishlist?.length || 0})
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center text-base font-semibold text-slate-600 hover:text-primary"
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2 text-slate-400" />
                      Admin Console
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="flex items-center text-base font-semibold text-slate-600 hover:text-primary"
                  >
                    <User className="h-5 w-5 mr-2 text-slate-400" />
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center text-left text-base font-semibold text-red-500"
                  >
                    <LogOut className="h-5 w-5 mr-2 text-red-400" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2.5">
                  <Link
                    to="/login"
                    className="w-full text-center py-2 border border-slate-200 rounded-md text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
