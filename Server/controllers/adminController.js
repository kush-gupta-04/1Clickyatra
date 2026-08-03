import User from "../models/User.js";
import Package from "../models/Package.js";
import Booking from "../models/Booking.js";
import Inquiry from "../models/Inquiry.js";
import Blog from "../models/Blog.js";
import { asyncHandler } from "../middleware/error.js";

// @desc    Get Admin dashboard analytics cards & trends
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalPackages = await Package.countDocuments({});
  const totalBookings = await Booking.countDocuments({});
  const totalInquiries = await Inquiry.countDocuments({});
  const totalBlogs = await Blog.countDocuments({});

  // Calculate total revenue from confirmed or paid bookings
  const bookings = await Booking.find({
    $or: [{ status: "confirmed" }, { paymentStatus: "paid" }],
  }).populate("package", "price discountedPrice");

  let totalRevenue = 0;
  bookings.forEach((booking) => {
    if (booking.package) {
      const price = booking.package.discountedPrice || booking.package.price;
      totalRevenue += price * (booking.persons || 1);
    }
  });

  // Recent data
  const recentBookings = await Booking.find({})
    .populate("package", "title destination thumbnail duration price")
    .populate("user", "name email")
    .sort("-createdAt")
    .limit(5);

  const recentInquiries = await Inquiry.find({})
    .populate("package", "title")
    .sort("-createdAt")
    .limit(5);

  // Package distribution by Category
  const categoryStats = await Package.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  // Booking statuses breakdown
  const bookingStats = await Booking.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    success: true,
    data: {
      counts: {
        users: totalUsers,
        packages: totalPackages,
        bookings: totalBookings,
        inquiries: totalInquiries,
        blogs: totalBlogs,
        revenue: totalRevenue,
      },
      recentBookings,
      recentInquiries,
      categoryStats,
      bookingStats,
    },
  });
});
