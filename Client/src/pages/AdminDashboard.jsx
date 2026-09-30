import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  Users,
  Map,
  Calendar,
  DollarSign,
  Settings,
  ArrowRight,
} from "lucide-react";
import { logout } from "../store/slices/authSlice";
import API from "../api/axios";

const AdminDashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="font-serif text-3xl font-bold text-slate-800">
                Admin Control Panel
              </h1>
              <span className="bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Admin
              </span>
            </div>
            <p className="text-slate-500 mt-1 font-medium text-sm">
              Overview of 1clickYatra's platform metrics and operations.
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Total Users
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    {stats?.totalUsers || 0}
                  </p>
                </div>
              </div>

              {/* Total Packages */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Map className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Packages
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    {stats?.totalPackages || 0}
                  </p>
                </div>
              </div>

              {/* Total Bookings */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Bookings
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    {stats?.totalBookings || 0}
                  </p>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Revenue
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    ₹{stats?.totalRevenue?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            {/* Management Modules */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>Quick Management</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Manage Packages */}
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-5 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-md">
                      <Map className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800">Manage Packages</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Add, edit, or delete travel destinations.
                  </p>
                </div>

                {/* Manage Bookings */}
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-5 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-md">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800">Manage Bookings</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Review and update customer booking statuses.
                  </p>
                </div>

                {/* Manage Users */}
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-5 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 text-blue-700 rounded-md">
                      <Users className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-800">Manage Users</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    View user profiles and handle account queries.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
