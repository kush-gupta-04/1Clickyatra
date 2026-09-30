import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  ArrowRight,
} from "lucide-react";
import { logout } from "../store/slices/authSlice";
import API from "../api/axios";

const UserDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
    dispatch(logout());
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-800">
              Welcome back, {user.name.split(" ")[0]}!
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Manage your bookings, wishlist, and profile settings.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-md transition-colors text-sm font-semibold"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Account Details</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Full Name
                    </p>
                    <p className="text-slate-800 font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-slate-800 font-medium">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-slate-800 font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-primary/5 rounded-xl border border-primary/10 p-6">
              <h3 className="font-bold text-primary-dark mb-2">
                Need Inspiration?
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Explore our curated travel packages and discover your next
                adventure.
              </p>
              <Link
                to="/packages"
                className="inline-flex items-center space-x-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                <span>Browse Packages</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Bookings & Wishlist */}
          <div className="md:col-span-2 space-y-6">
            {/* Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>My Bookings</span>
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-slate-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">
                          {booking.package?.title || "Unknown Package"}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                          Booking ID:{" "}
                          <span className="text-slate-700">
                            {booking._id.slice(-6).toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                          Date:{" "}
                          <span className="text-slate-700">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                          ${
                            booking.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : booking.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : booking.status === "cancelled"
                                  ? "bg-rose-100 text-rose-700"
                                  : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <span className="text-lg font-bold text-slate-800 mt-2">
                          ₹
                          {booking.totalPrice?.toLocaleString() ||
                            booking.package?.price?.toLocaleString() ||
                            "0"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                  <Calendar className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">
                    You have no upcoming bookings.
                  </p>
                  <Link
                    to="/packages"
                    className="mt-4 inline-block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-md transition-colors text-sm"
                  >
                    Explore Destinations
                  </Link>
                </div>
              )}
            </div>

            {/* Wishlist Placeholder */}
            {user.wishlist && user.wishlist.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Saved Trips</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.wishlist.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-100 rounded-lg p-4 flex items-center space-x-4"
                    >
                      {/* This could map to actual package data if populated */}
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">
                          Saved Destination {idx + 1}
                        </p>
                        <Link
                          to="/packages"
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
